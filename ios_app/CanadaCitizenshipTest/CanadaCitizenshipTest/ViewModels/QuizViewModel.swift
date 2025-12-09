import Foundation
import SwiftUI
import Combine

enum QuizMode {
    case menu
    case quiz
    case results
}

enum QuizType: String {
    case random
    case all
    case errorGlobal
    case bookmark
    case review
}

struct QuizState {
    var questions: [Question] = []
    var currentQuestionIndex: Int = 0
    var userAnswers: [Int: Int] = [:] // questionId -> optionIndex
    var wrongAnswers: [Int] = [] // questionIds specific to this session
    var score: Int = 0
    var mode: QuizMode = .menu
    var quizType: QuizType = .all
}

class QuizViewModel: ObservableObject {
    @Published var allQuestions: [Question] = []
    @Published var gameState = QuizState()
    
    // Persistent State
    @AppStorage("canada_prep_progress") var savedProgressIndex: Int = 0
    @AppStorage("canada_prep_subcategory_progress_json") private var savedSubcategoryProgressJson: String = "{}"
    @AppStorage("canada_prep_wrong_ids_json") private var savedWrongIdsJson: String = "[]"
    @AppStorage("canada_prep_bookmarks_json") private var savedBookmarksJson: String = "[]"
    
    var subcategoryProgress: [String: Int] {
        get {
            guard let data = savedSubcategoryProgressJson.data(using: .utf8) else { return [:] }
            return (try? JSONDecoder().decode([String: Int].self, from: data)) ?? [:]
        }
        set {
            guard let data = try? JSONEncoder().encode(newValue) else { return }
            savedSubcategoryProgressJson = String(data: data, encoding: .utf8) ?? "{}"
        }
    }
    
    func getProgress(for subcategory: QuestionSubcategory) -> Int {
        return subcategoryProgress[String(describing: subcategory)] ?? 0
    }
    
    func setProgress(for subcategory: QuestionSubcategory, index: Int) {
        var current = subcategoryProgress
        current[String(describing: subcategory)] = index
        subcategoryProgress = current
    }
    
    func resetSubcategoryProgress(for subcategory: QuestionSubcategory) {
        var current = subcategoryProgress
        current[String(describing: subcategory)] = 0
        subcategoryProgress = current
    }
    
    func getTotalQuestions(for subcategory: QuestionSubcategory) -> Int {
        switch subcategory {
        case .year: return yearQuestionIds.count
        case .people: return peopleQuestionIds.count
        case .others: return allQuestions.count - yearQuestionIds.count - peopleQuestionIds.count
        }
    }
    
    func getSubcategoryProgressText(for subcategory: QuestionSubcategory) -> String {
        let current = getProgress(for: subcategory)
        let total = getTotalQuestions(for: subcategory)
        guard total > 0 else { return "" }
        let percent = Int((Double(current) / Double(total)) * 100)
        return "(\(percent)%)"
    }

    var globalWrongIds: [Int] {
        get {
            guard let data = savedWrongIdsJson.data(using: .utf8) else { return [] }
            return (try? JSONDecoder().decode([Int].self, from: data)) ?? []
        }
        set {
            guard let data = try? JSONEncoder().encode(newValue) else { return }
            savedWrongIdsJson = String(data: data, encoding: .utf8) ?? "[]"
        }
    }
    
    var bookmarkedIds: [Int] {
        get {
            guard let data = savedBookmarksJson.data(using: .utf8) else { return [] }
            return (try? JSONDecoder().decode([Int].self, from: data)) ?? []
        }
        set {
            guard let data = try? JSONEncoder().encode(newValue) else { return }
            savedBookmarksJson = String(data: data, encoding: .utf8) ?? "[]"
        }
    }
    
    init() {
        loadQuestions()
        loadSubcategoryIds()
    }
    
    func loadQuestions() {
        guard let url = Bundle.main.url(forResource: "questions_with_explanations", withExtension: "json") else {
            print("Questions file not found")
            return
        }
        
        do {
            let data = try Data(contentsOf: url)
            allQuestions = try JSONDecoder().decode([Question].self, from: data)
            print("Loaded \(allQuestions.count) questions")
        } catch {
            print("Failed to load questions: \(error)")
        }
    }
    
    func toggleBookmark(questionId: Int) {
        var currentBookmarks = bookmarkedIds
        if currentBookmarks.contains(questionId) {
            currentBookmarks.removeAll { $0 == questionId }
        } else {
            currentBookmarks.append(questionId)
        }
        bookmarkedIds = currentBookmarks
        objectWillChange.send() // Force UI update
    }
    
    func isBookmarked(questionId: Int) -> Bool {
        return bookmarkedIds.contains(questionId)
    }
    
    // Subcategory Logic
    enum QuestionSubcategory: CustomStringConvertible {
        case year
        case people
        case others
        
        var description: String {
            switch self {
            case .year: return "year"
            case .people: return "people"
            case .others: return "others"
            }
        }
    }
    
    struct SubcategoryData: Codable {
        let year: [Int]
        let people: [Int]
    }
    
    private var yearQuestionIds: Set<Int> = []
    private var peopleQuestionIds: Set<Int> = []
    
    func loadSubcategoryIds() {
        guard let url = Bundle.main.url(forResource: "subcategory_ids", withExtension: "json") else {
            print("Subcategory IDs file not found")
            return
        }
        
        do {
            let data = try Data(contentsOf: url)
            let subcategoryData = try JSONDecoder().decode(SubcategoryData.self, from: data)
            yearQuestionIds = Set(subcategoryData.year)
            peopleQuestionIds = Set(subcategoryData.people)
            print("Loaded subcategory IDs: Year=\(yearQuestionIds.count), People=\(peopleQuestionIds.count)")
        } catch {
            print("Failed to load subcategory IDs: \(error)")
        }
    }
    
    // Track current subcategory in game state to know where to save progress
    var currentSubcategory: QuestionSubcategory?

    func startQuiz(type: QuizType, subcategory: QuestionSubcategory? = nil) {
        var selectedQuestions: [Question] = []
        var startIndex = 0
        
        currentSubcategory = subcategory
        
        switch type {
        case .random:
            selectedQuestions = Array(allQuestions.shuffled().prefix(20))
            
        case .all:
            guard let subcategory = subcategory else { return }
            
            switch subcategory {
            case .year:
                selectedQuestions = allQuestions.filter { yearQuestionIds.contains($0.id) }
            case .people:
                selectedQuestions = allQuestions.filter { peopleQuestionIds.contains($0.id) }
            case .others:
                selectedQuestions = allQuestions.filter { !yearQuestionIds.contains($0.id) && !peopleQuestionIds.contains($0.id) }
            }
            
            // Resume progress
            let savedIndex = getProgress(for: subcategory)
            startIndex = savedIndex >= selectedQuestions.count ? 0 : savedIndex
            
        case .errorGlobal:
            selectedQuestions = allQuestions.filter { globalWrongIds.contains($0.id) }.shuffled()
            
        case .bookmark:
            selectedQuestions = allQuestions.filter { bookmarkedIds.contains($0.id) }
            
        case .review:
            // Should be handled by startSessionReview
            break
        }
        
        gameState = QuizState(
            questions: selectedQuestions,
            currentQuestionIndex: startIndex,
            userAnswers: [:],
            wrongAnswers: [],
            score: 0,
            mode: .quiz,
            quizType: type
        )
    }
    
    func startSessionReview() {
        let wrongIds = gameState.wrongAnswers
        let reviewQuestions = allQuestions.filter { wrongIds.contains($0.id) }
        
        gameState = QuizState(
            questions: reviewQuestions,
            currentQuestionIndex: 0,
            userAnswers: [:],
            wrongAnswers: [],
            score: 0,
            mode: .quiz, // Using quiz mode but logically it's review
            quizType: .review
        )
    }
    
    func handleAnswer(optionIndex: Int) {
        let currentQuestion = gameState.questions[gameState.currentQuestionIndex]
        let isCorrect = optionIndex == currentQuestion.correctAnswerIndex
        
        // 1. Update Persistent Global Wrong Answers
        var currentGlobalWrong = globalWrongIds
        if !isCorrect {
            if !currentGlobalWrong.contains(currentQuestion.id) {
                currentGlobalWrong.append(currentQuestion.id)
                globalWrongIds = currentGlobalWrong
            }
        } else {
            if gameState.quizType == .errorGlobal {
                currentGlobalWrong.removeAll { $0 == currentQuestion.id }
                globalWrongIds = currentGlobalWrong
            }
        }
        
        // 2. Update Progress for 'All' mode (and subcategories)
        if gameState.quizType == .all, let subcategory = currentSubcategory {
            if gameState.currentQuestionIndex >= getProgress(for: subcategory) {
                setProgress(for: subcategory, index: gameState.currentQuestionIndex + 1)
            }
        }
        
        // Update Game State
        gameState.userAnswers[currentQuestion.id] = optionIndex
        if isCorrect {
            gameState.score += 1
        } else {
            gameState.wrongAnswers.append(currentQuestion.id)
        }
    }
    
    func nextQuestion() {
        if gameState.currentQuestionIndex < gameState.questions.count - 1 {
            gameState.currentQuestionIndex += 1
        } else {
            gameState.mode = .results
        }
    }
    
    func prevQuestion() {
        if gameState.currentQuestionIndex > 0 {
            gameState.currentQuestionIndex -= 1
        }
    }
    
    func returnToMenu() {
        gameState.mode = .menu
        gameState.questions = []
        gameState.userAnswers = [:]
        gameState.score = 0
    }
    
    var progressPercent: Double {
        guard !allQuestions.isEmpty else { return 0 }
        return Double(savedProgressIndex) / Double(allQuestions.count)
    }
    
    func resetProgress() {
        savedProgressIndex = 0
        // Also reset subcategories? Or keep separate? 
        // User asked for "all subcategories under 'all' mode", usually implies independent tracking.
        // But the main "All Questions" button has a reset. 
        // Let's keep the main reset for the main "All" progress.
    }

    
    func isQuestionHistory(index: Int) -> Bool {
        guard gameState.quizType == .all else { return false }
        
        if let subcategory = currentSubcategory {
            return index < getProgress(for: subcategory)
        } else {
            return index < savedProgressIndex
        }
    }
}

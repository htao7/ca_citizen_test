import SwiftUI

struct QuizView: View {
    @EnvironmentObject var viewModel: QuizViewModel
    @State private var showExplanation = false
    
    var body: some View {
        VStack {
            // Header
            HStack {
                Button(action: { viewModel.returnToMenu() }) {
                    HStack {
                        Image(systemName: "chevron.left")
                        Text("Exit")
                    }
                }
                Spacer()
                Text(modeTitle)
                    .font(.headline)
                Spacer()
                // Placeholder for balance
                Text("Exit").hidden()
            }
            .padding()
            
            // Progress Bar
            VStack(spacing: 8) {
                HStack {
                    Text("Question \(viewModel.gameState.currentQuestionIndex + 1) of \(viewModel.gameState.questions.count)")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    Spacer()
                }
                
                GeometryReader { geometry in
                    ZStack(alignment: .leading) {
                        Rectangle()
                            .frame(width: geometry.size.width, height: 8)
                            .opacity(0.3)
                            .foregroundColor(.gray)
                        
                        Rectangle()
                            .frame(width: min(CGFloat(viewModel.gameState.currentQuestionIndex + 1) / CGFloat(viewModel.gameState.questions.count) * geometry.size.width, geometry.size.width), height: 8)
                            .foregroundColor(.red)
                    }
                    .cornerRadius(4)
                }
                .frame(height: 8)
            }
            .padding(.horizontal)
            
            ScrollView {
                VStack(spacing: 20) {
                    if let question = currentQuestion {
                        // Question Card
                        VStack(alignment: .leading, spacing: 16) {
                            HStack(alignment: .top) {
                                Text(question.question)
                                    .font(.title3)
                                    .fontWeight(.semibold)
                                    .fixedSize(horizontal: false, vertical: true)
                                
                                Spacer()
                                
                                Button(action: { viewModel.toggleBookmark(questionId: question.id) }) {
                                    Image(systemName: viewModel.isBookmarked(questionId: question.id) ? "bookmark.fill" : "bookmark")
                                        .foregroundColor(viewModel.isBookmarked(questionId: question.id) ? .yellow : .gray)
                                        .font(.title2)
                                }
                                
                                if let explanation = question.explanation, !explanation.isEmpty {
                                    Button(action: { showExplanation = true }) {
                                        Image(systemName: "info.circle")
                                            .foregroundColor(.blue)
                                            .font(.title2)
                                    }
                                }
                            }
                            
                            // Options
                            VStack(spacing: 12) {
                                ForEach(0..<4) { index in
                                    OptionButton(
                                        text: question.options[index],
                                        index: index,
                                        state: optionState(for: index)
                                    ) {
                                        if !hasAnswered && !isHistory {
                                            viewModel.handleAnswer(optionIndex: index)
                                        }
                                    }
                                    .disabled(hasAnswered || isHistory)
                                }
                            }
                        }
                        .padding()
                        .background(Color(UIColor.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
                    }
                }
                .padding()
            }
            
            // Footer Navigation
            HStack {
                Button(action: { viewModel.prevQuestion() }) {
                    HStack {
                        Image(systemName: "chevron.left")
                        Text("Previous")
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(10)
                }
                .disabled(viewModel.gameState.currentQuestionIndex == 0)
                .opacity(viewModel.gameState.currentQuestionIndex == 0 ? 0.5 : 1)
                
                if canGoNext {
                    Button(action: { viewModel.nextQuestion() }) {
                        HStack {
                            Text(viewModel.gameState.currentQuestionIndex < viewModel.gameState.questions.count - 1 ? "Next Question" : "Finish Quiz")
                            Image(systemName: "chevron.right")
                        }
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(hasAnswered ? Color.red : Color.white)
                        .foregroundColor(hasAnswered ? .white : .red)
                        .cornerRadius(10)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(Color.red, lineWidth: hasAnswered ? 0 : 2)
                        )
                    }
                }
            }
            .padding()
            .background(Color(UIColor.systemBackground))
            .shadow(radius: 2)
        }
        .background(Color(UIColor.systemGroupedBackground))
        .sheet(isPresented: $showExplanation) {
            if let question = currentQuestion, let explanation = question.explanation {
                VStack(spacing: 20) {
                    Text("Explanation")
                        .font(.headline)
                        .padding(.top)
                    
                    ScrollView {
                        Text(explanation)
                            .padding()
                    }
                    
                    Button("Close") {
                        showExplanation = false
                    }
                    .padding()
                }
                .presentationDetents([.medium, .large])
            }
        }
    }
    
    var currentQuestion: Question? {
        guard viewModel.gameState.currentQuestionIndex < viewModel.gameState.questions.count else { return nil }
        return viewModel.gameState.questions[viewModel.gameState.currentQuestionIndex]
    }
    
    var hasAnswered: Bool {
        guard let question = currentQuestion else { return false }
        return viewModel.gameState.userAnswers[question.id] != nil
    }
    
    var isHistory: Bool {
        return viewModel.gameState.quizType == .all && 
               viewModel.gameState.currentQuestionIndex < viewModel.savedProgressIndex
    }
    
    var canGoNext: Bool {
        return hasAnswered || 
               viewModel.gameState.quizType == .errorGlobal || 
               viewModel.gameState.quizType == .bookmark || 
               isHistory
    }
    
    var modeTitle: String {
        switch viewModel.gameState.quizType {
        case .random: return "Mock Test"
        case .all: return "Full Question Bank"
        case .errorGlobal: return "Weakest Questions"
        case .bookmark: return "Bookmarks"
        case .review: return "Session Review"
        }
    }
    
    func optionState(for index: Int) -> OptionState {
        guard let question = currentQuestion else { return .neutral }
        
        if let userAnswer = viewModel.gameState.userAnswers[question.id] {
            if index == question.correctAnswerIndex {
                return .correct
            } else if index == userAnswer {
                return .wrong
            } else {
                return .dimmed
            }
        } else if isHistory {
             return .dimmed
        }
        
        return .neutral
    }
}

enum OptionState {
    case neutral
    case correct
    case wrong
    case dimmed
}

struct OptionButton: View {
    let text: String
    let index: Int
    let state: OptionState
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Text(String(UnicodeScalar(65 + index)!))
                    .font(.headline)
                    .frame(width: 32, height: 32)
                    .background(circleColor)
                    .foregroundColor(circleTextColor)
                    .clipShape(Circle())
                
                Text(text)
                    .font(.body)
                    .foregroundColor(textColor)
                    .multilineTextAlignment(.leading)
                
                Spacer()
                
                if state == .correct {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.green)
                } else if state == .wrong {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.red)
                }
            }
            .padding()
            .background(backgroundColor)
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(borderColor, lineWidth: 2)
            )
        }
    }
    
    var backgroundColor: Color {
        switch state {
        case .correct: return Color.green.opacity(0.1)
        case .wrong: return Color.red.opacity(0.1)
        case .dimmed: return Color.gray.opacity(0.05)
        case .neutral: return Color(UIColor.secondarySystemGroupedBackground)
        }
    }
    
    var borderColor: Color {
        switch state {
        case .correct: return .green
        case .wrong: return .red
        case .dimmed: return .clear
        case .neutral: return Color.gray.opacity(0.2)
        }
    }
    
    var textColor: Color {
        switch state {
        case .correct: return .green
        case .wrong: return .red
        case .dimmed: return .gray
        case .neutral: return .primary
        }
    }
    
    var circleColor: Color {
        switch state {
        case .correct: return .green
        case .wrong: return .red
        case .dimmed: return .gray.opacity(0.2)
        case .neutral: return .gray.opacity(0.2)
        }
    }
    
    var circleTextColor: Color {
        switch state {
        case .correct, .wrong: return .white
        default: return .gray
        }
    }
}

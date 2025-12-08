import SwiftUI

struct ResultsView: View {
    @EnvironmentObject var viewModel: QuizViewModel
    
    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            
            // Icon
            Image(systemName: passed ? "rosette" : "exclamationmark.circle")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 80, height: 80)
                .foregroundColor(passed ? .green : .red)
                .padding()
                .background(passed ? Color.green.opacity(0.1) : Color.red.opacity(0.1))
                .clipShape(Circle())
            
            // Title
            Text(passed ? "Congratulations!" : "Keep Practicing")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            // Message
            Text(message)
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            // Stats Grid
            if viewModel.gameState.quizType == .random {
                HStack(spacing: 16) {
                    StatBox(title: "Percentage", value: "\(percentage)%", color: passed ? .green : .red)
                    StatBox(title: "Score", value: "\(viewModel.gameState.score)/\(viewModel.gameState.questions.count)", color: .primary)
                    StatBox(title: "Incorrect", value: "\(wrongCount)", color: .red)
                }
                .padding(.horizontal)
            }
            
            Spacer()
            
            // Actions
            VStack(spacing: 12) {
                if showReviewButton {
                    Button(action: { viewModel.startSessionReview() }) {
                        HStack {
                            Image(systemName: "book.fill")
                            Text("Review This Session's Errors")
                        }
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.black)
                        .cornerRadius(12)
                    }
                }
                
                Button(action: { viewModel.returnToMenu() }) {
                    HStack {
                        Image(systemName: "arrow.clockwise")
                        Text("Back to Menu")
                    }
                    .font(.headline)
                    .foregroundColor(.primary)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)
                }
            }
            .padding()
        }
        .padding()
    }
    
    var percentage: Int {
        guard !viewModel.gameState.questions.isEmpty else { return 0 }
        return Int(Double(viewModel.gameState.score) / Double(viewModel.gameState.questions.count) * 100)
    }
    
    var passed: Bool {
        return percentage >= 75
    }
    
    var wrongCount: Int {
        return viewModel.gameState.questions.count - viewModel.gameState.score
    }
    
    var message: String {
        switch viewModel.gameState.quizType {
        case .all:
            return "Session Completed. Keep up the good work!"
        case .errorGlobal:
            return "You reviewed your weakest questions. Correct answers have been removed from your study list."
        case .bookmark:
            return "You reviewed your bookmarked questions."
        default:
            return "You scored \(percentage)%. Passing grade is usually 75%."
        }
    }
    
    var showReviewButton: Bool {
        return !viewModel.gameState.wrongAnswers.isEmpty && 
               viewModel.gameState.quizType != .review && 
               viewModel.gameState.quizType != .errorGlobal && 
               viewModel.gameState.quizType != .bookmark
    }
}

struct StatBox: View {
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Text(title.uppercased())
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.secondary)
            
            Text(value)
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(color)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}

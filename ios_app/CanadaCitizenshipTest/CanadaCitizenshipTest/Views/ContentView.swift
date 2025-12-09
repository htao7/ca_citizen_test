import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: QuizViewModel

    
    var body: some View {
        if viewModel.gameState.mode == .menu {
            MenuView()
        } else if viewModel.gameState.mode == .quiz {
            QuizView()
        } else if viewModel.gameState.mode == .results {
            ResultsView()
        }
    }
}

struct MenuView: View {
    @EnvironmentObject var viewModel: QuizViewModel
    @State private var showAllSubcategorySelection = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    VStack(spacing: 16) {
                        Image(systemName: "leaf.fill")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 64, height: 64)
                            .foregroundColor(.red)
                            .padding()
                            .background(Color.red.opacity(0.1))
                            .clipShape(Circle())
                        
                        Text("Canada Citizenship Test 2025")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .multilineTextAlignment(.center)
                        
                        Text("Master the Canadian citizenship test with our comprehensive practice tool.")
                            .font(.body)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                        
                        Text("\(viewModel.allQuestions.count) Questions Loaded")
                            .font(.caption)
                            .fontWeight(.medium)
                            .foregroundColor(.secondary)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 4)
                            .background(Color.secondary.opacity(0.1))
                            .clipShape(Capsule())
                    }
                    .padding(.top, 40)
                    
                    // Buttons Grid
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 16) {
                        // Mock Test
                        MenuButton(
                            icon: "arrow.clockwise",
                            title: "Mock Test",
                            subtitle: "Simulate the exam with 20 random questions",
                            color: .blue
                        ) {
                            viewModel.startQuiz(type: .random)
                        }
                        
                        // All Questions
                        MenuButton(
                            icon: "book.fill",
                            title: "All Questions",
                            subtitle: "Practice by category: Year, People, Others",
                            color: .green
                        ) {
                        ) {
                            showAllSubcategorySelection = true
                        }
                        .sheet(isPresented: $showAllSubcategorySelection) {
                            SubcategorySelectionView()
                        }
                        
                        // Weakest
                        MenuButton(
                            icon: "clock.arrow.circlepath",
                            title: "My Weakest",
                            subtitle: "Review \(viewModel.globalWrongIds.count) questions you've answered incorrectly",
                            color: .orange,
                            isDisabled: viewModel.globalWrongIds.isEmpty
                        ) {
                            viewModel.startQuiz(type: .errorGlobal)
                        }
                        
                        // Bookmarks
                        MenuButton(
                            icon: "bookmark.fill",
                            title: "Bookmarks",
                            subtitle: "Review your \(viewModel.bookmarkedIds.count) bookmarked questions",
                            color: .purple,
                            isDisabled: viewModel.bookmarkedIds.isEmpty
                        ) {
                            viewModel.startQuiz(type: .bookmark)
                        }
                    }
                    .padding()
                }
            }
            .navigationBarHidden(true)
        }
    }
}

struct MenuButton: View {
    let icon: String
    let title: String
    let subtitle: String
    let color: Color
    var isDisabled: Bool = false
    var progress: Double? = nil
    var resetAction: (() -> Void)? = nil
    let action: () -> Void
    
    var body: some View {
        ZStack(alignment: .topTrailing) {
            Button(action: action) {
                VStack(spacing: 12) {
                    Image(systemName: icon)
                        .font(.system(size: 24))
                        .foregroundColor(isDisabled ? .gray : color)
                        .padding(12)
                        .background(isDisabled ? Color.gray.opacity(0.1) : color.opacity(0.1))
                        .clipShape(Circle())
                    
                    Text(title)
                        .font(.headline)
                        .foregroundColor(isDisabled ? .gray : .primary)
                    
                    if let progress = progress, progress > 0 {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(subtitle)
                                .font(.caption)
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                            
                            GeometryReader { geometry in
                                ZStack(alignment: .leading) {
                                    Rectangle()
                                        .frame(width: geometry.size.width, height: 6)
                                        .opacity(0.3)
                                        .foregroundColor(.gray)
                                    
                                    Rectangle()
                                        .frame(width: min(CGFloat(progress) * geometry.size.width, geometry.size.width), height: 6)
                                        .foregroundColor(color)
                                }
                                .cornerRadius(3)
                            }
                            .frame(height: 6)
                        }
                    } else {
                        Text(subtitle)
                            .font(.caption)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                            .fixedSize(horizontal: false, vertical: true)
                    }
                }
                .frame(maxWidth: .infinity, minHeight: 160)
                .padding()
                .background(Color(UIColor.systemBackground))
                .cornerRadius(16)
                .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(isDisabled ? Color.clear : color.opacity(0.0), lineWidth: 2)
                )
            }
            .disabled(isDisabled)
            .opacity(isDisabled ? 0.6 : 1.0)
            
            if let resetAction = resetAction, let progress = progress, progress > 0 {
                ResetButton(action: resetAction)
                    .padding(8)
            }
        }
    }
}

struct ResetButton: View {
    let action: () -> Void
    @State private var isPressing = false
    
    var body: some View {
        Image(systemName: "arrow.counterclockwise")
            .font(.system(size: 14, weight: .bold))
            .foregroundColor(.white)
            .padding(8)
            .background(isPressing ? Color.red.opacity(0.8) : Color.gray.opacity(0.6))
            .clipShape(Circle())
            .scaleEffect(isPressing ? 1.2 : 1.0)
            .animation(.easeInOut(duration: 0.2), value: isPressing)
            .onLongPressGesture(minimumDuration: 1.0, pressing: { pressing in
                isPressing = pressing
            }) {
                let generator = UIImpactFeedbackGenerator(style: .medium)
                generator.impactOccurred()
                action()
            }
    }
}

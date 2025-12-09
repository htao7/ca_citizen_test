import SwiftUI

struct SubcategorySelectionView: View {
    @EnvironmentObject var viewModel: QuizViewModel
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Header
                    Text("Select Category")
                        .font(.title2)
                        .fontWeight(.bold)
                        .padding(.top)
                    
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 150))], spacing: 16) {
                        // Year
                        MenuButton(
                            icon: "calendar",
                            title: "Year Questions",
                            subtitle: "Questions related to dates and years",
                            color: .blue,
                            progress: calculateProgress(current: viewModel.getProgress(for: .year), total: viewModel.getTotalQuestions(for: .year)),
                            resetAction: {
                                viewModel.resetSubcategoryProgress(for: .year)
                            }
                        ) {
                            viewModel.startQuiz(type: .all, subcategory: .year)
                            dismiss()
                        }
                        
                        // People
                        MenuButton(
                            icon: "person.2.fill",
                            title: "People Questions",
                            subtitle: "Questions about important figures",
                            color: .purple,
                            progress: calculateProgress(current: viewModel.getProgress(for: .people), total: viewModel.getTotalQuestions(for: .people)),
                            resetAction: {
                                viewModel.resetSubcategoryProgress(for: .people)
                            }
                        ) {
                            viewModel.startQuiz(type: .all, subcategory: .people)
                            dismiss()
                        }
                        
                        // Others
                        MenuButton(
                            icon: "ellipsis.circle.fill",
                            title: "Other Questions",
                            subtitle: "General knowledge questions",
                            color: .orange,
                            progress: calculateProgress(current: viewModel.getProgress(for: .others), total: viewModel.getTotalQuestions(for: .others)),
                            resetAction: {
                                viewModel.resetSubcategoryProgress(for: .others)
                            }
                        ) {
                            viewModel.startQuiz(type: .all, subcategory: .others)
                            dismiss()
                        }
                    }
                    .padding()
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Close") {
                        dismiss()
                    }
                }
            }
        }
    }
    
    private func dismiss() {
        presentationMode.wrappedValue.dismiss()
    }
    
    private func calculateProgress(current: Int, total: Int) -> Double {
        guard total > 0 else { return 0 }
        return Double(current) / Double(total)
    }
}

import SwiftUI

@main
struct CanadaCitizenshipTestApp: App {
    @StateObject private var quizViewModel = QuizViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(quizViewModel)
        }
    }
}

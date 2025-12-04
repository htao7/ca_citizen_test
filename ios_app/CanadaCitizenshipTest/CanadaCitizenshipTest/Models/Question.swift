import Foundation

struct Question: Identifiable, Codable {
    let id: Int
    let question: String
    let options: [String]
    let correctAnswerIndex: Int
    let explanation: String?
}

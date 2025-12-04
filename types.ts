
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0=A, 1=B, 2=C, 3=D
  rawAnswerText?: string; // Storing the raw letter for debugging
}

export enum QuizMode {
  MENU = 'MENU',
  QUIZ = 'QUIZ',
  REVIEW = 'REVIEW',
  RESULTS = 'RESULTS'
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, number>; // questionId -> optionIndex
  wrongAnswers: number[]; // array of questionIds specific to this session
  score: number;
  mode: QuizMode;
  quizType: 'random' | 'all' | 'review' | 'error_global' | 'bookmark';
}

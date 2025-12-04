
import React, { useState, useEffect } from 'react';
import { parseQuestions } from './data';
import { Question, QuizMode, QuizState } from './types';
import { Leaf, RefreshCcw, BookOpen, AlertCircle, ChevronRight, ChevronLeft, CheckCircle, XCircle, Award, History, Bookmark } from 'lucide-react';

const STORAGE_KEY_PROGRESS = 'canada_prep_progress';
const STORAGE_KEY_WRONG_ANSWERS = 'canada_prep_wrong_ids';
const STORAGE_KEY_BOOKMARKS = 'canada_prep_bookmarks';

const App: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  
  // Persistent State
  const [savedProgressIndex, setSavedProgressIndex] = useState<number>(0);
  const [globalWrongIds, setGlobalWrongIds] = useState<number[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const [gameState, setGameState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: {},
    wrongAnswers: [],
    score: 0,
    mode: QuizMode.MENU,
    quizType: 'all',
  });

  // Load questions and persistent data on mount
  useEffect(() => {
    const questions = parseQuestions();
    setAllQuestions(questions);

    // Load Progress
    const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (savedProgress) {
      setSavedProgressIndex(parseInt(savedProgress, 10));
    }

    // Load Wrong Answers
    const savedWrong = localStorage.getItem(STORAGE_KEY_WRONG_ANSWERS);
    if (savedWrong) {
      try {
        setGlobalWrongIds(JSON.parse(savedWrong));
      } catch (e) {
        console.error("Failed to parse saved wrong answers", e);
      }
    }

    // Load Bookmarks
    const savedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error("Failed to parse saved bookmarks", e);
      }
    }
  }, []);

  const saveGlobalWrongIds = (ids: number[]) => {
    setGlobalWrongIds(ids);
    localStorage.setItem(STORAGE_KEY_WRONG_ANSWERS, JSON.stringify(ids));
  };

  const saveBookmarks = (ids: number[]) => {
    setBookmarkedIds(ids);
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(ids));
  };

  const saveProgress = (index: number) => {
    setSavedProgressIndex(index);
    localStorage.setItem(STORAGE_KEY_PROGRESS, index.toString());
  };

  const toggleBookmark = (questionId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    let newBookmarks;
    if (bookmarkedIds.includes(questionId)) {
      newBookmarks = bookmarkedIds.filter(id => id !== questionId);
    } else {
      newBookmarks = [...bookmarkedIds, questionId];
    }
    saveBookmarks(newBookmarks);
  };

  const startQuiz = (type: 'random' | 'all') => {
    let selectedQuestions: Question[] = [];
    let startIndex = 0;

    if (type === 'random') {
      // Shuffle and take 20
      selectedQuestions = [...allQuestions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 20);
    } else {
      // All Questions - Resume from saved index
      selectedQuestions = [...allQuestions];
      // Ensure index is within bounds (if questions changed/reloaded)
      startIndex = savedProgressIndex >= allQuestions.length ? 0 : savedProgressIndex;
    }

    setGameState({
      questions: selectedQuestions,
      currentQuestionIndex: startIndex,
      userAnswers: {},
      wrongAnswers: [],
      score: 0,
      mode: QuizMode.QUIZ,
      quizType: type,
    });
  };

  const startGlobalErrorReview = () => {
    const reviewQuestions = allQuestions.filter(q => globalWrongIds.includes(q.id));
    
    // Shuffle them for better practice
    const shuffledReview = reviewQuestions.sort(() => 0.5 - Math.random());

    setGameState({
      questions: shuffledReview,
      currentQuestionIndex: 0,
      userAnswers: {},
      wrongAnswers: [],
      score: 0,
      mode: QuizMode.QUIZ,
      quizType: 'error_global',
    });
  };

  const startBookmarkQuiz = () => {
    const reviewQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));
    
    setGameState({
      questions: reviewQuestions, // Keep order or shuffle? Let's keep order for bookmarks usually
      currentQuestionIndex: 0,
      userAnswers: {},
      wrongAnswers: [],
      score: 0,
      mode: QuizMode.QUIZ,
      quizType: 'bookmark',
    });
  };

  const startSessionReview = () => {
    // Review wrong answers from the JUST COMPLETED session
    const wrongQuestionIds = gameState.wrongAnswers;
    const reviewQuestions = allQuestions.filter(q => wrongQuestionIds.includes(q.id));

    setGameState({
      questions: reviewQuestions,
      currentQuestionIndex: 0,
      userAnswers: {},
      wrongAnswers: [], 
      score: 0,
      mode: QuizMode.REVIEW, // Using REVIEW mode which behaves like QUIZ but labeled differently
      quizType: 'review',
    });
  };

  const handleAnswer = (optionIndex: number) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;

    // 1. Update Persistent Global Wrong Answers
    if (!isCorrect) {
      if (!globalWrongIds.includes(currentQuestion.id)) {
        saveGlobalWrongIds([...globalWrongIds, currentQuestion.id]);
      }
    } else {
      // If correct, and we are in Global Review mode, remove it from the list!
      if (gameState.quizType === 'error_global') {
        const newIds = globalWrongIds.filter(id => id !== currentQuestion.id);
        saveGlobalWrongIds(newIds);
      }
    }

    // 2. Update Progress for 'All' mode
    if (gameState.quizType === 'all') {
      // We save the index of the *next* question as the resume point
      // We only advance saved progress if we are at the furthest point
      if (gameState.currentQuestionIndex >= savedProgressIndex) {
        saveProgress(gameState.currentQuestionIndex + 1);
      }
    }

    setGameState(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newWrongAnswers = isCorrect 
        ? prev.wrongAnswers 
        : [...prev.wrongAnswers, currentQuestion.id];

      return {
        ...prev,
        score: newScore,
        userAnswers: { ...prev.userAnswers, [currentQuestion.id]: optionIndex },
        wrongAnswers: newWrongAnswers
      };
    });
  };

  const prevQuestion = () => {
    if (gameState.currentQuestionIndex > 0) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  const nextQuestion = () => {
    if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        mode: QuizMode.RESULTS
      }));
    }
  };

  const returnToMenu = () => {
    setGameState(prev => ({
      ...prev,
      mode: QuizMode.MENU,
      questions: [],
      userAnswers: {},
      score: 0
    }));
  };

  // --- RENDERERS ---

  const renderMenu = () => {
    const allProgressPercent = allQuestions.length > 0 
      ? Math.round((savedProgressIndex / allQuestions.length) * 100) 
      : 0;

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-4">
          <div className="bg-canada-red/10 p-4 rounded-full inline-block mb-4">
            <Leaf className="w-16 h-16 text-canada-red" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Canada Citizenship Test 2025</h1>
          <p className="text-slate-600 max-w-md mx-auto">Master the Canadian citizenship test with our comprehensive practice tool.</p>
          <p className="text-sm font-medium text-slate-500 bg-slate-100 py-1 px-3 rounded-full inline-block">
            {allQuestions.length} Questions Loaded
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl px-4">
          {/* Mock Test Mode */}
          <button 
            onClick={() => startQuiz('random')}
            className="group relative flex flex-col items-center p-6 bg-white border-2 border-slate-100 hover:border-canada-red rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3 group-hover:bg-canada-red group-hover:text-white transition-colors">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Mock Test</h3>
            <p className="text-slate-500 text-sm text-center mt-2">Simulate the exam with 20 random questions.</p>
          </button>

          {/* All Questions Mode */}
          <div 
            className="group relative flex flex-col items-center p-6 bg-white border-2 border-slate-100 hover:border-canada-red rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Click Overlay - handles the main card click action */}
            <button 
              onClick={() => startQuiz('all')}
              className="absolute inset-0 w-full h-full cursor-pointer z-0 focus:outline-none"
              aria-label="Start All Questions Quiz"
            />
            
            {/* Content Layer - pointer-events-none ensures clicks pass through to overlay, except for interactive children */}
            <div className="relative z-10 flex flex-col items-center pointer-events-none w-full">
              <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3 group-hover:bg-canada-red group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">All Questions</h3>
              
              {savedProgressIndex > 0 ? (
                <div className="w-full mt-3 flex flex-col items-center">
                  <div className="w-full mb-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Resume at #{savedProgressIndex + 1}</span>
                      <span>{allProgressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${allProgressPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              ) : (
                 <p className="text-slate-500 text-sm text-center mt-2">Systematically go through the entire bank.</p>
              )}
            </div>
          </div>

          {/* Error Review Mode */}
          <button 
            onClick={startGlobalErrorReview}
            disabled={globalWrongIds.length === 0}
            className={`group relative flex flex-col items-center p-6 bg-white border-2 rounded-xl shadow-sm transition-all duration-200
              ${globalWrongIds.length === 0 
                ? 'border-slate-100 opacity-60 cursor-not-allowed' 
                : 'border-slate-100 hover:border-canada-red hover:shadow-md'
              }`}
          >
            <div className={`p-3 rounded-full mb-3 transition-colors ${globalWrongIds.length === 0 ? 'bg-slate-100 text-slate-400' : 'bg-orange-50 text-orange-600 group-hover:bg-canada-red group-hover:text-white'}`}>
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">My Weakest</h3>
            <p className="text-slate-500 text-sm text-center mt-2">
              Review {globalWrongIds.length} questions you've answered incorrectly in the past.
            </p>
          </button>

          {/* Bookmarks Mode */}
          <button 
            onClick={startBookmarkQuiz}
            disabled={bookmarkedIds.length === 0}
            className={`group relative flex flex-col items-center p-6 bg-white border-2 rounded-xl shadow-sm transition-all duration-200
              ${bookmarkedIds.length === 0 
                ? 'border-slate-100 opacity-60 cursor-not-allowed' 
                : 'border-slate-100 hover:border-canada-red hover:shadow-md'
              }`}
          >
            <div className={`p-3 rounded-full mb-3 transition-colors ${bookmarkedIds.length === 0 ? 'bg-slate-100 text-slate-400' : 'bg-purple-50 text-purple-600 group-hover:bg-canada-red group-hover:text-white'}`}>
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Bookmarks</h3>
            <p className="text-slate-500 text-sm text-center mt-2">
              Review your {bookmarkedIds.length} bookmarked questions.
            </p>
          </button>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    
    // Safety check if questions haven't loaded
    if (!currentQuestion) return null;

    const hasAnswered = gameState.userAnswers[currentQuestion.id] !== undefined;
    const selectedAnswer = gameState.userAnswers[currentQuestion.id];
    const isBookmarked = bookmarkedIds.includes(currentQuestion.id);
    
    // Check if this is a "historical" question in All Questions mode (previously passed)
    // If the current index is less than the saved max progress, we consider it "history".
    const isHistory = gameState.quizType === 'all' && gameState.currentQuestionIndex < savedProgressIndex;

    // Calculate progress display
    const displayIndex = gameState.currentQuestionIndex + 1;
    const displayTotal = gameState.questions.length;
    const progressPercent = (displayIndex / displayTotal) * 100;

    let modeLabel = 'Practice Mode';
    if (gameState.quizType === 'random') modeLabel = 'Mock Test';
    if (gameState.quizType === 'all') modeLabel = 'Full Question Bank';
    if (gameState.quizType === 'error_global') modeLabel = 'Weakest Questions Review';
    if (gameState.quizType === 'bookmark') modeLabel = 'Bookmarks';
    if (gameState.quizType === 'review') modeLabel = 'Session Review';

    // Allow Next if answered OR if in specific review modes OR if reviewing history in All mode
    const canGoNext = hasAnswered || gameState.quizType === 'error_global' || gameState.quizType === 'bookmark' || isHistory;

    return (
      <div className="max-w-2xl mx-auto w-full animate-in slide-in-from-right-4 duration-300">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Question {displayIndex} of {displayTotal}</span>
            <span className="flex items-center gap-1">
              {gameState.quizType === 'error_global' && <History className="w-3 h-3"/>}
              {gameState.quizType === 'bookmark' && <Bookmark className="w-3 h-3"/>}
              {modeLabel}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-canada-red h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </h2>
            <button 
              onClick={(e) => toggleBookmark(currentQuestion.id, e)}
              className="text-slate-400 hover:text-yellow-500 transition-colors flex-shrink-0 self-start mt-1"
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
            >
              <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ";
              
              if (hasAnswered) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  // This is the correct answer
                  btnClass += "bg-green-50 border-green-500 text-green-800";
                } else if (idx === selectedAnswer) {
                  // This is the wrong answer the user picked
                  btnClass += "bg-red-50 border-red-500 text-red-800";
                } else {
                  // Unselected options
                  btnClass += "border-transparent opacity-50";
                }
              } else {
                // Not answered yet
                if (isHistory) {
                   // Previously answered in a different session, just disable interaction
                   btnClass += "border-slate-100 opacity-60 cursor-not-allowed text-slate-500";
                } else {
                   btnClass += "border-slate-100 hover:border-canada-red hover:bg-red-50/30 text-slate-700";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !hasAnswered && !isHistory && handleAnswer(idx)}
                  disabled={hasAnswered || isHistory}
                  className={btnClass}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                    ${hasAnswered && idx === currentQuestion.correctAnswerIndex ? 'bg-green-500 text-white' : 
                      hasAnswered && idx === selectedAnswer ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{option}</span>
                  {hasAnswered && idx === currentQuestion.correctAnswerIndex && <CheckCircle className="ml-auto w-5 h-5 text-green-600" />}
                  {hasAnswered && idx === selectedAnswer && idx !== currentQuestion.correctAnswerIndex && <XCircle className="ml-auto w-5 h-5 text-red-600" />}
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={gameState.currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                ${gameState.currentQuestionIndex === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {canGoNext && (
              <button
                onClick={nextQuestion}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-sm
                  ${hasAnswered 
                    ? 'bg-canada-red hover:bg-canada-dark text-white' 
                    : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-canada-red hover:text-canada-red'
                  }`}
              >
                {gameState.currentQuestionIndex < gameState.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const percentage = Math.round((gameState.score / gameState.questions.length) * 100);
    const passed = percentage >= 75; // Typical pass mark
    const wrongCount = gameState.questions.length - gameState.score;
    const sessionWrongAnswers = gameState.wrongAnswers.length > 0;

    return (
      <div className="max-w-xl mx-auto w-full animate-in zoom-in duration-300">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 border border-slate-100">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {passed ? <Award className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing'}
          </h2>
          
          {gameState.quizType === 'error_global' ? (
             <p className="text-slate-600 mb-8">
               You reviewed your weakest questions. Correct answers have been removed from your study list.
             </p>
          ) : gameState.quizType === 'bookmark' ? (
             <p className="text-slate-600 mb-8">
               You reviewed your bookmarked questions.
             </p>
          ) : (
            <p className="text-slate-600 mb-8">
              You scored {percentage}%. Passing grade is usually 75%.
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Score</p>
              <p className="text-2xl font-bold text-slate-900">{gameState.score}/{gameState.questions.length}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm text-slate-500 uppercase tracking-wide font-bold">Incorrect</p>
              <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
            </div>
          </div>

          <div className="space-y-3">
            {sessionWrongAnswers && gameState.quizType !== 'review' && gameState.quizType !== 'error_global' && gameState.quizType !== 'bookmark' && (
              <button
                onClick={startSessionReview}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Review This Session's Errors
              </button>
            )}
            
            <button
              onClick={returnToMenu}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-canada-red hover:text-canada-red text-slate-700 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={returnToMenu}>
            <Leaf className="text-canada-red w-6 h-6" />
            <span className="font-bold text-xl tracking-tight hidden sm:block">Test<span className="text-canada-red">Prep</span></span>
          </div>
          {gameState.mode !== QuizMode.MENU && (
            <button onClick={returnToMenu} className="text-sm font-medium text-slate-500 hover:text-canada-red">
              Exit Quiz
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {gameState.mode === QuizMode.MENU && renderMenu()}
        {(gameState.mode === QuizMode.QUIZ || gameState.mode === QuizMode.REVIEW) && renderQuiz()}
        {gameState.mode === QuizMode.RESULTS && renderResults()}
      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm">
        <p>
          <a href="https://github.com/htao7" target="_blank" rel="noopener noreferrer" className="hover:text-canada-red transition-colors">Made by @htao7</a>
        </p>
        <p className="mt-1">Not affiliated with the Government of Canada.</p>
        <p className="mt-2 text-xs opacity-75">
          Based on "Canadian Citizenship Test 2025 - 414 Real Questions and Answers from past" from YouTube.
        </p>
      </footer>
    </div>
  );
};

export default App;

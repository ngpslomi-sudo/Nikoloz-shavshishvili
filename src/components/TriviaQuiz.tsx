import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Check, X, Award, RotateCcw, ThumbsUp } from 'lucide-react';
import { QuizQuestion } from '../types';

interface TriviaQuizProps {
  questions: QuizQuestion[];
  themeId?: string;
}

export default function TriviaQuiz({ questions, themeId }: TriviaQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [shake, setShake] = useState(false);

  const isArtistic = themeId === 'artistic-flair';

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];

  const handleOptionSelect = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswerIdx;
    setHasSubmitted(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setWrongAttempts((prev) => prev + 1);
      // Trigger card shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setIsCompleted(false);
    setWrongAttempts(0);
  };

  // Score description mapping
  const getAwardLevel = () => {
    const pct = score / questions.length;
    if (pct >= 0.9) return { title: 'Ultimate Love Expert 🏆 ❤️', desc: 'You remember everything perfectly! Your memory and attention to detail are absolutely flawless!' };
    if (pct >= 0.6) return { title: 'Loyal & Sweet Partner 🥰 ✨', desc: 'Excellent result! You know most things perfectly, showing how close we truly are.' };
    return { title: 'Caring Novice 🌱 😜', desc: 'Don\'t worry, the effort counts! Let us cherish these memories together on our next date.' };
  };

  return (
    <div 
      className={`w-full max-w-xl p-8 overflow-hidden relative z-10 ${
        isArtistic
          ? 'bg-white border-3 border-stone-900 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-xl'
          : 'rounded-3xl bg-white/70 backdrop-blur-md border border-rose-100/40 shadow-xl'
      }`}
      id="trivia-quiz-box"
    >
      {/* Background decorations */}
      <div className={`absolute top-0 left-0 w-20 h-20 rounded-full blur-xl pointer-events-none ${isArtistic ? 'bg-stone-500/5' : 'bg-rose-50'}`} />

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          // ACTIVE QUIZ CARD
          <motion.div
            key="quiz-active"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0, x: shake ? [0, -6, 6, -6, 6, 0] : 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex flex-col h-full"
          >
            {/* Header / Progress bar */}
            <div className="flex justify-between items-center mb-6">
              <span className={`text-xs uppercase font-bold tracking-wider flex items-center gap-1 ${
                isArtistic ? 'text-[#FF3B30] font-black italic' : 'font-mono text-rose-500'
              }`}>
                <HelpCircle className="w-4 h-4" />
                Quiz: {currentIdx + 1} of {questions.length}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                isArtistic
                  ? 'bg-white text-stone-900 border-2 border-stone-900 uppercase font-black tracking-tight'
                  : 'bg-rose-50 text-rose-800 border border-rose-100/55'
              }`}>
                Score: {score}
              </span>
            </div>

            {/* Microprogress bar */}
            <div className={`w-full h-2 rounded-full overflow-hidden mb-6 ${
              isArtistic ? 'bg-stone-100 border-2 border-stone-900' : 'bg-stone-100'
            }`}>
              <div 
                className={`h-full transition-all duration-300 ${
                  isArtistic ? 'bg-[#FF3B30]' : 'bg-gradient-to-r from-pink-400 to-rose-500'
                }`} 
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h3 className={`text-lg mb-6 leading-snug ${
              isArtistic ? 'font-black text-stone-900 uppercase italic tracking-tighter' : 'font-serif font-bold text-rose-950'
            }`}>
              {currentQuestion.question}
            </h3>

            {/* Radio / Option buttons */}
            <div className="space-y-3.5 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = currentQuestion.correctAnswerIdx === idx;
                
                // Color computation based on submit state
                let itemBg = isArtistic 
                  ? 'bg-white border-2 border-stone-900 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:bg-[#FFFBF0] text-stone-900 font-bold uppercase tracking-tight text-xs' 
                  : 'bg-stone-50/50 border-stone-200/60 hover:bg-stone-100/60 text-stone-850';

                if (hasSubmitted) {
                  if (isCorrect) {
                     itemBg = isArtistic
                       ? 'bg-emerald-50 border-3 border-stone-900 shadow-[2px_2px_0px_0px_rgba(34,197,94,1)] text-[#1A1A1A] font-extrabold uppercase tracking-tight text-xs'
                       : 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                  } else if (isSelected) {
                     itemBg = isArtistic
                       ? 'bg-[#FF3B30] border-3 border-stone-900 text-white shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] font-extrabold uppercase italic tracking-tight text-xs'
                       : 'bg-rose-50 border-rose-400 text-rose-950 font-medium';
                  } else {
                     itemBg = isArtistic
                       ? 'bg-stone-50/20 border-2 border-stone-300 opacity-40 text-stone-400 font-bold uppercase tracking-tight text-xs'
                       : 'bg-stone-50/30 border-stone-100 opacity-60 text-stone-400';
                  }
                } else if (isSelected) {
                   itemBg = isArtistic
                     ? 'bg-[#FFFBF0] border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-[#FF3B30] font-extrabold uppercase italic tracking-tight text-xs'
                     : 'bg-pink-100/50 border-pink-400 text-pink-950 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition duration-150 flex items-center justify-between cursor-pointer ${
                      isArtistic ? 'rounded-lg' : ''
                    } ${itemBg}`}
                  >
                    <span className="text-sm">{option}</span>
                    
                    {/* Status icon indicators */}
                    <div className="flex items-center gap-1 font-mono">
                      {hasSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                      {hasSubmitted && isSelected && !isCorrect && <X className="w-4 h-4 text-rose-600" />}
                      {!hasSubmitted && isSelected && <span className={`w-2.5 h-2.5 rounded-full ${isArtistic ? 'bg-[#FF3B30]' : 'bg-pink-500'}`} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Button Actions */}
            <div className="flex justify-between items-center mt-auto">
              {!hasSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmit}
                  className={`ml-auto font-mono cursor-pointer transition active:scale-95 flex items-center gap-1.5 ${
                    isArtistic
                      ? 'bg-[#FF3B30] hover:bg-[#E02E24] border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-white font-black uppercase italic tracking-tight text-xs py-3 px-6 rounded'
                      : 'bg-rose-500 hover:bg-rose-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-sm py-3 px-6 rounded-full shadow-md disabled:shadow-none'
                  }`}
                  id="submit-quiz-btn"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <p className={`text-xs italic font-medium max-w-[240px] ${isArtistic ? 'text-stone-900 font-extrabold uppercase' : 'text-stone-600'}`}>
                    {selectedOption === currentQuestion.correctAnswerIdx 
                      ? 'You are correct! Your accuracy is charming 😍' 
                      : 'Oops, that was wrong, but I still love you! 😜'}
                  </p>
                  <button
                    onClick={handleNext}
                    className={`font-mono cursor-pointer transition active:scale-95 flex items-center gap-1.5 ${
                      isArtistic
                        ? 'bg-stone-900 hover:bg-stone-850 border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-white font-black uppercase italic tracking-tight text-xs py-3 px-6 rounded'
                        : 'bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm py-3 px-6 rounded-full shadow-md'
                    }`}
                    id="next-quiz-btn"
                  >
                    Next <ThumbsUp className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // QUIZ COMPLETE SCREEN
          <motion.div
            key="quiz-info-completed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-6"
            id="quiz-completed-badge"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner mb-6 animate-pulse ${
              isArtistic
                ? 'bg-[#FFFBF0] border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] text-stone-900'
                : 'bg-amber-100 border-2 border-amber-300'
            }`}>
              <Award className={`w-10 h-10 ${isArtistic ? 'text-[#FF3B30]' : 'text-amber-600'}`} />
            </div>

            <h3 className={`text-xl mb-2 ${
              isArtistic ? 'font-black uppercase italic tracking-tighter text-stone-900' : 'font-serif font-black text-rose-950'
            }`}>
              Quiz Completed! 🎉
            </h3>
            
            <div className={`font-mono font-black text-3xl mb-4 ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-600'}`}>
              {score} of {questions.length}
            </div>

            {/* Level Title */}
            <h4 className={`text-lg mb-2 px-4 leading-tight ${
              isArtistic ? 'font-extrabold text-[#FF3B30] uppercase italic tracking-tight' : 'font-bold text-rose-900 font-serif'
            }`}>
              {getAwardLevel().title}
            </h4>

            {/* Description details */}
            <p className={`text-sm max-w-sm px-2 leading-relaxed mb-8 ${isArtistic ? 'text-stone-850 font-medium' : 'text-stone-700'}`}>
              {getAwardLevel().desc}
            </p>

            {/* Reset option */}
            <button
              onClick={handleReset}
              className={`flex items-center gap-1.5 cursor-pointer transition active:scale-95 font-mono ${
                isArtistic
                  ? 'bg-white border-2 border-stone-900 text-stone-900 font-extrabold uppercase italic shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] rounded px-5 py-2.5 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                  : 'text-rose-500 bg-rose-50 hover:bg-rose-100 font-bold text-xs py-2.5 px-5 rounded-full border border-rose-200 shadow-sm'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

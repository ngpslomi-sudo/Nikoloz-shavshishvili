import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, CheckCircle } from 'lucide-react';

interface WillYouBeMyProps {
  question: string;
  yesText: string;
  noText: string;
  successMessage: string;
  themeId?: string;
}

export default function WillYouBeMy({ question, yesText, noText, successMessage, themeId }: WillYouBeMyProps) {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isArtistic = themeId === 'artistic-flair';

  // Dodges the cursor (or touch) by choosing a random translation within bounds
  const handleNoHoverOrClick = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Bound calculation so the button doesn't fly outside the view
    const buttonWidth = 100;
    const buttonHeight = 44;
    
    const maxX = (rect.width - buttonWidth) / 2 - 10;
    const minX = -maxX;
    const maxY = (rect.height - buttonHeight) / 2 - 10;
    const minY = -maxY;

    // Pick a translation
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoPosition({ x: randomX, y: randomY });
    setNoClicks((prev) => prev + 1);
  };

  const shrinkScale = Math.max(0.4, 1 - noClicks * 0.08);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-xl p-8 overflow-hidden flex flex-col items-center justify-center min-h-[300px] ${
        isArtistic
          ? 'bg-white border-3 border-stone-900 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-xl'
          : 'rounded-3xl bg-white/70 backdrop-blur-md border border-rose-100/40 shadow-xl'
      }`}
      id="proposal-widget"
    >
      <div className={`absolute top-0 right-0 w-20 h-20 blur-xl rounded-full pointer-events-none ${isArtistic ? 'bg-[#FF3B30]/10' : 'bg-rose-200/20'}`} />
      <div className={`absolute bottom-0 left-0 w-24 h-24 blur-xl rounded-full pointer-events-none ${isArtistic ? 'bg-stone-500/10' : 'bg-pink-200/20'}`} />

      <AnimatePresence mode="wait">
        {!hasAgreed ? (
          <motion.div
            key="ask-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center w-full z-10"
          >
            {/* Cute bouncing decoration */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner mb-6 ${
                isArtistic 
                  ? 'bg-[#FF3B30] text-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]' 
                  : 'bg-rose-100'
              }`}
            >
              <Heart className={`w-8 h-8 animate-pulse ${isArtistic ? 'text-white fill-white' : 'text-rose-500 fill-rose-500'}`} />
            </motion.div>

            {/* Question */}
            <h2 className={`text-xl md:text-2xl mb-8 max-w-md px-2 leading-snug ${
              isArtistic ? 'font-black uppercase italic tracking-tighter text-stone-900' : 'font-serif font-bold text-rose-950'
            }`}>
              {question || 'Will you be my Valentine? 💖'}
            </h2>

            {/* Interactive buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm min-h-[60px] relative">
              {/* YES BUTTON */}
              <motion.button
                whileHover={isArtistic ? { translateY: 1, translateX: 1 } : { scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setHasAgreed(true)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer transition z-10 ${
                  isArtistic
                    ? 'bg-[#FF3B30] hover:bg-[#E02E24] text-white font-extrabold uppercase italic tracking-wider py-3.5 px-8 border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'
                    : 'bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-rose-300/50'
                }`}
                id="proposal-yes-btn"
              >
                <Sparkles className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                {yesText || 'Yes, I do!'}
              </motion.button>

              {/* DODGING NO BUTTON */}
              <motion.button
                animate={{ x: noPosition.x, y: noPosition.y, scale: shrinkScale }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                onMouseEnter={handleNoHoverOrClick}
                onTouchStart={handleNoHoverOrClick}
                onClick={handleNoHoverOrClick}
                className={`w-full sm:w-auto font-semibold transition cursor-pointer sm:absolute ${
                  isArtistic
                    ? 'bg-stone-50 hover:bg-stone-100 text-stone-900 font-extrabold uppercase italic py-3.5 px-8 border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 py-3.5 px-8 rounded-full shadow-md border border-stone-200/70'
                }`}
                style={{ top: 'auto', left: 'auto' }}
                id="proposal-no-btn"
              >
                {noText || 'No'}
              </motion.button>
            </div>

            {/* Cute funny helper label if they try to click but fail */}
            {noClicks > 0 && (
              <p className={`mt-6 text-xs font-semibold italic animate-bounce font-mono ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-600'}`}>
                {noClicks > 5 ? "You know you don't have a choice, right? 😘" : "Can't click it! Try the other one! 😉"}
              </p>
            )}
          </motion.div>
        ) : (
          // YES CELEBRATION
          <motion.div
            key="success-step"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-md z-10"
            id="proposal-celebration"
          >
            {/* Huge dynamic celebration check */}
            <motion.div
              initial={{ rotate: -15, scale: 0.2 }}
              animate={{ rotate: 0, scale: [1, 1.2, 1] }}
              transition={{ type: 'spring', damping: 12 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md mb-6 border-2 ${
                isArtistic 
                  ? 'bg-emerald-50 border-stone-900 border-2 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]' 
                  : 'bg-emerald-100 border-emerald-300'
              }`}
            >
              <CheckCircle className={`w-10 h-10 ${isArtistic ? 'text-stone-900' : 'text-emerald-600'} fill-transparent`} />
            </motion.div>

            <motion.h3
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              className={`text-2xl mb-4 ${isArtistic ? 'font-black uppercase italic tracking-tighter text-stone-900 shadow-sm' : 'font-serif font-semibold text-rose-950'}`}
            >
              Proposal Accepted! 🎉
            </motion.h3>

            <p className={`leading-relaxed font-semibold ${isArtistic ? 'text-stone-800 italic' : 'text-rose-900 font-medium'}`}>
              {successMessage || "Yay! I am organizing everything right away! ❤️"}
            </p>

            {/* Playful Reset button if they want to play again */}
            <button
              onClick={() => {
                setHasAgreed(false);
                setNoPosition({ x: 0, y: 0 });
                setNoClicks(0);
              }}
              className={`mt-6 text-xs hover:underline font-mono font-bold ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-500'}`}
            >
              Start Over 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

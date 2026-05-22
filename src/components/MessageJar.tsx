import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, X } from 'lucide-react';

interface MessageJarProps {
  title: string;
  messages: string[];
  themeId?: string;
}

export default function MessageJar({ title, messages, themeId }: MessageJarProps) {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const isArtistic = themeId === 'artistic-flair';

  const drawReason = () => {
    if (!messages || messages.length === 0) return;
    
    // Trigger jar shake animation
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setActiveMessage(randomMsg);
    }, 450);
  };

  const closeMessage = () => {
    setActiveMessage(null);
  };

  return (
    <div 
      className={`w-full max-w-xl p-8 overflow-hidden relative z-10 text-center ${
        isArtistic
          ? 'bg-white border-3 border-stone-900 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-xl'
          : 'rounded-3xl bg-white/70 backdrop-blur-md border border-rose-100/40 shadow-xl'
      }`}
      id="love-jar-widget"
    >
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl pointer-events-none ${isArtistic ? 'bg-stone-500/10' : 'bg-pink-100/40'}`} />

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <span className={`text-xs uppercase font-bold tracking-widest mb-1 flex items-center gap-1 ${isArtistic ? 'text-[#FF3B30] font-black italic' : 'text-rose-500'}`}>
          <Sparkles className={`w-4 h-4 ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-400'}`} />
          Sweet Thoughts
        </span>
        <h2 className={`text-xl md:text-2xl leading-tight ${
          isArtistic ? 'font-black uppercase italic tracking-tighter text-stone-900' : 'font-serif font-bold text-rose-950'
        }`}>
          {title || 'Reasons Why I Love You 💌'}
        </h2>
        <p className={`text-xs mt-1.5 max-w-sm ${isArtistic ? 'text-stone-700 italic font-medium' : 'text-stone-600'}`}>
          Click the love jar to draw a sweet message or memory!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[220px] relative py-4">
        <AnimatePresence mode="wait">
          {!activeMessage ? (
            // THE INTERACTIVE JAR VIEW
            <motion.div
              key="jar-closed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: isShaking ? [0, -8, 8, -8, 8, 0] : 0 
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={drawReason}
              className="flex flex-col items-center cursor-pointer group"
              id="glass-jar-graphic"
            >
              {/* Glass Jar Graphic (Custom Styled SVG) */}
              <div className="relative w-40 h-48 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-200">
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  {/* Jar Lid */}
                  <rect x="30" y="5" width="40" height="12" rx="4" fill={isArtistic ? '#FF3B30' : '#be123c'} stroke={isArtistic ? '#1A1A1A' : undefined} strokeWidth={isArtistic ? '2' : undefined} />
                  <rect x="25" y="14" width="50" height="5" rx="1.5" fill={isArtistic ? '#1A1A1A' : '#f43f5e'} />
                  {/* Jar Neck */}
                  <path d="M 32 19 L 68 19 L 68 28 L 32 28 Z" fill={isArtistic ? '#FFFBF0' : 'rgba(254, 244, 245, 0.75)'} stroke={isArtistic ? '#1A1A1A' : '#fda4af'} strokeWidth="2.5" />
                  {/* Jar Body */}
                  <path d="M 32 28 C 15 28 8 36 8 52 L 8 100 C 8 112 18 116 35 116 L 65 116 C 82 116 92 112 92 100 L 92 52 C 92 36 85 28 68 28 Z" fill="rgba(255, 255, 255, 0.7)" stroke={isArtistic ? '#1A1A1A' : '#fda4af'} strokeWidth="3" />
                  
                  {/* Glow & Reflections */}
                  <path d="M 16 52 C 16 42 20 36 32 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
                  <path d="M 14 60 L 14 96" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
                  
                  {/* Heart Notes inside the Jar */}
                  <path d="M 35 60 C 35 55 45 55 45 60 C 45 65 35 70 35 70 C 35 70 25 65 25 60 C 25 55 35 55 35 60 Z" fill="#FF3B30" stroke={isArtistic ? '#1A1A1A' : undefined} strokeWidth={isArtistic ? '1.5' : undefined} opacity="0.9" transform="rotate(-15 35 60)" />
                  <path d="M 65 72 C 65 67 75 67 75 72 C 75 77 65 82 65 82 C 65 82 55 77 55 72 C 55 67 65 67 65 72 Z" fill="#FF3B30" opacity="0.95" transform="rotate(20 65 72)" />
                  <path d="M 45 92 C 45 87 55 87 55 92 C 55 97 45 102 45 102 C 45 102 35 97 35 92 C 35 87 45 87 45 92 Z" fill={isArtistic ? '#1A1A1A' : '#db2777'} opacity="0.85" transform="rotate(-8 45 92)" />
                  
                  {/* Label tag hanging */}
                  <rect x="25" y="44" width="50" height="26" rx="3" fill="#fafaf9" stroke="#1A1A1A" strokeWidth="2" />
                  <text x="50" y="58" fontStyle="serif" fontSize="6.5" fontWeight="black" textAnchor="middle" fill={isArtistic ? '#FF3B30' : '#9f1239'}>❤️ LOVE ❤️</text>
                  <text x="50" y="66" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#1A1A1A">JAR</text>
                </svg>
              </div>

              {/* Call to action */}
              <button
                onClick={drawReason}
                className={`mt-6 font-mono font-bold text-xs transition active:scale-95 cursor-pointer shadow-sm flex items-center gap-1 ${
                  isArtistic
                    ? 'bg-[#FF3B30] hover:bg-[#E02E24] text-white border-2 border-stone-1000 uppercase font-black px-4 py-2 rounded shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100/80 px-4 py-2 rounded-full border border-rose-200'
                }`}
              >
                Draw a Reason 💌
              </button>
            </motion.div>
          ) : (
            // THE CHOSEN LOVE MESSAGE / REASON POPUP CARD
            <motion.div
              key="jar-opened"
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -15 }}
              className={`w-full max-w-sm p-6 md:p-8 relative flex flex-col items-center text-center ${
                isArtistic
                  ? 'bg-[#FFFBF0] border-3 border-stone-900 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-xl'
                  : 'rounded-2xl bg-gradient-to-br from-pink-50 to-rose-200/40 border border-rose-200/70 shadow-lg'
              }`}
              id="love-jar-drawn-letter"
            >
              {/* Close Button */}
              <button
                onClick={closeMessage}
                className="absolute top-3 right-3 p-1 rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-3xl mb-4">💌</div>

              {/* Message content in cute handwritten italic serif style */}
              <p className={`text-base leading-relaxed font-semibold px-2 min-h-[60px] flex items-center justify-center ${
                isArtistic ? 'font-sans text-stone-900 font-extrabold tracking-tight uppercase italic' : 'font-serif italic text-rose-950 text-medium'
              }`}>
                “ {activeMessage} ”
              </p>

              <div className="mt-6 flex gap-3 h-10">
                {/* Draw another button */}
                <button
                  onClick={drawReason}
                  className={`flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition ${
                    isArtistic
                      ? 'bg-[#FF3B30] hover:bg-[#E02E24] text-white border-2 border-stone-900 font-extrabold uppercase italic tracking-tight py-1.5 px-4 rounded shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-[11px]'
                      : 'bg-rose-500 hover:bg-rose-600 border border-rose-400 text-white font-bold py-1.5 px-4 rounded-full text-xs'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Draw Another
                </button>
                {/* Close/Hide button */}
                <button
                  onClick={closeMessage}
                  className={`flex items-center gap-1 cursor-pointer active:scale-95 transition ${
                    isArtistic
                      ? 'bg-stone-55 hover:bg-stone-100 border-2 border-stone-900 text-stone-900 font-extrabold uppercase tracking-tight py-1.5 px-4 rounded shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] text-[11px]'
                      : 'bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold py-1.5 px-4 rounded-full text-xs'
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

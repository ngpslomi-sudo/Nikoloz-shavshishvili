import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, ArrowDown, Sparkles } from 'lucide-react';
import { LoveConfig } from '../types';

interface EnvelopeLetterProps {
  config: LoveConfig;
  isOpen: boolean;
  onOpenToggle: (val: boolean) => void;
  themeId?: string;
}

export default function EnvelopeLetter({ config, isOpen, onOpenToggle, themeId }: EnvelopeLetterProps) {
  const [hovered, setHovered] = useState(false);

  const isArtistic = themeId === 'artistic-flair';

  // Different font styles based on letterStyle
  const getStyleClass = () => {
    if (isArtistic) {
      return 'font-sans font-bold text-stone-900 leading-relaxed text-sm';
    }
    switch (config.letterStyle) {
      case 'handwritten':
        return 'font-serif italic tracking-wide text-lg text-amber-900 leading-relaxed';
      case 'classic-type':
        return 'font-mono text-sm tracking-tighter text-stone-850 leading-relaxed uppercase';
      case 'elegant':
      default:
        return 'font-serif text-base tracking-normal text-rose-950 leading-relaxed';
    }
  };

  const getBackgroundClass = () => {
    if (isArtistic) {
      return 'bg-white border-3 border-stone-900 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-xl';
    }
    switch (config.letterStyle) {
      case 'handwritten':
        return 'bg-amber-50/95 shadow-inner border border-amber-100';
      case 'classic-type':
        return 'bg-stone-100 border-2 border-dashed border-stone-300';
      case 'elegant':
      default:
        return 'bg-white/95 border border-rose-100';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[450px] relative z-10 px-4 py-8">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // ENVELOPE (CLOSED)
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -40 }}
            transition={{ type: 'spring', damping: 18 }}
            className={`relative cursor-pointer w-full max-w-lg aspect-[1.6/1] overflow-visible flex flex-col items-center justify-center transition-shadow ${
              isArtistic
                ? 'rounded-xl border-4 border-stone-900 shadow-[10px_10px_0px_0px_rgba(26,26,26,1)]'
                : 'rounded-lg shadow-2xl border-4 border-rose-500 hover:shadow-rose-400/20'
            }`}
            style={{ backgroundColor: config.envelopeColor || '#FF3B30' }}
            onClick={() => onOpenToggle(true)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            id="envelope-wrapper"
          >
            {/* Stamp Backing */}
            <div className={`absolute inset-0 rounded-lg pointer-events-none ${isArtistic ? 'bg-stone-900/10' : 'bg-rose-700/35'}`} />

            {/* Back Fold diagonals (SVG simulating interactive flaps) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 62.5" preserveAspectRatio="none">
              <path d="M 0 0 L 50 35 L 100 0" fill="none" stroke={isArtistic ? '#1A1A1A' : '#be123c'} strokeWidth={isArtistic ? '3.5' : '2'} opacity="0.9" />
              <path d="M 0 62.5 L 50 32 L 100 62.5" fill="none" stroke={isArtistic ? '#1A1A1A' : '#be123c'} strokeWidth={isArtistic ? '3' : '1.5'} opacity="0.9" />
              <path d="M 0 0 L 45 32 L 0 62.5" fill="none" stroke={isArtistic ? '#1A1A1A' : '#9f1239'} strokeWidth={isArtistic ? '2' : '1.5'} opacity="0.7" />
              <path d="M 100 0 L 55 32 L 100 62.5" fill="none" stroke={isArtistic ? '#1A1A1A' : '#9f1239'} strokeWidth={isArtistic ? '2' : '1.5'} opacity="0.7" />
            </svg>

            {/* Pulsing Hearth Seal */}
            <motion.div
              animate={hovered ? { scale: 1.15 } : { scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`absolute z-20 w-20 h-20 shadow-xl flex items-center justify-center ${
                isArtistic
                  ? 'bg-[#FFFBF0] border-3 border-stone-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rounded-lg'
                  : 'rounded-full bg-pink-100 border-2 border-pink-300/40'
              }`}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="text-4xl filter drop-shadow">
                {config.envelopeStampEmoji || '💖'}
              </div>
            </motion.div>

            {/* Animated prompt to open */}
            <div className="absolute bottom-4 left-0 right-0 text-center flex flex-col items-center select-none">
              <span className={`text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 ${isArtistic ? 'text-stone-900 bg-[#FFFBF0] px-2.5 py-1 border-2 border-stone-900 font-black italic rounded' : 'text-white font-semibold opacity-85'}`}>
                {!isArtistic && <Sparkles className="w-3.5 h-3.5 text-pink-200 animate-pulse" />}
                Open Letter
                {!isArtistic && <Sparkles className="w-3.5 h-3.5 text-pink-200 animate-pulse" />}
              </span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-1.5"
              >
                <ArrowDown className={`w-4 h-4 ${isArtistic ? 'text-stone-900' : 'text-pink-200'}`} />
              </motion.div>
            </div>

            {/* Personal Badge Tag */}
            <div className={`absolute top-4 left-4 sm:left-6 border font-mono max-w-[140px] sm:max-w-none truncate ${
              isArtistic
                ? 'bg-white border-2 border-stone-900 text-stone-900 font-black text-[10.5px] sm:text-xs px-2.5 py-1 rounded'
                : 'bg-white/10 border-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10.5px] sm:text-xs text-rose-100'
            }`} title={config.recipientName || 'My Beloved'}>
              To: {config.recipientName || 'My Beloved'}
            </div>
            
            <div className={`absolute top-4 right-4 sm:right-6 border font-mono max-w-[145px] sm:max-w-none truncate ${
              isArtistic
                ? 'bg-[#FFFBF0] border-2 border-stone-900 text-stone-900 font-extrabold text-[9.5px] sm:text-[10px] px-2 py-1 rounded'
                : 'bg-white/5 border-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10px] text-rose-200'
            }`} title={config.senderName || 'Your Soulmate'}>
              From: {config.senderName || 'Your Soulmate'}
            </div>
          </motion.div>
        ) : (
          // EXPANDED LETTER (OPENED)
          <motion.div
            key="envelope-opened"
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-xl flex flex-col items-stretch z-10"
          >
            {/* Retract button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => onOpenToggle(false)}
                className={`flex items-center gap-1.5 cursor-pointer shadow-sm transition hover:scale-105 active:scale-95 ${
                  isArtistic
                    ? 'bg-white border-2 border-stone-900 text-stone-900 shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] font-extrabold uppercase italic px-4 py-2 rounded text-xs'
                    : 'bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3.5 py-1.5 rounded-full text-xs font-semibold'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Put Back in Envelope
              </button>
            </div>

            {/* Letter page */}
            <motion.div
              layoutId="love-paper"
              transition={{ type: 'spring', damping: 20 }}
              className={`p-8 md:p-12 shadow-xl flex flex-col relative overflow-hidden ${getBackgroundClass()}`}
              id="love-letter-paper"
            >
              {/* Envelope details decorative circles */}
              {!isArtistic && (
                <>
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-rose-50/50 pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-rose-50/55 pointer-events-none" />
                </>
              )}

              {/* Top metadata */}
              <div className={`flex justify-between items-center pb-4 mb-6 border-b ${isArtistic ? 'border-b-2 border-stone-900' : 'border-rose-100/60'}`}>
                <div className={`text-xs uppercase font-bold ${isArtistic ? 'text-[#FF3B30] font-black italic tracking-widest' : 'text-rose-500/80 font-mono tracking-wider'}`}>
                  Love Letter ✨
                </div>
                <Heart className={`w-5 h-5 ${isArtistic ? 'text-[#FF3B30] fill-[#FF3B30] animate-bounce' : 'text-rose-500 fill-rose-500 animate-heartbeat'}`} />
              </div>

              {/* Title */}
              {config.letterTitle && (
                <h1 className={`text-2xl md:text-3xl mb-6 tracking-tight leading-tight ${
                  isArtistic ? 'font-black uppercase italic text-stone-900 tracking-tighter' : 'font-serif font-semibold text-rose-950'
                }`}>
                  {config.letterTitle}
                </h1>
              )}

              {/* Paragraph content */}
              <div className={`${getStyleClass()} whitespace-pre-wrap min-h-[160px]`}>
                {config.letterContent || 'Your sweet words will appear here... ❤️'}
              </div>

              {/* Sender Signature */}
              <div className={`mt-8 pt-6 flex flex-col items-end border-t ${isArtistic ? 'border-t-2 border-stone-900' : 'border-rose-100/60'}`}>
                <span className={`text-xs font-semibold mb-1 ${isArtistic ? 'text-stone-700 italic font-mono' : 'text-rose-400 font-mono'}`}>
                  Forever yours,
                </span>
                <span className={`text-lg ${
                  isArtistic ? 'font-sans font-black uppercase text-[#FF3B30] italic tracking-tighter' : 'font-serif italic font-bold text-rose-800'
                }`}>
                  {config.senderName || 'Your Soulmate'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

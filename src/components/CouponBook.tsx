import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Scissors, Check, Gift } from 'lucide-react';
import { Coupon } from '../types';

interface CouponBookProps {
  coupons: Coupon[];
  onRedeem: (id: string) => void;
  themeId?: string;
}

export default function CouponBook({ coupons, onRedeem, themeId }: CouponBookProps) {
  const [redeemedStampId, setRedeemedStampId] = useState<string | null>(null);

  const isArtistic = themeId === 'artistic-flair';

  const handleRedeemClick = (coupon: Coupon) => {
    if (coupon.redeemed) return;
    
    // Play stamp animation local state
    setRedeemedStampId(coupon.id);
    
    // Allow animation to render before updating parent state
    setTimeout(() => {
      onRedeem(coupon.id);
      setRedeemedStampId(null);
    }, 700);
  };

  if (!coupons || coupons.length === 0) return null;

  return (
    <div className="w-full max-w-2xl px-4 py-8 relative z-10" id="coupon-book-widget">
      {/* Centered header */}
      <div className={`flex flex-col items-center mb-10 text-center ${isArtistic ? 'text-stone-900' : 'text-rose-950'}`}>
        <span className={`text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-1 ${isArtistic ? 'text-[#FF3B30] font-black italic' : 'text-rose-500'}`}>
          <Gift className={`w-4 h-4 ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-400'}`} />
          Special Gift
        </span>
        <h2 className={`text-2xl md:text-3xl tracking-tight ${isArtistic ? 'font-black uppercase italic tracking-tighter' : 'font-serif font-bold'}`}>
          Love Coupon Book 🎫
        </h2>
        <p className={`mt-2 text-sm max-w-md ${isArtistic ? 'text-stone-700 italic font-medium' : 'text-stone-600'}`}>
          You can redeem these coupons anytime. Just pick one and present it to me! 😉
        </p>
      </div>

      {/* Grid of coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => {
          const isAnimating = redeemedStampId === coupon.id;
          const isRedeemed = coupon.redeemed;

          return (
            <div
              key={coupon.id}
              className={`relative overflow-hidden p-6 ${
                isArtistic
                  ? `bg-white border-3 border-stone-900 ${isRedeemed ? 'opacity-55' : 'shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]'}`
                  : `rounded-2xl bg-white/75 backdrop-blur-md border-2 border-dashed ${isRedeemed ? 'border-stone-200 opacity-60' : 'border-rose-200 shadow-md'}`
              } flex flex-col justify-between min-h-[190px] transition`}
              id={`coupon-card-${coupon.id}`}
            >
              {/* Punch hole styling inside corners */}
              <div className={`absolute top-1/2 -left-3 w-6 h-6 rounded-full -translate-y-1/2 pointer-events-none ${isArtistic ? 'bg-[#FFFBF0] border-2 border-stone-900' : 'bg-rose-50 border border-stone-200/50'}`} />
              <div className={`absolute top-1/2 -right-3 w-6 h-6 rounded-full -translate-y-1/2 pointer-events-none ${isArtistic ? 'bg-[#FFFBF0] border-2 border-stone-900' : 'bg-rose-50 border border-stone-200/50'}`} />

              {/* Upper Section */}
              <div className={`${isRedeemed ? 'opacity-40' : ''} transition`}>
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{coupon.emoji || '🎫'}</span>
                  <Ticket className={`w-4 h-4 ${isArtistic ? 'text-stone-900' : 'text-rose-300'}`} />
                </div>
                <h3 className={`mt-3 text-base leading-tight ${isArtistic ? 'font-extrabold uppercase tracking-tight text-stone-900' : 'font-serif font-bold text-rose-950'}`}>
                  {coupon.title}
                </h3>
                <p className={`mt-1.5 text-xs leading-relaxed ${isArtistic ? 'text-stone-800 font-medium' : 'text-stone-700'}`}>
                  {coupon.description}
                </p>
              </div>

              {/* Lower Section (Redeem Button and Promo Code) */}
              <div className={`mt-4 pt-3 border-t border-dotted ${isArtistic ? 'border-stone-900' : 'border-rose-100'} flex items-center justify-between z-10`}>
                <div className={`text-[10px] font-mono font-semibold px-2 py-1 rounded uppercase tracking-wide ${isArtistic ? 'bg-[#FFFBF0] border border-stone-900 text-stone-900' : 'bg-stone-100/80 text-stone-500'}`}>
                  Code: {coupon.code}
                </div>

                {!isRedeemed ? (
                  <button
                    onClick={() => handleRedeemClick(coupon)}
                    disabled={isAnimating}
                    className={`flex items-center gap-1 cursor-pointer transition ${
                      isArtistic
                        ? 'bg-[#FF3B30] hover:bg-[#E02E24] text-white font-extrabold uppercase italic tracking-tight text-xs py-1.5 px-3.5 border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] rounded hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                        : 'bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-1.5 px-3 rounded-full shadow-sm active:scale-95'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    Redeem
                  </button>
                ) : (
                  <div className={`flex items-center gap-1 font-mono font-bold text-xs ${isArtistic ? 'text-stone-900' : 'text-emerald-600'}`}>
                    <Check className="w-4 h-4" />
                    Redeemed
                  </div>
                )}
              </div>

              {/* STAMP EMBOSSED REDEEM ANIMATION OVERLAY */}
              <AnimatePresence>
                {(isRedeemed || isAnimating) && (
                  <motion.div
                    initial={{ scale: 2.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 0.85, rotate: -15 }}
                    transition={{ type: 'spring', damping: 10, mass: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none z-20"
                  >
                    <div className={`px-4 py-2 text-center text-sm font-black font-mono tracking-widest uppercase scale-110 shadow-lg ${
                      isArtistic
                        ? 'border-3 border-[#FF3B30] text-[#FF3B30] bg-white rounded'
                        : 'border-4 border-emerald-600 text-emerald-600 rounded-lg bg-white/95'
                    }`}>
                      ✓ Redeemed 😘
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

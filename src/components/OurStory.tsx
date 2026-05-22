import { motion } from 'motion/react';
import { Calendar, Sparkles } from 'lucide-react';
import { TimelineEvent } from '../types';

interface OurStoryProps {
  events: TimelineEvent[];
  themeId?: string;
}

export default function OurStory({ events, themeId }: OurStoryProps) {
  if (!events || events.length === 0) {
    return null;
  }

  const isArtistic = themeId === 'artistic-flair';

  return (
    <div className="w-full max-w-2xl px-4 py-8 relative z-10" id="our-story-timeline">
      {/* Decorative Title */}
      <div className={`flex flex-col items-center mb-12 text-center ${isArtistic ? 'text-stone-900' : 'text-rose-950'}`}>
        <span className={`text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-1 ${isArtistic ? 'text-[#FF3B30] font-black italic' : 'text-rose-500'}`}>
          <Sparkles className={`w-4 h-4 ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-400'}`} />
          Our Path Together
        </span>
        <h2 className={`text-2xl md:text-3xl tracking-tight ${isArtistic ? 'font-black uppercase italic tracking-tighter' : 'font-serif font-bold'}`}>
          Our Love Story 💕
        </h2>
      </div>

      {/* Main timeline axis */}
      <div className={`relative ml-4 md:ml-6 pl-8 md:pl-10 space-y-10 py-2 border-l-2 ${isArtistic ? 'border-stone-900 border-solid' : 'border-dashed border-rose-300/60'}`}>
        {events.map((event, index) => (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.15, duration: 0.5, type: 'spring' }}
            className="relative"
          >
            {/* Timeline pointer with custom interactive emoji or heart */}
            <div className={`absolute top-1.5 flex items-center justify-center text-base md:text-lg z-10 hover:scale-110 hover:rotate-12 transition ${
              isArtistic
                ? '-left-[46px] md:-left-[55px] w-9 h-9 md:w-11 md:h-11 rounded bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                : '-left-[45px] md:-left-[53px] w-8 h-8 md:w-10 md:h-10 rounded-full bg-rose-50 border-2 border-rose-300 shadow-md'
            }`}>
              {event.emoji || '✨'}
            </div>

            {/* Content card */}
            <div className={`p-6 transition hover:-translate-y-0.5 ${
              isArtistic
                ? 'bg-white border-3 border-stone-900 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] rounded-xl'
                : 'rounded-2xl bg-white/70 backdrop-blur-md border border-rose-100/30 shadow-lg hover:shadow-xl'
            }`}>
              {/* Date element */}
              <div className={`flex items-center gap-1.5 text-xs font-mono font-bold mb-2.5 ${isArtistic ? 'text-[#FF3B30]' : 'text-rose-600'}`}>
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>

              {/* Event title */}
              <h3 className={`text-lg mb-2 ${isArtistic ? 'font-extrabold uppercase tracking-tight text-stone-900' : 'font-serif font-bold text-rose-950'}`}>
                {event.title}
              </h3>

              {/* Event description */}
              <p className={`text-sm leading-relaxed whitespace-pre-line ${isArtistic ? 'text-stone-850 font-medium' : 'text-stone-880'}`}>
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Sparkles, Volume2, VolumeX, Eye, Edit3, 
  HelpCircle, Gift, Share2, Award, X, Check
} from 'lucide-react';
import { LoveConfig, RomanticTheme } from './types';
import { INITIAL_LOVE_CONFIG, ROMANTIC_THEMES } from './data';

import HeartFall from './components/HeartFall';
import EnvelopeLetter from './components/EnvelopeLetter';
import WillYouBeMy from './components/WillYouBeMy';
import OurStory from './components/OurStory';
import CouponBook from './components/CouponBook';
import MessageJar from './components/MessageJar';
import TriviaQuiz from './components/TriviaQuiz';
import CreatorPanel from './components/CreatorPanel';

export default function App() {
  const [config, setConfig] = useState<LoveConfig>(INITIAL_LOVE_CONFIG);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMobilePreviewActive, setIsMobilePreviewActive] = useState(false);
  
  // Local storage cache to help persist their customization
  useEffect(() => {
    const cached = localStorage.getItem('romantic_builder_config');
    if (cached) {
      try {
        setConfig(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse cached config:", err);
      }
    }
  }, []);

  const handleConfigChange = (newConfig: LoveConfig) => {
    setConfig(newConfig);
    localStorage.setItem('romantic_builder_config', JSON.stringify(newConfig));
  };

  // Get current active theme colors
  const activeTheme = ROMANTIC_THEMES.find(t => t.id === config.themeId) || ROMANTIC_THEMES[0];

  // Coupon redemption logic inside the parent config
  const handleRedeemCoupon = (id: string) => {
    const updatedCoupons = config.coupons.list.map(c => 
      c.id === id ? { ...c, redeemed: true } : c
    );
    handleConfigChange({
      ...config,
      coupons: {
        ...config.coupons,
        list: updatedCoupons
      }
    });
  };

  const handleDownloadConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "love-template-config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Cassette soundtrack logic
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const toggleSoundtrack = () => {
    if (!audioRef.current) {
      // Cozy sweet acoustic melody to make it feel extremely romantic!
      const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audio.loop = true;
      audio.volume = 0.35;
      audioRef.current = audio;
    }

    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio autoplay was restricted:", err));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row overflow-hidden font-sans ${activeTheme.bg} transition-colors duration-500`} id="app-root">
      {/* Floating Canvas Particles Effect */}
      <HeartFall themeId={config.themeId} />

      {/* BACKGROUND MUSIC PULSING CASSETTE */}
      <div className="fixed bottom-5 right-5 z-40" id="ambient-audio-player">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSoundtrack}
          className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-lg cursor-pointer ${
            isPlayingMusic 
              ? 'bg-rose-500 border-rose-400 text-white animate-pulse' 
              : 'bg-stone-900/90 border-stone-800 text-stone-300'
          }`}
        >
          {isPlayingMusic ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* LEFT COLUMN: CREATOR DASHBOARD / PANEL */}
      <div 
        className={`w-full md:w-[410px] xl:w-[440px] shrink-0 h-screen border-b md:border-b-0 border-stone-800 transition-transform ${
          isMobilePreviewActive ? 'hidden md:flex' : 'flex'
        }`}
        id="creator-sidebar-frame"
      >
        <CreatorPanel 
          config={config} 
          onChange={handleConfigChange}
          onPreviewToggle={() => setIsMobilePreviewActive(true)}
        />
      </div>

      {/* RIGHT COLUMN: PREVIEW VIEWPORT (FULLY RESPONSIVE VIEW FOR ALL SCREENS) */}
      <div 
        className={`flex-1 h-screen flex flex-col relative overflow-y-auto bg-transparent ${
          !isMobilePreviewActive && 'hidden md:flex'
        }`}
        id="preview-viewport-frame"
      >
        
        {/* EDIT STATE NAVBAR / HEADER BAR */}
        <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-rose-150/20 px-4 py-2.5 sm:px-5 sm:py-3.5 flex items-center justify-between select-none shadow-sm shrink-0">
          <div className="flex items-center gap-2 select-none">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <div className="text-xs font-bold text-rose-950 font-mono">
              LIVE PREVIEW
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile / preview switch */}
            <button
              onClick={() => setIsMobilePreviewActive(false)}
              className="md:hidden bg-stone-900 hover:bg-stone-850 text-stone-100 text-xs font-bold py-1.5 px-3 rounded-md flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor 🛠️
            </button>
          </div>
        </div>

        {/* RESPONSIVE TEMPLATE VIEWPORT */}
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center space-y-12 pb-32">
          
          {/* INTRO HERO BILLBOARD */}
          <div className="text-center max-w-lg select-none space-y-3 mt-4" id="intro-love-billboard">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
              activeTheme.id === 'artistic-flair' 
                ? 'font-sans font-black uppercase text-stone-900 tracking-tighter italic' 
                : 'font-serif text-rose-950'
            }`}>
              Personal Site for My {config.recipientName || 'Beloved'} !
            </h2>
            <p className={`text-sm font-semibold italic ${
              activeTheme.id === 'artistic-flair' ? 'text-[#FF3B30]' : 'text-rose-900'
            }`}>
              Open the letter to find special surprises 🍿🧸
            </p>
          </div>

          {/* DYNAMIC OPENING ENVELOPE MODULE */}
          <section className="w-full flex justify-center" id="envelope-letter-section">
            <EnvelopeLetter 
              config={config} 
              isOpen={isEnvelopeOpen} 
              onOpenToggle={setIsEnvelopeOpen} 
              themeId={config.themeId}
            />
          </section>

          {/* DYNAMIC ACCORDION WIDGETS DISPLAY - LOADED ONCE ENVELOPE OPENS (Saves romantic suspense!) */}
          <AnimatePresence>
            {isEnvelopeOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="w-full flex flex-col items-center space-y-14"
                id="interactive-sub-widgets"
              >
                {/* PROPOSAL "Will you be my Valentine/Date" */}
                {config.proposal.enabled && (
                  <section className="w-full flex justify-center">
                    <WillYouBeMy 
                      question={config.proposal.question}
                      yesText={config.proposal.yesText}
                      noText={config.proposal.noText}
                      successMessage={config.proposal.successMessage}
                      themeId={config.themeId}
                    />
                  </section>
                )}

                {/* OUR STORY TIMELINE */}
                {config.timeline.enabled && (
                  <section className="w-full flex justify-center">
                    <OurStory events={config.timeline.list} themeId={config.themeId} />
                  </section>
                )}

                {/* THE REASONS MESSAGE JAR */}
                {config.loveJar.enabled && (
                  <section className="w-full flex justify-center">
                    <MessageJar 
                      title={config.loveJar.title} 
                      messages={config.loveJar.reasons} 
                      themeId={config.themeId}
                    />
                  </section>
                )}

                {/* REDEEMABLE LOVE COUPONS */}
                {config.coupons.enabled && (
                  <section className="w-full flex justify-center">
                    <CouponBook 
                      coupons={config.coupons.list} 
                      onRedeem={handleRedeemCoupon} 
                      themeId={config.themeId}
                    />
                  </section>
                )}

                {/* TRIVIA RELATIONSHIP QUIZ */}
                {config.trivia.enabled && (
                  <section className="w-full flex justify-center">
                    <TriviaQuiz questions={config.trivia.questions} themeId={config.themeId} />
                  </section>
                )}

                {/* FOOTER SIGNATURE BADGE */}
                <footer className={`text-center text-xs font-mono select-none pt-12 pb-6 border-t w-full ${
                  activeTheme.id === 'artistic-flair' 
                    ? 'border-t-2 border-stone-900 text-stone-900 font-bold uppercase' 
                    : 'border-rose-300/25 text-rose-800/60'
                }`}>
                  <p>© {new Date().getFullYear()} – Made with love ❤️</p>
                </footer>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}

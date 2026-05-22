import { RomanticTheme, LoveConfig } from './types';

export const ROMANTIC_THEMES: RomanticTheme[] = [
  {
    id: 'artistic-flair',
    name: 'Artistic Flair 🎨',
    bg: 'bg-[#FFFBF0]',
    cardBg: 'bg-white border-3 border-stone-900 shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] rounded-xl',
    primary: 'text-white bg-[#FF3B30] hover:bg-[#E02E24] border-2 border-stone-1000 font-extrabold uppercase tracking-tight',
    accent: 'border-stone-900 bg-[#FF3B30] text-white font-extrabold uppercase tracking-widest',
    text: 'text-stone-900 font-extrabold uppercase tracking-tight',
    secondaryText: 'text-[#FF3B30] font-bold italic',
    border: 'border-stone-900 border-2',
    fontFamily: 'font-sans',
  },
  {
    id: 'sweet-crimson',
    name: 'Sweet Crimson 🌹',
    bg: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
    cardBg: 'bg-white/85 backdrop-blur-md',
    primary: 'text-red-600 bg-red-100 hover:bg-red-200',
    accent: 'border-red-500 bg-rose-500 text-white',
    text: 'text-rose-950',
    secondaryText: 'text-rose-700',
    border: 'border-rose-100',
    fontFamily: 'font-serif',
  },
  {
    id: 'cozy-peach',
    name: 'Cozy Peach 🍑',
    bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-rose-100',
    cardBg: 'bg-white/90 backdrop-blur-sm',
    primary: 'text-amber-700 bg-orange-100 hover:bg-orange-200',
    accent: 'border-orange-400 bg-orange-500 text-white',
    text: 'text-orange-950',
    secondaryText: 'text-orange-800',
    border: 'border-orange-100',
    fontFamily: 'font-sans',
  },
  {
    id: 'starry-night',
    name: 'Midnight Stars ✨',
    bg: 'bg-gradient-to-br from-slate-950 via-violet-950 to-indigo-950 text-white',
    cardBg: 'bg-slate-900/80 backdrop-blur-xl border border-violet-800/35',
    primary: 'text-violet-300 bg-violet-900/40 hover:bg-violet-900/60',
    accent: 'border-violet-500 bg-violet-600 text-white',
    text: 'text-indigo-100',
    secondaryText: 'text-violet-300',
    border: 'border-violet-900',
    fontFamily: 'font-sans',
  },
  {
    id: 'vintage-velvet',
    name: 'Classic Vintage 📻',
    bg: 'bg-gradient-to-br from-stone-100 via-yellow-50/30 to-rose-50/50',
    cardBg: 'bg-stone-50/90 border border-stone-200/60 shadow-md',
    primary: 'text-rose-800 bg-stone-200/80 hover:bg-stone-300/80',
    accent: 'border-rose-700 bg-stone-800 text-amber-50',
    text: 'text-stone-900',
    secondaryText: 'text-rose-900',
    border: 'border-stone-200',
    fontFamily: 'font-serif',
  },
  {
    id: 'sugar-cute',
    name: 'Sugar Pop 🦄',
    bg: 'bg-gradient-to-br from-pink-100 via-sky-50 to-purple-100',
    cardBg: 'bg-white/95 border-2 border-pink-200 shadow-sm',
    primary: 'text-pink-600 bg-pink-100 hover:bg-pink-200',
    accent: 'border-pink-300 bg-pink-400 text-white hover:bg-pink-500',
    text: 'text-pink-900',
    secondaryText: 'text-pink-700/80',
    border: 'border-pink-200',
    fontFamily: 'font-sans',
  }
];

export const INITIAL_LOVE_CONFIG: LoveConfig = {
  themeId: 'artistic-flair',
  recipientName: 'My Beloved',
  senderName: 'Your Soulmate',
  envelopeColor: '#FF3B30',
  envelopeStampEmoji: '💖',
  letterTitle: 'You might be wondering what this is...',
  letterContent: `I built this dedicated digital space just for you! I wanted to give you something truly special, personal, and ours to celebrate our connection.\n\nHere you will find my heartful letters, a timeline of our sweetest memories, and a few little interactive surprises. Flip through our milestones, claim some sweet love coupons, take a fun relationship quiz, and most of all – always remember that you are the most precious person in my world! ✨\n\nWith all my love, always.`,
  letterStyle: 'elegant',
  proposal: {
    enabled: true,
    question: 'Will you go on a romantic date with me this weekend? 🍽️🥂',
    yesText: 'Yes, with all my heart! 😍',
    noText: 'No 😜',
    successMessage: 'YAY! 🎉 I am already preparing and booking the best spot in town for us! ❤️📅',
  },
  timeline: {
    enabled: true,
    list: [
      {
        id: '1',
        date: 'February 14, 2025',
        title: 'First Meeting ☕',
        description: 'At that cozy little cafe, where a single glance was all it took to know you were special. Hours flew by like minutes.',
        emoji: '✨',
      },
      {
        id: '1.2',
        date: 'February 28, 2025',
        title: 'First Kiss 🌧️',
        description: 'Right when the unexpected rain caught us and we ran laughing to take shelter. A moment forever frozen in time!',
        emoji: '❤️',
      },
      {
        id: '2',
        date: 'May 22, 2025',
        title: 'First Trip Together 🏔️',
        description: 'The misty peaks, warm cups of hot chocolate, and breathtaking views that made us fall even deeper in love.',
        emoji: '🏕️',
      },
    ],
  },
  coupons: {
    enabled: true,
    list: [
      {
        id: 'c1',
        title: '1 Kiss & Warm Hug Every 10 Minutes 😘',
        description: 'This coupon grants you unlimited kisses and cozy embraces on demand all day long.',
        emoji: '💖',
        code: 'KISS-999',
        redeemed: false,
      },
      {
        id: 'c2',
        title: 'Home-Cooked Dinner by Me 🍳🍝',
        description: 'You pick the menu – I will cook a delicious dinner from scratch and light up the candles for us.',
        emoji: '🍝',
        code: 'DINNER-007',
        redeemed: false,
      },
      {
        id: 'c3',
        title: 'Movie Night Marathon of your Choice 🍿🎥',
        description: 'We watch whatever films you want (even cheesy rom-coms!), and I promise not a single complaint!',
        emoji: '🍿',
        code: 'MOVIE-444',
        redeemed: false,
      },
    ],
  },
  trivia: {
    enabled: true,
    questions: [
      {
        id: 't1',
        question: 'What was our first movie together? 🎬',
        options: ['Interstellar', 'La La Land', 'The Notebook', 'First Date'],
        correctAnswerIdx: 1,
      },
      {
        id: 't2',
        question: 'Who said "I love you" first? 💘',
        options: ['Me (Your Soulmate)', 'You', 'Both at the exact same time', 'It just happened naturally'],
        correctAnswerIdx: 0,
      },
      {
        id: 't3',
        question: 'Where is our favorite place to wander together? 🗺️',
        options: ['Local parks', 'Going out to eat', 'Scenic old streets', 'Anywhere – as long as it is together!'],
        correctAnswerIdx: 3,
      },
    ],
  },
  loveJar: {
    enabled: true,
    title: 'Reasons Why I Love You 💌',
    reasons: [
      'Your warmest smile that instantly makes me forget all my worries! 😊',
      'How genuinely you care for me, even when I am having a rough day.',
      'Your amazing sense of humor and how easily you make me laugh.',
      'The sweet way you cuddle close whenever we hug.',
      'That you are not just my love, but also my absolute best friend.',
      'Your beautiful eyes where I see our brightest future. 👀',
      'The little moments when you suddenly hold my hand in the street.',
      'The incredible kindness and empathy you always show to others. 🌟',
    ],
  },
};

export interface LovePreset {
  id: string;
  name: string;
  description: string;
  emoji: string;
  config: LoveConfig;
}

export const PRESET_TEMPLATES: LovePreset[] = [
  {
    id: 'sweet-romantic',
    name: 'Romantic 🌹',
    description: 'Filled with deep affection, warm words, and gorgeous pink style presets',
    emoji: '🌹',
    config: {
      themeId: 'sweet-crimson',
      recipientName: 'My Beautiful',
      senderName: 'Your Only One',
      envelopeColor: '#f43f5e',
      envelopeStampEmoji: '💖',
      letterStyle: 'elegant',
      letterTitle: 'It feels like I searched for you my whole life...',
      letterContent: `My dearest one, I created this space just to see that beautiful smile on your face!\n\nI know I might not say it often enough, but every day of mine starts and ends with you. This page holds our magic moments and special surprises!\n\nCheck out the games, redeem your cozy coupons, and always remember that you make the whole world a much more beautiful place! ✨`,
      proposal: {
        enabled: true,
        question: 'I am crazy about you! Will you accompany me for an unforgettable romantic dinner? 🥂✨',
        yesText: 'Yes, with all my heart! 😍',
        noText: 'No 😋',
        successMessage: 'You are my dream! 🎉 Romantic dinner at a gorgeous place is officially on! ❤️',
      },
      timeline: {
        enabled: true,
        list: [
          { id: 'r1', date: 'Exactly one year ago', title: 'First Hug 🥰', description: 'It felt like we both finally found our peaceful sanctuary.', emoji: '💖' },
          { id: 'r2', date: 'First Evening', title: 'Dancing Under the Stars ✨', description: 'Soft music, a gentle evening breeze, and your warmth that stopped time.', emoji: '🌌' }
        ]
      },
      coupons: {
        enabled: true,
        list: [
          { id: 'rc1', title: 'Unconditional Makeup Hug 🤗', description: 'The moment you present this coupon, I am bound to embrace you tightly, even if I was the stubborn one!', emoji: '🤗', code: 'WUG-HUG', redeemed: false },
          { id: 'rc2', title: 'Midnight Sweet Chocolate Delivery 🍫', description: 'Even if it is midnight, I will personally fetch your favorite chocolates or sweets anytime!', emoji: '🍫', code: 'SWEET-000', redeemed: false }
        ]
      },
      trivia: {
        enabled: true,
        questions: [
          { id: 'rt1', question: 'What was I wearing on our first meeting? 👗', options: ['Probably black jeans', 'A beautiful dress', 'A cozy yellow top', 'Your absolute favorite smile!'], correctAnswerIdx: 3 },
          { id: 'rt2', question: 'What is my favorite quality about you? 🥰', options: ['Your caring heart', 'Your soothing voice', 'How you always make me laugh', 'Everything combined!'], correctAnswerIdx: 3 }
        ]
      },
      loveJar: {
        enabled: true,
        title: '5 Reasons Why You Are My World 💌',
        reasons: [
          'Your eyes, where I see my happiest future ❤️',
          'Your absolute honesty and incredible loyalty.',
          'How warmly you share your every emotion with me.',
          'Every single phone call that completely brightens up my day.',
          'Your sweet fragrance and the unique comfort of your touch.'
        ]
      }
    }
  },
  {
    id: 'funny-slang',
    name: 'Playful & Silly 🤪',
    description: 'Packed with fun inside jokes, playful banter, food cravings, and lighthearted slangs',
    emoji: '🤪',
    config: {
      themeId: 'artistic-flair',
      recipientName: 'My Cutie Pie',
      senderName: 'Your Food Sponsor',
      envelopeColor: '#FF3B30',
      envelopeStampEmoji: '🍕',
      letterStyle: 'classic-type',
      letterTitle: 'Just tap the card, get it, buddy? 😂',
      letterContent: `This site was built purely to remind you: you are the main surprise of my life, my favorite pizza slice, and the absolute highlight of my daily scrolling!\n\nI know you pick on me for being a goofball, but life without you would be as tasteless as plain boiled potatoes!\n\nExplore this page, ace the customized quiz (answer correctly, I am watching!), and prepare for some hilarious fun! 🚀`,
      proposal: {
        enabled: true,
        question: 'Let us go pig out on tacos or burgers this weekend, my treat! 🌮🤤',
        yesText: 'Absolutely, count me in! 🐷',
        noText: 'No way 😜',
        successMessage: 'YESSS! 🎉 Already ordering and planning the ultimate cheat-day feast! 🤤🍻',
      },
      timeline: {
        enabled: true,
        list: [
          { id: 'f1', date: 'Sometime in the past', title: 'The Hangry Meeting 🍕', description: 'When you stole my last slice of pizza and I realized you had stolen my heart too.', emoji: '🍕' },
          { id: 'f2', date: 'Monday Morning', title: 'Dramatic Pout 😤', description: 'Giving me the silent treatment for 5 entire minutes because I did not share my candy.', emoji: '🍿' }
        ]
      },
      coupons: {
        enabled: true,
        list: [
          { id: 'fc1', title: '1 Giant Royal Cheat-Feast Delivery 🌯', description: 'Gives you the absolute right to demand gourmet food delivered to you at any hour!', emoji: '🌯', code: 'SHAURMA-999', redeemed: false },
          { id: 'fc2', title: '2 Hours of Absolute Quiet 🤫', description: 'Surrender! I will sit completely quiet and agree with absolutely everything you say.', emoji: '🤐', code: 'SILENCE-404', redeemed: false }
        ]
      },
      trivia: {
        enabled: true,
        questions: [
          { id: 'ft1', question: 'Who eats more between us? 🐷', options: ['Obvious choice: you!', 'Me (of course)', 'We are both equal disasters', 'The neighbor'], correctAnswerIdx: 2 },
          { id: 'ft2', question: 'Where does 80% of our money go? 💸', options: ['Self-improvement', 'Eating our way through the city', 'Trendy outfits', 'Our savings account'], correctAnswerIdx: 1 }
        ]
      },
      loveJar: {
        enabled: true,
        title: 'My Dumb Little Confessions 🤪',
        reasons: [
          'Your crazy loud laugh that probably alerts the entire neighborhood 😂',
          'That you are the only one who actually gets my terrible dad jokes.',
          'That you still love me even when I am lazy and sleep-deprived.',
          'Your adorable happy food dance when you see yummy snacks.',
          'You are my ultimate gossip partner. Chats with you are unmatched!'
        ]
      }
    }
  },
  {
    id: 'sweet-apology',
    name: 'Sweet Apology 🥺',
    description: 'When you made a silly mistake, want to say sorry, and bring back that smile.',
    emoji: '🥺',
    config: {
      themeId: 'vintage-velvet',
      recipientName: 'My Angry Angel',
      senderName: 'Your Sorry Goofball',
      envelopeColor: '#7c2d12',
      envelopeStampEmoji: '🥺',
      letterStyle: 'handwritten',
      letterTitle: 'Please forgive me, my darling... ❤️',
      letterContent: `I know I can be incredibly clumsy and sometimes my stubborn attitude hurts your feelings. But please believe me, there is absolutely no one more precious to me in this world!\n\nI made this surprise site just to bring back that gorgeous smile of yours. I hope with all my heart you can forgive me and hold me close again.\n\nLet us make up, please... I need your smile like I need air! 🥺🎈`,
      proposal: {
        enabled: true,
        question: 'Will you forgive me and let me treat you to a nice cup of coffee or ice cream? 🥺☕',
        yesText: 'Fine, I forgive you! 😘',
        noText: 'Nope, you need to work harder 😜',
        successMessage: 'YAY! 🎉 The biggest hug and sweetest coffee are on me! I love you endlessly! ❤️',
      },
      timeline: {
        enabled: true,
        list: [
          { id: 'ap1', date: 'Our Happy Days', title: 'Laughing Together 🤗', description: 'I want us to laugh like this forever, and never let my clumsy mistakes get in the way again.', emoji: '🌟' }
        ]
      },
      coupons: {
        enabled: true,
        list: [
          { id: 'apc1', title: '1 Magic "Get Out of Argument" Pass 🎟️', description: 'Presenting this immediately stops any argument and gets you free kisses and apologies!', emoji: '🥺', code: 'SORRY-WUG', redeemed: false },
          { id: 'apc2', title: 'Ultimate Pampering Full-body Massage 💆‍♀️', description: 'To melt away all stress and annoyance, a luxurious massage performed entirely by me.', emoji: '💆‍♀️', code: 'STRESS-OFF', redeemed: false }
        ]
      },
      trivia: {
        enabled: true,
        questions: [
          { id: 'apt1', question: 'What is the absolute worse punishment for me? ❌', options: ['Losing my phone', 'Seeing your beautiful face sad', 'No internet access', 'Waking up early'], correctAnswerIdx: 1 }
        ]
      },
      loveJar: {
        enabled: true,
        title: 'My 4 Promises to You 💌',
        reasons: [
          'I promise to listen more attentively and be more understanding!',
          'I will always bring you your favorite sweet chocolate when you are down.',
          'I will do my absolute best to tone down my stubbornness.',
          'Your happiness is my highest priority, and I will do everything for it!'
        ]
      }
    }
  },
  {
    id: 'anniversary-party',
    name: 'Anniversary ⏳',
    description: 'Celebrate months or years of togetherness with a sweet, elegant peach theme.',
    emoji: '🥂',
    config: {
      themeId: 'cozy-peach',
      recipientName: 'My Happiness',
      senderName: 'Your Companion Forever',
      envelopeColor: '#f97316',
      envelopeStampEmoji: '👑',
      letterStyle: 'elegant',
      letterTitle: 'Happy Anniversary, my beautiful world! 🎉',
      letterContent: `It feels like just yesterday when our eyes first met... and yet, here we are, sharing our dreams, laughter, and daily lives.\n\nThis site stands as a beautiful milestone representing our love. I look forward to celebrating many more years and special moments by your side.\n\nThank you for being in my life and making it so beautiful. I love you more than words could ever tell! 🥂💫`,
      proposal: {
        enabled: true,
        question: 'Shall we celebrate our special milestone with a big surprise getaway? ✈️🗺️',
        yesText: 'Yes, I cannot wait! 😍',
        noText: 'Let us just stay cozy at home 🏡',
        successMessage: 'I have an amazing plan ready! 🎉 An unforgettable weekend awaits us! 🥂✨',
      },
      timeline: {
        enabled: true,
        list: [
          { id: 'an1', date: 'Our Beginning', title: 'The Day We Met 📅', description: 'The day that completely shifted the direction of my life and filled it with endless joy.', emoji: '🍀' },
          { id: 'an2', date: 'A Beautiful Milestone', title: 'Living Together or Commitment 🏡', description: 'Our first shared key, warm cozy evenings, and building grand plans for our future.', emoji: '🔑' }
        ]
      },
      coupons: {
        enabled: true,
        list: [
          { id: 'anc1', title: 'Fully Lazy Work-Free Day 🛋️', description: 'I will handle absolutely everything – cleaning, cooking, laundry. You just sit back and relax!', emoji: '🛋️', code: 'RELAX-DAY', redeemed: false },
          { id: 'anc2', title: 'Wish Granting Shopping Pass 🎁', description: 'Valid for one item you have been eyeing for a long time – completely on me, no questions asked!', emoji: '🎁', code: 'WISH-GRANT', redeemed: false }
        ]
      },
      trivia: {
        enabled: true,
        questions: [
          { id: 'ant1', question: 'Which of our trips out of town was the most emotional? 🏔️', options: ['Mountain cabin retreat', 'Our beach getaway', 'The scenic road trip', 'Every single one is special in its own way'], correctAnswerIdx: 3 }
        ]
      },
      loveJar: {
        enabled: true,
        title: 'How You Changed My Life For The Better ✨',
        reasons: [
          'You taught me what genuine, unconditional care truly means.',
          'Every obstacle we face feels so minor when we are standing together.',
          'Your constant support gives me immense power to reach my goals.',
          'Being in your arms is my ultimate comfort zone, where I always feel safe 🏡'
        ]
      }
    }
  }
];

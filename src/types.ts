export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  code: string;
  redeemed?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIdx: number;
}

export type ThemeId = 'sweet-crimson' | 'cozy-peach' | 'starry-night' | 'vintage-velvet' | 'sugar-cute' | 'artistic-flair';

export interface RomanticTheme {
  id: ThemeId;
  name: string;
  bg: string;
  cardBg: string;
  primary: string;
  accent: string;
  text: string;
  secondaryText: string;
  border: string;
  fontFamily: string;
}

export interface LoveConfig {
  themeId: ThemeId;
  recipientName: string;
  senderName: string;
  musicUrl?: string;
  
  // Envelope Details
  envelopeColor: string;
  envelopeStampEmoji: string;
  
  // Love Letter Details
  letterTitle: string;
  letterContent: string;
  letterStyle: 'elegant' | 'handwritten' | 'classic-type';
  
  // Proposal ("Will you be my...")
  proposal: {
    enabled: boolean;
    question: string;
    yesText: string;
    noText: string;
    successMessage: string;
  };

  // Our Story Timeline
  timeline: {
    enabled: boolean;
    list: TimelineEvent[];
  };

  // Redeemable Coupons
  coupons: {
    enabled: boolean;
    list: Coupon[];
  };

  // Relationship Trivia
  trivia: {
    enabled: boolean;
    questions: QuizQuestion[];
  };

  // Messaging Jar
  loveJar: {
    enabled: boolean;
    title: string;
    reasons: string[];
  };
}

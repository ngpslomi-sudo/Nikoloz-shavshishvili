import { useState } from 'react';
import { 
  Heart, Sparkles, Plus, Trash2, Download, Copy, Check, 
  Settings, BookOpen, Gift, HelpCircle, FileText, ChevronRight, RefreshCw, Layers
} from 'lucide-react';
import { LoveConfig, TimelineEvent, Coupon, QuizQuestion } from '../types';
import { ROMANTIC_THEMES, PRESET_TEMPLATES } from '../data';

interface CreatorPanelProps {
  config: LoveConfig;
  onChange: (newConfig: LoveConfig) => void;
  onPreviewToggle: () => void;
}

export default function CreatorPanel({ config, onChange, onPreviewToggle }: CreatorPanelProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'letter' | 'timeline' | 'widgets' | 'export'>('basic');
  const [aiPrompts, setAiPrompts] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [reasonsAiLoading, setReasonsAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // New item placeholders
  const [newMilestone, setNewMilestone] = useState({ date: '', title: '', description: '', emoji: '✨' });
  const [newCoupon, setNewCoupon] = useState({ title: '', description: '', emoji: '🎟️', code: 'LOVE-100' });
  const [newQuiz, setNewQuiz] = useState({ question: '', o1: '', o2: '', o3: '', o4: '', correctIdx: 0 });
  const [newReason, setNewReason] = useState('');

  // Handle updates to nested objects
  const updateConfig = (key: string, value: any) => {
    onChange({
      ...config,
      [key]: value
    });
  };

  const handleThemeChange = (id: any) => {
    updateConfig('themeId', id);
  };

  // AI letter generator trigger
  const handleGenerateLetter = async () => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: config.recipientName,
          sender: config.senderName,
          style: config.letterStyle,
          prompts: aiPrompts
        })
      });
      const data = await response.json();
      if (data.success) {
        onChange({
          ...config,
          letterContent: data.letter
        });
      } else {
        alert('Failed to generate letter: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while connecting to the AI service.');
    } finally {
      setAiLoading(false);
    }
  };

  // AI Reasons Jar Generator trigger
  const handleGenerateReasons = async () => {
    setReasonsAiLoading(true);
    try {
      const response = await fetch('/api/generate-reasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: config.recipientName,
          sender: config.senderName,
        })
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.reasons)) {
        onChange({
          ...config,
          loveJar: {
            ...config.loveJar,
            reasons: data.reasons
          }
        });
      } else {
        alert('Failed to generate reasons: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while connecting to the AI service.');
    } finally {
      setReasonsAiLoading(false);
    }
  };

  // TIMELINE ACTIONS
  const addMilestone = () => {
    if (!newMilestone.title || !newMilestone.date) {
      alert('Please specify a date and a title!');
      return;
    }
    const item: TimelineEvent = {
      id: Date.now().toString(),
      date: newMilestone.date,
      title: newMilestone.title,
      description: newMilestone.description,
      emoji: newMilestone.emoji
    };
    onChange({
      ...config,
      timeline: {
        ...config.timeline,
        list: [...config.timeline.list, item]
      }
    });
    setNewMilestone({ date: '', title: '', description: '', emoji: '✨' });
  };

  const deleteMilestone = (id: string) => {
    onChange({
      ...config,
      timeline: {
        ...config.timeline,
        list: config.timeline.list.filter(m => m.id !== id)
      }
    });
  };

  // COUPON ACTIONS
  const addCoupon = () => {
    if (!newCoupon.title) return;
    const item: Coupon = {
      id: Date.now().toString(),
      title: newCoupon.title,
      description: newCoupon.description,
      emoji: newCoupon.emoji,
      code: newCoupon.code,
      redeemed: false
    };
    onChange({
      ...config,
      coupons: {
        ...config.coupons,
        list: [...config.coupons.list, item]
      }
    });
    setNewCoupon({ title: '', description: '', emoji: '🎟️', code: 'LOVE-100' });
  };

  const deleteCoupon = (id: string) => {
    onChange({
      ...config,
      coupons: {
        ...config.coupons,
        list: config.coupons.list.filter(c => c.id !== id)
      }
    });
  };

  // QUIZ ACTIONS
  const addQuizQuestion = () => {
    if (!newQuiz.question || !newQuiz.o1 || !newQuiz.o2) {
      alert('Please specify a question and at least 2 options!');
      return;
    }
    const oArr = [newQuiz.o1, newQuiz.o2];
    if (newQuiz.o3) oArr.push(newQuiz.o3);
    if (newQuiz.o4) oArr.push(newQuiz.o4);

    const item: QuizQuestion = {
      id: Date.now().toString(),
      question: newQuiz.question,
      options: oArr,
      correctAnswerIdx: Math.min(newQuiz.correctIdx, oArr.length - 1)
    };
    onChange({
      ...config,
      trivia: {
        ...config.trivia,
        questions: [...config.trivia.questions, item]
      }
    });
    setNewQuiz({ question: '', o1: '', o2: '', o3: '', o4: '', correctIdx: 0 });
  };

  const deleteQuizQuestion = (id: string) => {
    onChange({
      ...config,
      trivia: {
        ...config.trivia,
        questions: config.trivia.questions.filter(q => q.id !== id)
      }
    });
  };

  // REASON JAR ACTIONS
  const addReason = () => {
    if (!newReason) return;
    onChange({
      ...config,
      loveJar: {
        ...config.loveJar,
        reasons: [...config.loveJar.reasons, newReason]
      }
    });
    setNewReason('');
  };

  const deleteReason = (idx: number) => {
    onChange({
      ...config,
      loveJar: {
        ...config.loveJar,
        reasons: config.loveJar.reasons.filter((_, i) => i !== idx)
      }
    });
  };

  // Copy full configuration code
  const handleCopyConfig = () => {
    const serialized = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(serialized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Config file
  const handleDownloadConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "love-template-config.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div 
      className="w-full flex flex-col bg-stone-900 border-r border-stone-800 text-stone-200 h-full overflow-hidden select-none"
      id="creator-dashboard-panel"
    >
      {/* Banner / Header */}
      <div className="p-5 border-b border-stone-800 flex items-center justify-between shrink-0 bg-stone-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center border border-rose-500/40">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-serif">
              Love Site Customizer
            </h1>
            <p className="text-[10px] text-stone-400 font-mono">Digital Love Gift Builder</p>
          </div>
        </div>

        {/* Real Live Preview toggle for quick mobile check */}
        <button
          onClick={onPreviewToggle}
          className="md:hidden bg-rose-500 hover:bg-rose-600 font-bold text-xs py-1.5 px-3 rounded text-white flex items-center gap-1"
        >
          Preview 💕
        </button>
      </div>

      {/* Tabs list inside builder */}
      <div className="flex bg-stone-950/60 border-b border-stone-800 p-1 shrink-0 overflow-x-auto gap-0.5">
        {[
          { id: 'basic', label: 'Basic Info', icon: Settings },
          { id: 'letter', label: 'Secret Letter', icon: FileText },
          { id: 'timeline', label: 'Our Story', icon: BookOpen },
          { id: 'widgets', label: 'Fun Widgets', icon: Gift },
          { id: 'export', label: 'Export / Save', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[70px] flex flex-col items-center justify-center py-2 px-1 rounded transition text-center cursor-pointer ${
                isActive 
                  ? 'bg-stone-800 text-rose-400 font-bold border-b-2 border-rose-500' 
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/40'
              }`}
            >
              <Icon className="w-4 h-4 mb-1 shrink-0" />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Panels content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">

        {/* BASIC / THEME PANEL */}
        {activeTab === 'basic' && (
          <div className="space-y-5 animate-fadeIn">
            {/* ✨ INSTANT PRESET TEMPLATES */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 to-stone-900 border border-rose-500/20 space-y-3">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Quick Presets (1-Click Fill) ✨
                </h3>
              </div>
              <p className="text-[10px] text-stone-300 leading-normal">
                Choose a ready-to-go theme, letter, coupons, timeline, and relationship quiz instantly! Your custom sender and recipient names will be preserved.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mt-1">
                {PRESET_TEMPLATES.map((preset) => {
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onChange({
                          ...preset.config,
                          recipientName: config.recipientName && config.recipientName !== 'My Beloved' ? config.recipientName : preset.config.recipientName,
                          senderName: config.senderName && config.senderName !== 'Your Soulmate' ? config.senderName : preset.config.senderName,
                        });
                      }}
                      className="p-2.5 rounded-lg bg-stone-950 hover:bg-stone-850 border border-stone-800 text-left cursor-pointer transition flex flex-col justify-between hover:border-rose-500 active:scale-95 group animate-fadeIn"
                    >
                      <div className="flex items-center gap-1.5 mb-1 shrink-0">
                        <span className="text-sm shrink-0">{preset.emoji}</span>
                        <p className="text-[11px] font-black text-white group-hover:text-rose-400 leading-tight">
                          {preset.name}
                        </p>
                      </div>
                      <p className="text-[9px] text-stone-500 line-clamp-2 leading-relaxed shrink-0">
                        {preset.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-rose-400 font-black mb-1.5">
                Template Design Theme ⭐
              </label>
              <div className="grid grid-cols-1 gap-2">
                {ROMANTIC_THEMES.map((theme) => {
                  const isSelected = config.themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        isSelected 
                          ? 'border-rose-500 bg-stone-800 text-white font-bold' 
                          : 'border-stone-800 bg-stone-900/50 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-4 h-4 rounded-full border border-stone-700 flex items-center justify-center bg-stone-950">
                          {isSelected && <span className="w-2 h-2 bg-rose-500 rounded-full" />}
                        </span>
                        <div className="text-xs">
                          <p className="font-semibold text-stone-100">{theme.name}</p>
                          <p className="text-[9px] text-stone-500 font-mono italic text-rose-400">Font: {theme.fontFamily.replace('font-', '')}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <span className={`w-3.5 h-3.5 rounded-full ${theme.bg.split(' ')[0]}`} />
                        <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-stone-800 pt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Who is this site for (Recipient)?
                </label>
                <input
                  type="text"
                  value={config.recipientName}
                  onChange={(e) => updateConfig('recipientName', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-sm text-white focus:outline-none"
                  placeholder="My Beloved"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Your name (Sender)?
                </label>
                <input
                  type="text"
                  value={config.senderName}
                  onChange={(e) => updateConfig('senderName', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-sm text-white focus:outline-none"
                  placeholder="Your Soulmate"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Envelope Seal Emoji (Stamp) 🔖
                </label>
                <input
                  type="text"
                  value={config.envelopeStampEmoji}
                  onChange={(e) => updateConfig('envelopeStampEmoji', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-sm text-white focus:outline-none font-mono"
                  placeholder="💖"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* LOVE LETTER PANEL AND AI LETTER COMPOSER */}
        {activeTab === 'letter' && (
          <div className="space-y-5 animate-fadeIn">
            {/* MANUAL CONTROLS */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Letter Handwriting Style ✒️
                </label>
                <select
                  value={config.letterStyle}
                  onChange={(e) => updateConfig('letterStyle', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-sm text-white focus:outline-none"
                >
                  <option value="elegant">Elegant Serif 📜</option>
                  <option value="handwritten">Chic Cursive / Handwritten ✍️</option>
                  <option value="classic-type">Retro Typewriter / Mono 📻</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Letter Heading / Title
                </label>
                <input
                  type="text"
                  value={config.letterTitle}
                  onChange={(e) => updateConfig('letterTitle', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-sm text-white focus:outline-none"
                  placeholder="You might be wondering what this is..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Letter Content / Body Text
                </label>
                <textarea
                  rows={6}
                  value={config.letterContent}
                  onChange={(e) => updateConfig('letterContent', e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-2 px-3 text-xs text-white focus:outline-none leading-relaxed font-serif"
                  placeholder="Write your heartfelt message here..."
                />
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE EVENT BUILDER */}
        {activeTab === 'timeline' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Display list of current events */}
            <div>
              <label className="block text-xs uppercase font-mono tracking-wider text-rose-400 font-bold mb-2">
                Current Memory Milestones ({config.timeline.list.length})
              </label>
              
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {config.timeline.list.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-stone-900 border border-stone-800/80 flex items-start justify-between text-xs gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-stone-200">{m.title} <span className="text-[11px]">{m.emoji}</span></p>
                      <p className="text-[9px] text-rose-400 font-mono">{m.date}</p>
                      <p className="text-[10px] text-stone-400 truncate mt-1">{m.description}</p>
                    </div>
                    <button
                      onClick={() => deleteMilestone(m.id)}
                      className="text-stone-500 hover:text-red-500 transition cursor-pointer p-1 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {config.timeline.list.length === 0 && (
                  <p className="text-center py-4 text-xs text-stone-500 italic">Add your first romantic memory milestone below!</p>
                )}
              </div>
            </div>

            {/* Form to enter a new milestone */}
            <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/30 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1">
                <Plus className="w-4 h-4 text-rose-500" />
                Add New Memory Milestone
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-1.5 px-2.5 text-xs text-white"
                    placeholder="Date (e.g., May 22, 2025)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newMilestone.emoji}
                    onChange={(e) => setNewMilestone({ ...newMilestone, emoji: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-1.5 px-2 text-xs text-white text-center font-mono"
                    placeholder="Emoji"
                  />
                </div>
              </div>

              <input
                type="text"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-1.5 px-3 text-xs text-white"
                placeholder="Memorable Title"
              />

              <textarea
                rows={3}
                value={newMilestone.description}
                onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                className="w-full bg-stone-900 border border-stone-800 focus:border-rose-500 rounded-lg py-1.5 px-3 text-xs text-white"
                placeholder="Describe the memory beautifully..."
              />

              <button
                onClick={addMilestone}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition"
              >
                Add to Timeline 📌
              </button>
            </div>
          </div>
        )}

        {/* INTERACTIVE WIDGETS MANAGER (Coupons, Quiz, Reasons) */}
        {activeTab === 'widgets' && (
          <div className="space-y-6 animate-fadeIn">

            {/* WIDGET 1: Proposal Screen Config */}
            <div className="p-4 rounded-xl border border-stone-800/80 bg-stone-900/20 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Proposal Section (Will You Be My Date?)
                </span>
                <input
                  type="checkbox"
                  checked={config.proposal.enabled}
                  onChange={(e) => onChange({
                    ...config,
                    proposal: { ...config.proposal, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 rounded text-rose-500 bg-stone-900"
                />
              </div>

              {config.proposal.enabled && (
                <div className="space-y-2.5 pt-1.5 border-t border-stone-800/60">
                  <div>
                    <label className="text-[10px] text-stone-400">Proposal Question</label>
                    <input
                      type="text"
                      value={config.proposal.question}
                      onChange={(e) => onChange({
                        ...config,
                        proposal: { ...config.proposal, question: e.target.value }
                      })}
                      className="w-full bg-stone-900 border border-stone-800 rounded py-1.5 px-2.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-stone-400">'Yes' Button Text</label>
                      <input
                        type="text"
                        value={config.proposal.yesText}
                        onChange={(e) => onChange({
                          ...config,
                          proposal: { ...config.proposal, yesText: e.target.value }
                        })}
                        className="w-full bg-stone-900 border border-stone-800 rounded py-1 px-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-400">'No' Button Text</label>
                      <input
                        type="text"
                        value={config.proposal.noText}
                        onChange={(e) => onChange({
                          ...config,
                          proposal: { ...config.proposal, noText: e.target.value }
                        })}
                        className="w-full bg-stone-900 border border-stone-800 rounded py-1 px-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-400">Yes Response Success Message 🎉</label>
                    <input
                      type="text"
                      value={config.proposal.successMessage}
                      onChange={(e) => onChange({
                        ...config,
                        proposal: { ...config.proposal, successMessage: e.target.value }
                      })}
                      className="w-full bg-stone-900 border border-stone-800 rounded py-1.5 px-2.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* WIDGET 2: COUPONS BOOK */}
            <div className="p-4 rounded-xl border border-stone-800/80 bg-stone-900/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-orange-400" />
                  Redeemable Love Coupon Book
                </span>
                <input
                  type="checkbox"
                  checked={config.coupons.enabled}
                  onChange={(e) => onChange({
                    ...config,
                    coupons: { ...config.coupons, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 rounded text-orange-500 bg-stone-900"
                />
              </div>

              {config.coupons.enabled && (
                <div className="space-y-3 pt-2.5 border-t border-stone-800/60">
                  {/* Current coupon names list */}
                  <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                    {config.coupons.list.map((c) => (
                      <div key={c.id} className="flex justify-between items-center bg-stone-950 p-2 rounded text-[11px]">
                        <span className="truncate max-w-[140px]">{c.emoji} {c.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-stone-500">{c.code}</span>
                          <button onClick={() => deleteCoupon(c.id)} className="text-stone-500 hover:text-red-400">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add coupon inline layout */}
                  <div className="space-y-2 p-2.5 rounded bg-stone-900 border border-stone-800">
                    <p className="text-[10px] font-semibold text-white">Create New Love Coupon:</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      <input
                        type="text"
                        value={newCoupon.emoji}
                        onChange={(e) => setNewCoupon({ ...newCoupon, emoji: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded text-center text-xs py-1"
                        placeholder="🎁"
                      />
                      <input
                        type="text"
                        maxLength={12}
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded text-center text-xs py-1 font-mono text-orange-300"
                        placeholder="CODE"
                      />
                      <button
                        onClick={addCoupon}
                        className="bg-orange-600/25 border border-orange-500 hover:bg-orange-600 hover:text-white font-bold text-[10px] rounded transition cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <input
                      type="text"
                      value={newCoupon.title}
                      onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded text-xs py-1 px-2.5"
                      placeholder="Coupon Title (e.g., Full Body Massage)"
                    />
                    <input
                      type="text"
                      value={newCoupon.description}
                      onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded text-[10px] py-1 px-2.5"
                      placeholder="Coupon Terms & Conditions / Description"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* WIDGET 3: REASONS LOVE JAR */}
            <div className="p-4 rounded-xl border border-stone-800/80 bg-stone-900/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-pink-400" />
                  Reasons in Love Jar ({config.loveJar.reasons.length})
                </span>
                <input
                  type="checkbox"
                  checked={config.loveJar.enabled}
                  onChange={(e) => onChange({
                    ...config,
                    loveJar: { ...config.loveJar, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 rounded text-pink-500 bg-stone-900"
                />
              </div>

              {config.loveJar.enabled && (
                <div className="space-y-3 pt-2.5 border-t border-stone-800/60">
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {config.loveJar.reasons.map((r, i) => (
                      <div key={i} className="flex justify-between items-center bg-stone-950 p-2 rounded text-[11px] gap-2">
                        <span className="truncate italic flex-1">"{r}"</span>
                        <button onClick={() => deleteReason(i)} className="text-stone-500 hover:text-red-400 p-0.5 shrink-0">
                          <Trash2 className="w-3" strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newReason}
                      onChange={(e) => setNewReason(e.target.value)}
                      className="flex-1 bg-stone-950 border border-stone-800 rounded text-xs py-1.5 px-2.5 text-stone-200"
                      placeholder="New Reason Why I Love You..."
                    />
                    <button
                      onClick={addReason}
                      className="bg-pink-600 hover:bg-pink-500 font-bold text-xs py-1.5 px-3 rounded text-white flex shrink-0 cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* WIDGET 4: TRIVIA QUESTIONS */}
            <div className="p-4 rounded-xl border border-stone-800/80 bg-stone-900/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                  Relationship Trivia Quiz Manager
                </span>
                <input
                  type="checkbox"
                  checked={config.trivia.enabled}
                  onChange={(e) => onChange({
                    ...config,
                    trivia: { ...config.trivia, enabled: e.target.checked }
                  })}
                  className="w-4 h-4 rounded text-sky-500 bg-stone-900"
                />
              </div>

              {config.trivia.enabled && (
                <div className="space-y-3 pt-2.5 border-t border-stone-800/60">
                  <div className="space-y-1.5 max-h-[110px] overflow-y-auto">
                    {config.trivia.questions.map((q) => (
                      <div key={q.id} className="flex justify-between items-center bg-stone-950 p-2 rounded text-[11px]">
                        <span className="truncate flex-1 font-bold">"{q.question}"</span>
                        <button onClick={() => deleteQuizQuestion(q.id)} className="text-stone-500 hover:text-red-400 shrink-0 ml-2">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add trivia card form */}
                  <div className="p-3 bg-stone-900 rounded border border-stone-800 space-y-2">
                    <p className="text-[10px] font-bold text-white uppercase">Create New Trivia Question:</p>
                    <input
                      type="text"
                      value={newQuiz.question}
                      onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded text-xs py-1 px-2 text-stone-200"
                      placeholder="Question (e.g., Where did we first meet?)"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="text"
                        value={newQuiz.o1}
                        onChange={(e) => setNewQuiz({ ...newQuiz, o1: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded placeholder-stone-600 text-xs py-0.5 px-2"
                        placeholder="Option 1 (Usually Correct)"
                      />
                      <input
                        type="text"
                        value={newQuiz.o2}
                        onChange={(e) => setNewQuiz({ ...newQuiz, o2: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded placeholder-stone-600 text-xs py-0.5 px-2"
                        placeholder="Option 2"
                      />
                      <input
                        type="text"
                        value={newQuiz.o3}
                        onChange={(e) => setNewQuiz({ ...newQuiz, o3: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded placeholder-stone-600 text-xs py-0.5 px-2"
                        placeholder="Option 3"
                      />
                      <input
                        type="text"
                        value={newQuiz.o4}
                        onChange={(e) => setNewQuiz({ ...newQuiz, o4: e.target.value })}
                        className="bg-stone-950 border border-stone-800 rounded placeholder-stone-600 text-xs py-0.5 px-2"
                        placeholder="Option 4"
                      />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-[10px] text-stone-400">Correct Answer Index (0 to 3):</div>
                      <input
                        type="number"
                        min={0}
                        max={3}
                        value={newQuiz.correctIdx}
                        onChange={(e) => setNewQuiz({ ...newQuiz, correctIdx: parseInt(e.target.value) || 0 })}
                        className="w-10 text-center bg-stone-950 border border-stone-800 rounded text-xs py-0.5"
                      />
                    </div>

                    <button
                      onClick={addQuizQuestion}
                      className="w-full bg-sky-600/20 border border-sky-500 hover:bg-sky-600 hover:text-white font-bold text-xs py-1 px-2.5 rounded transition cursor-pointer"
                    >
                      Add Trivia Question 📌
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* EXPORT DATA & CONFIGURATION */}
        {activeTab === 'export' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="p-4 rounded-xl bg-gradient-to-br from-stone-950 to-stone-900 border border-stone-800 text-center space-y-4">
              <div className="text-3xl text-emerald-500">💝 💾</div>
              <h3 className="font-serif font-bold text-sm text-white leading-tight">
                Save & Export Your Love Site
              </h3>
              <p className="text-[10px] text-stone-400 leading-relaxed">
                Download your romantic configuration JSON file or copy the raw settings block below. You can save this to load it later!
              </p>

              <div className="flex gap-2.5">
                <button
                  onClick={handleDownloadConfig}
                  className="flex-1 bg-stone-800 hover:bg-stone-700/80 text-stone-200 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download JSON
                </button>
                <button
                  onClick={handleCopyConfig}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Configuration
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase font-mono font-black tracking-wider text-rose-400">
                How Can I Share This? 🚀
              </h4>

              <div className="space-y-3.5 text-xs text-stone-300 leading-relaxed font-sans">
                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-800 shrink-0 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <p>
                    <strong>Share the preview:</strong> Copy the preview link or show the live view to your partner directly!
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-800 shrink-0 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                  <p>
                    <strong>Keep making memories:</strong> You can edit the text, coupons, milestones, and trivia questions anytime in this live customizer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface StartupIdea {
  name: string;
  tagline: string;
  description: string;
  funding: string;
  logo: string;
}

export default function Home() {
  const [word, setWord] = useState('');
  const [idea, setIdea] = useState<StartupIdea | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<StartupIdea[]>([]);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const examples = ['ai', 'water', 'sleep', 'coffee', 'noise', 'shadows', 'wind'];

  const generateIdea = async (inputWord?: string) => {
    const queryWord = inputWord || word;
    if (!queryWord.trim()) return;
    
    setLoading(true);
    setLiked(false);
    setCopied(false);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: queryWord }),
      });
      const data = await response.json();
      setIdea(data);
      setHistory([data, ...history.slice(0, 9)]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const randomExample = () => {
    const random = examples[Math.floor(Math.random() * examples.length)];
    setWord(random);
    generateIdea(random);
  };

  const copyToClipboard = () => {
    if (!idea) return;
    const text = `${idea.name}\n${idea.tagline}\n\n${idea.description}\n\nFunding: ${idea.funding}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareIdea = () => {
    if (!idea) return;
    const text = `Check out this startup idea: "${idea.name}" - ${idea.tagline}`;
    if (navigator.share) {
      navigator.share({
        title: idea.name,
        text: text,
        url: window.location.href,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full border border-purple-400">
            <p className="text-purple-300 text-sm font-semibold">✨ AI-Powered</p>
          </div>
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            Startup Ideas
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Generate absurd, hilarious startup ideas instantly. Perfect for laughs or actual inspiration.
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-10">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateIdea()}
              placeholder="Type any word... socks, pizza, clouds..."
              className="flex-1 px-5 py-3 bg-white bg-opacity-5 border border-purple-500 border-opacity-30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all backdrop-blur-sm"
            />
            <button
              onClick={() => generateIdea()}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              ⚡ {loading ? 'Creating...' : 'Generate'}
            </button>
            <button
              onClick={randomExample}
              disabled={loading}
              className="px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 border border-purple-400 border-opacity-30 rounded-xl text-white font-semibold transition-all"
            >
              🎲 Random
            </button>
          </div>
        </div>

        {/* Main Idea Card */}
        {idea && (
          <div className="mb-12 group">
            <div className="p-8 bg-gradient-to-br from-purple-600 from-10% via-purple-800 via-50% to-slate-900 rounded-2xl border border-purple-500 border-opacity-30 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              {/* Logo */}
              <div className="text-7xl text-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {idea.logo}
              </div>

              {/* Name & Tagline */}
              <h2 className="text-4xl font-black text-center mb-2 text-white">
                {idea.name}
              </h2>
              <p className="text-center text-purple-200 italic text-lg mb-8">
                "{idea.tagline}"
              </p>

              {/* Description */}
              <p className="text-gray-100 mb-8 leading-relaxed text-center">
                {idea.description}
              </p>

              {/* Funding */}
              <div className="bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-50 rounded-xl p-5 border border-purple-400 border-opacity-30 mb-8">
                <p className="text-sm text-purple-200 mb-1">💰 Projected Funding</p>
                <p className="text-3xl font-bold text-white">{idea.funding}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    liked
                      ? 'bg-pink-500 text-white'
                      : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                  }`}
                >
                  {liked ? '❤️' : '🤍'} {liked ? 'Loved' : 'Like'}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="py-3 px-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-gray-300 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  📋 {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={shareIdea}
                  className="py-3 px-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-gray-300 font-semibold transition-all flex items-center justify-center gap-2"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div className="mb-12">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider font-semibold">Try these:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setWord(ex);
                  generateIdea(ex);
                }}
                className="px-4 py-3 bg-gradient-to-br from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 border border-purple-400 border-opacity-30"
              >
                {ex.charAt(0).toUpperCase() + ex.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* History */}
        {history.length > 1 && (
          <div>
            <p className="text-gray-400 text-sm mb-4 uppercase tracking-wider font-semibold">Recent ideas:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.slice(1, 5).map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => setIdea(h)}
                  className="p-4 bg-white bg-opacity-5 hover:bg-opacity-10 border border-purple-400 border-opacity-20 rounded-lg text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{h.logo}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{h.name}</p>
                      <p className="text-xs text-gray-400 truncate">{h.tagline}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

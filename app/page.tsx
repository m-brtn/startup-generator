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

  const generateIdea = async () => {
    if (!word.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word }),
      });
      const data = await response.json();
      setIdea(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Startup Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Enter any word and we'll create an absurd startup idea for you
          </p>
        </div>

        {/* Input Section */}
        <div className="mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateIdea()}
              placeholder="e.g., socks, rocks, cats..."
              className="flex-1 px-6 py-4 bg-white bg-opacity-10 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={generateIdea}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>

        {/* Idea Display */}
        {idea && (
          <div className="mb-8 p-8 bg-white bg-opacity-5 border border-purple-500 rounded-xl backdrop-blur">
            {/* Logo */}
            <div className="text-6xl text-center mb-6">{idea.logo}</div>

            {/* Name & Tagline */}
            <h2 className="text-4xl font-bold mb-2 text-center text-purple-300">
              {idea.name}
            </h2>
            <p className="text-center text-gray-300 italic mb-6">
              {idea.tagline}
            </p>

            {/* Description */}
            <p className="text-gray-200 mb-6 leading-relaxed">
              {idea.description}
            </p>

            {/* Funding */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 bg-opacity-20 rounded-lg p-4 border border-purple-400">
              <p className="text-sm text-gray-300">Projected Funding</p>
              <p className="text-2xl font-bold text-white">{idea.funding}</p>
            </div>

            {/* Generate Another Button */}
            <button
              onClick={() => setWord('')}
              className="w-full mt-6 px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 border border-purple-400 rounded-lg text-white font-semibold transition-all"
            >
              Generate Another
            </button>
          </div>
        )}

        {/* Examples */}
        <div className="mt-12 p-6 bg-white bg-opacity-5 rounded-lg border border-purple-400">
          <p className="text-gray-300 mb-3">Try: </p>
          <div className="flex flex-wrap gap-2">
            {['rocks', 'socks', 'cats', 'pizza', 'rain', 'mirrors'].map((word) => (
              <button
                key={word}
                onClick={() => setWord(word)}
                className="px-4 py-2 bg-purple-500 bg-opacity-30 hover:bg-opacity-50 rounded-full text-gray-200 text-sm transition-all"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

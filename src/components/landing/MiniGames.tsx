'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GuessTheRank from './GuessTheRank';
import GuessTheMap from './GuessTheMap';
import GuessTheAgent from './GuessTheAgent';

type Game = 'rank' | 'map' | 'agent';

const TABS: { id: Game; label: string; color: string; icon: React.ReactNode }[] = [
  {
    id: 'rank',
    label: 'Guess the Rank',
    color: '#FF4655',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: 'Guess the Map',
    color: '#14B8A6',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'agent',
    label: 'Guess the Agent',
    color: '#F97316',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export default function MiniGames() {
  const [active, setActive] = useState<Game>('rank');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tab selector */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-sm font-barlow font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 ${
              active === tab.id
                ? 'text-white shadow-lg'
                : 'ghost-border bg-val-bg-secondary text-val-text-muted hover:text-val-text-primary hover:bg-val-bg-tertiary'
            }`}
            style={active === tab.id ? { background: tab.color, boxShadow: `0 10px 25px -5px ${tab.color}40` } : undefined}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Game container */}
      <AnimatePresence mode="wait">
        {active === 'rank' && (
          <motion.div key="rank" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
            <GuessTheRank />
          </motion.div>
        )}
        {active === 'map' && (
          <motion.div key="map" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
            <GuessTheMap />
          </motion.div>
        )}
        {active === 'agent' && (
          <motion.div key="agent" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}>
            <GuessTheAgent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

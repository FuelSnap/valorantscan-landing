'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComparisonStrip from './showcase/ComparisonStrip';
import EncountersPreview from './showcase/EncountersPreview';
import HeatmapPreview from './showcase/HeatmapPreview';
import DriftLabPreview from './showcase/DriftLabPreview';
import GoalTrackerPreview from './showcase/GoalTrackerPreview';
import TrophyPreview from './showcase/TrophyPreview';

type Tool = 'encounters' | 'heatmap' | 'driftlab' | 'goals' | 'trophies';

const TABS: { id: Tool; label: string; icon: string; desc: string }[] = [
  {
    id: 'encounters',
    label: 'Encounters',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    desc: 'Track rivals and teammates across matches with contextual badges and rivalry scores.',
  },
  {
    id: 'heatmap',
    label: 'Heatmap',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    desc: 'See your playtime patterns and agent mastery tiers at a glance.',
  },
  {
    id: 'driftlab',
    label: 'DriftLab',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    desc: '365-day role evolution trends. Watch how your playstyle shifts over time.',
  },
  {
    id: 'goals',
    label: 'Goals',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    desc: 'Set daily, weekly, and monthly improvement goals with streak tracking.',
  },
  {
    id: 'trophies',
    label: 'Trophies',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    desc: '100+ achievements from first ace to thousand-kill milestones.',
  },
];

const COMPONENTS: Record<Tool, React.ComponentType> = {
  encounters: EncountersPreview,
  heatmap: HeatmapPreview,
  driftlab: DriftLabPreview,
  goals: GoalTrackerPreview,
  trophies: TrophyPreview,
};

export default function MasterShowcase() {
  const [active, setActive] = useState<Tool>('encounters');
  const ActiveComponent = COMPONENTS[active];

  return (
    <section className="py-10 border-t border-white/[0.06]" id="showcase">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="font-barlow text-xs font-semibold text-val-red tracking-[0.3em] uppercase mb-2 block">
            Beyond Basic Stats
          </span>
          <h2 className="font-oswald font-bold text-3xl md:text-4xl mb-2">
            WHAT <span className="text-val-red">OTHER TRACKERS</span> DON&apos;T HAVE
          </h2>
          <p className="font-inter text-sm text-val-text-secondary max-w-xl mx-auto">
            ValorantScan goes beyond K/D and win rate. Here&apos;s what you get that no other tracker offers.
          </p>
        </motion.div>

        {/* Comparison Strip */}
        <ComparisonStrip />

        {/* Tool Tabs */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm font-barlow font-semibold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 ${
                active === tab.id
                  ? 'bg-val-red text-white shadow-lg shadow-val-red/20'
                  : 'ghost-border text-val-text-muted hover:text-val-text-primary hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tool Description */}
        <p className="text-center font-inter text-sm text-val-text-secondary mb-4 max-w-md mx-auto">
          {TABS.find(t => t.id === active)?.desc}
        </p>

        {/* Active Preview */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <p className="font-inter text-sm text-val-text-secondary mb-1">
            All of this is included — <span className="text-val-text-primary font-semibold">completely free</span>.
          </p>
          <a
            href="#waitlist"
            className="inline-block mt-3 px-6 py-3 rounded-sm bg-val-red hover:bg-val-red-hover text-white font-barlow font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-val-red/20"
          >
            Join the Waitlist
          </a>
        </motion.div>
      </div>
    </section>
  );
}

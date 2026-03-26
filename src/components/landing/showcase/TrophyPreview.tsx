'use client';

import { motion } from 'framer-motion';
import { TROPHIES_DATA } from '@/lib/showcase/data';

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  common: { text: '#B3B3B3', bg: 'rgba(179,179,179,0.08)', border: 'rgba(179,179,179,0.2)' },
  rare: { text: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
  epic: { text: '#B042FF', bg: 'rgba(176,66,255,0.08)', border: 'rgba(176,66,255,0.2)' },
  legendary: { text: '#F9D849', bg: 'rgba(249,216,73,0.08)', border: 'rgba(249,216,73,0.2)' },
};

export default function TrophyPreview() {
  const { unlocked, total, trophies, featured } = TROPHIES_DATA;
  const pct = (unlocked / total) * 100;

  return (
    <div className="space-y-4">
      {/* Collection Progress */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Collection Progress</span>
          <span className="font-jetbrains text-xs font-bold text-val-text-primary tabular-nums">{unlocked}/{total}</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-val-red to-val-accent-gold"
          />
        </div>
      </div>

      {/* Trophy Grid + Featured */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Grid */}
        <div className="flex-1 grid grid-cols-3 gap-2">
          {trophies.map((trophy, i) => {
            const rarity = RARITY_COLORS[trophy.rarity];
            const isLocked = !trophy.isUnlocked;

            return (
              <motion.div
                key={`${trophy.name}-${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
                className={`relative rounded-sm p-3 text-center overflow-hidden ${
                  isLocked ? 'bg-white/[0.02] border border-white/[0.04]' : ''
                }`}
                style={!isLocked ? {
                  backgroundColor: rarity.bg,
                  border: `1px solid ${rarity.border}`,
                } : undefined}
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
                )}

                <div className={`w-8 h-8 mx-auto mb-1.5 flex items-center justify-center ${isLocked ? 'opacity-20' : ''}`}>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke={isLocked ? '#8B978F' : rarity.text}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={trophy.icon} />
                  </svg>
                </div>

                <div className={`font-barlow text-[9px] font-bold uppercase tracking-wider ${
                  isLocked ? 'text-val-text-muted/40' : ''
                }`} style={!isLocked ? { color: rarity.text } : undefined}>
                  {trophy.name}
                </div>

                {!isLocked && (
                  <div className="font-barlow text-[7px] text-val-text-muted uppercase tracking-wider mt-0.5">
                    {trophy.rarity}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Featured Trophy */}
        <div className="sm:w-48 rounded-sm bg-val-bg-secondary p-4 flex flex-col items-center text-center"
          style={{
            border: `1px solid ${RARITY_COLORS.legendary.border}`,
          }}
        >
          <div className="font-barlow text-[8px] font-bold uppercase tracking-widest mb-3"
            style={{ color: RARITY_COLORS.legendary.text }}
          >
            Featured Trophy
          </div>

          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-12 h-12 rounded-sm flex items-center justify-center mb-3 relative overflow-hidden"
            style={{ backgroundColor: RARITY_COLORS.legendary.bg }}
          >
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]" />
            <svg className="w-7 h-7" fill="none" stroke={RARITY_COLORS.legendary.text} viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={trophies[1].icon} />
            </svg>
          </motion.div>

          <div className="font-oswald font-bold text-sm text-val-text-primary mb-1">{featured.name}</div>
          <p className="font-inter text-[10px] text-val-text-secondary leading-relaxed mb-3">{featured.description}</p>

          {/* Progress */}
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="font-barlow text-[8px] text-val-text-muted uppercase">Progress</span>
              <span className="font-jetbrains text-[10px] font-bold tabular-nums" style={{ color: RARITY_COLORS.legendary.text }}>
                {featured.progress.current}/{featured.progress.max}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(featured.progress.current / featured.progress.max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full"
                style={{ backgroundColor: RARITY_COLORS.legendary.text }}
              />
            </div>
          </div>

          <div className="mt-2 px-2 py-1 rounded font-barlow text-[8px] font-bold uppercase tracking-widest"
            style={{
              color: RARITY_COLORS.legendary.text,
              backgroundColor: RARITY_COLORS.legendary.bg,
            }}
          >
            Legendary
          </div>
        </div>
      </div>
    </div>
  );
}

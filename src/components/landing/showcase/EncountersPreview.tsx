'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ENCOUNTERS_DATA } from '@/lib/showcase/data';

const BADGE_ICONS: Record<string, string> = {
  NEMESIS: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  'FREE ELO': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'TRUSTED DUO': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
};

export default function EncountersPreview() {
  const { player, rival, matchup, badges, encounterList } = ENCOUNTERS_DATA;
  const total = matchup.wins + matchup.losses;
  const winPct = (matchup.wins / total) * 100;
  const rivalryScore = Math.round(winPct * 0.7 + total * 2.5);

  return (
    <div className="space-y-4">
      {/* VS Duel Card */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary overflow-hidden">
        {/* Rivalry Score Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-white/[0.04] bg-val-red/[0.03]">
          <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Rivalry Matchup</span>
          <div className="flex items-center gap-2">
            <span className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider">Intensity</span>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-[2px] ${level <= Math.ceil(rivalryScore / 20) ? 'bg-val-red' : 'bg-white/[0.06]'}`}
                  style={level <= Math.ceil(rivalryScore / 20) ? { boxShadow: '0 0 6px rgba(255,70,85,0.5)' } : undefined}
                />
              ))}
            </div>
            <span className="font-jetbrains text-xs font-bold text-val-red tabular-nums">{rivalryScore}</span>
          </div>
        </div>

        <div className="data-strip-left p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Player */}
            <div className="flex-1 text-center sm:text-right w-full">
              <div className="flex items-center justify-center sm:justify-end gap-3 mb-3">
                <div>
                  <div className="font-oswald font-bold text-lg text-val-text-primary">{player.name}</div>
                  <div className="font-barlow text-[10px] text-val-text-muted uppercase tracking-wider">{player.rank}</div>
                </div>
                <div className="w-14 h-14 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0 border border-val-stat-positive/30">
                  <Image src={`/assets/agents/${player.agent}.png`} alt={player.agent} fill className="object-cover" sizes="56px" />
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-5">
                <div>
                  <div className="font-jetbrains text-base font-bold text-val-stat-positive">{player.kd.toFixed(2)}</div>
                  <div className="font-barlow text-[9px] text-val-text-muted uppercase">K/D</div>
                </div>
                <div>
                  <div className="font-jetbrains text-base font-bold text-val-text-primary">{player.hsPercent}%</div>
                  <div className="font-barlow text-[9px] text-val-text-muted uppercase">HS%</div>
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0 px-4">
              <div className="w-12 h-12 rounded-full bg-val-red/10 border border-val-red/20 flex items-center justify-center" style={{ boxShadow: '0 0 20px rgba(255,70,85,0.25), 0 0 40px rgba(255,70,85,0.1)' }}>
                <span className="font-oswald font-bold text-lg text-val-red">VS</span>
              </div>
              <div className="font-jetbrains text-xs font-bold text-val-text-primary tabular-nums">{matchup.wins}W-{matchup.losses}L</div>
            </div>

            {/* Rival */}
            <div className="flex-1 text-center sm:text-left w-full">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <div className="w-14 h-14 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0 border border-val-stat-negative/30">
                  <Image src={`/assets/agents/${rival.agent}.png`} alt={rival.agent} fill className="object-cover" sizes="56px" />
                </div>
                <div>
                  <div className="font-oswald font-bold text-lg text-val-text-primary">{rival.name}</div>
                  <div className="font-barlow text-[10px] text-val-text-muted uppercase tracking-wider">{rival.rank}</div>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-5">
                <div>
                  <div className="font-jetbrains text-base font-bold text-val-stat-negative">{rival.kd.toFixed(2)}</div>
                  <div className="font-barlow text-[9px] text-val-text-muted uppercase">K/D</div>
                </div>
                <div>
                  <div className="font-jetbrains text-base font-bold text-val-text-primary">{rival.hsPercent}%</div>
                  <div className="font-barlow text-[9px] text-val-text-muted uppercase">HS%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Win/Loss Bar */}
          <div className="mt-5 relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-barlow text-[9px] text-val-stat-positive uppercase tracking-wider">{matchup.wins} Wins</span>
              <span className="font-barlow text-[9px] text-val-stat-negative uppercase tracking-wider">{matchup.losses} Losses</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.3) 100%)' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${winPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #22C55E, #4ADE80)', boxShadow: '0 0 8px rgba(34,197,94,0.4)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-barlow text-[10px] font-bold uppercase tracking-widest border"
            style={{
              color: badge.color,
              borderColor: `${badge.color}33`,
              backgroundColor: `${badge.color}12`,
              boxShadow: `0 0 16px ${badge.color}20, inset 0 0 12px ${badge.color}08`,
            }}
          >
            {BADGE_ICONS[badge.name] && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={BADGE_ICONS[badge.name]} />
              </svg>
            )}
            {badge.name}
          </motion.div>
        ))}
      </div>

      {/* Mini Encounter Table */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 border-b border-white/[0.04]">
          <span className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider">Player</span>
          <span className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider text-center">Faced</span>
          <span className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider text-center">Record</span>
          <span className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider text-right">K/D</span>
        </div>
        {encounterList.map((enc, i) => (
          <motion.div
            key={enc.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2.5 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-val-bg-tertiary flex items-center justify-center font-jetbrains text-[9px] text-val-text-muted">{i + 1}</span>
              <div>
                <span className="font-inter text-xs text-val-text-primary">{enc.name}</span>
                <span className="font-barlow text-[9px] text-val-text-muted ml-2">{enc.rank}</span>
              </div>
            </div>
            <span className="font-jetbrains text-xs text-val-text-secondary text-center tabular-nums">{enc.timesFaced}</span>
            <span className="font-jetbrains text-xs text-val-stat-positive text-center tabular-nums">{enc.record}</span>
            <span className="font-jetbrains text-xs text-val-text-primary text-right tabular-nums">{enc.kd.toFixed(2)}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

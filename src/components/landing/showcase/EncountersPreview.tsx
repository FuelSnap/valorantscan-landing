'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ENCOUNTERS_DATA } from '@/lib/showcase/data';

export default function EncountersPreview() {
  const { player, rival, matchup, badges, encounterList } = ENCOUNTERS_DATA;
  const total = matchup.wins + matchup.losses;
  const winPct = (matchup.wins / total) * 100;

  return (
    <div className="space-y-4">
      {/* VS Duel Card */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Player */}
          <div className="flex-1 text-center sm:text-right w-full">
            <div className="flex items-center justify-center sm:justify-end gap-3 mb-2">
              <div>
                <div className="font-oswald font-bold text-base text-val-text-primary">{player.name}</div>
                <div className="font-barlow text-[10px] text-val-text-muted uppercase tracking-wider">{player.rank}</div>
              </div>
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0">
                <Image src={`/assets/agents/${player.agent}.png`} alt={player.agent} fill className="object-cover" sizes="40px" />
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <div>
                <div className="font-jetbrains text-sm font-bold text-val-stat-positive">{player.kd.toFixed(2)}</div>
                <div className="font-barlow text-[9px] text-val-text-muted uppercase">K/D</div>
              </div>
              <div>
                <div className="font-jetbrains text-sm font-bold text-val-text-primary">{player.hsPercent}%</div>
                <div className="font-barlow text-[9px] text-val-text-muted uppercase">HS%</div>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0 px-3">
            <div className="font-oswald font-bold text-2xl text-val-red">VS</div>
            <div className="font-jetbrains text-xs text-val-text-muted">{matchup.wins}W-{matchup.losses}L</div>
          </div>

          {/* Rival */}
          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <div className="w-10 h-10 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0">
                <Image src={`/assets/agents/${rival.agent}.png`} alt={rival.agent} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <div className="font-oswald font-bold text-base text-val-text-primary">{rival.name}</div>
                <div className="font-barlow text-[10px] text-val-text-muted uppercase tracking-wider">{rival.rank}</div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div>
                <div className="font-jetbrains text-sm font-bold text-val-stat-negative">{rival.kd.toFixed(2)}</div>
                <div className="font-barlow text-[9px] text-val-text-muted uppercase">K/D</div>
              </div>
              <div>
                <div className="font-jetbrains text-sm font-bold text-val-text-primary">{rival.hsPercent}%</div>
                <div className="font-barlow text-[9px] text-val-text-muted uppercase">HS%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Win/Loss Bar */}
        <div className="mt-4 h-2 rounded-full bg-val-stat-negative/30 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${winPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-val-stat-positive"
          />
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
            className="px-3 py-1.5 rounded-sm font-barlow text-[10px] font-bold uppercase tracking-widest border"
            style={{
              color: badge.color,
              borderColor: `${badge.color}33`,
              backgroundColor: `${badge.color}12`,
            }}
          >
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
        {encounterList.map((enc) => (
          <div key={enc.name} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors">
            <div>
              <span className="font-inter text-xs text-val-text-primary">{enc.name}</span>
              <span className="font-barlow text-[9px] text-val-text-muted ml-2">{enc.rank}</span>
            </div>
            <span className="font-jetbrains text-xs text-val-text-secondary text-center tabular-nums">{enc.timesFaced}</span>
            <span className="font-jetbrains text-xs text-val-stat-positive text-center tabular-nums">{enc.record}</span>
            <span className="font-jetbrains text-xs text-val-text-primary text-right tabular-nums">{enc.kd.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

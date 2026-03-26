'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HEATMAP_DATA } from '@/lib/showcase/data';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const INTENSITY_BG = [
  'rgba(255,255,255,0.03)',
  'rgba(255,70,85,0.2)',
  'rgba(255,70,85,0.4)',
  'rgba(255,70,85,0.6)',
  'rgba(255,70,85,0.8)',
];

export default function HeatmapPreview() {
  const { grid, topAgents, coreRole, corePercent } = HEATMAP_DATA;

  return (
    <div className="space-y-4">
      {/* Heatmap Grid */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Activity Heatmap</span>
          <span className="font-jetbrains text-[10px] text-val-text-muted tabular-nums">Last 16 Weeks</span>
        </div>

        <div className="flex items-start gap-2">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] pt-0.5">
            {DAYS.map((d, i) => (
              <div key={i} className="h-[14px] sm:h-[18px] flex items-center">
                <span className="font-jetbrains text-[8px] sm:text-[9px] text-val-text-muted w-3">{d}</span>
              </div>
            ))}
          </div>

          {/* Grid — CSS transitions instead of 112 framer instances */}
          <motion.div
            className="flex-1 overflow-x-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-[3px]" style={{ minWidth: 'max-content' }}>
              {grid[0].map((_, col) => (
                <div key={col} className="flex flex-col gap-[3px]">
                  {grid.map((row, rowIdx) => (
                    <div
                      key={`${rowIdx}-${col}`}
                      className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] rounded-[2px] transition-all duration-500 hover:scale-125 hover:z-10"
                      style={{
                        backgroundColor: INTENSITY_BG[row[col]],
                        transitionDelay: `${col * 30 + rowIdx * 10}ms`,
                        boxShadow: row[col] >= 3 ? `0 0 ${row[col] === 4 ? '8' : '5'}px rgba(255,70,85,${row[col] === 4 ? '0.5' : '0.3'})` : undefined,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Intensity Legend */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="font-barlow text-[8px] text-val-text-muted uppercase mr-1">Less</span>
          {INTENSITY_BG.map((bg, i) => (
            <div key={i} className="w-[10px] h-[10px] rounded-[1px]" style={{ backgroundColor: bg }} />
          ))}
          <span className="font-barlow text-[8px] text-val-text-muted uppercase ml-1">More</span>
        </div>
      </div>

      {/* Agent Playtime Bars + Core Role */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Bars */}
        <div className="flex-1 rounded-sm ghost-border bg-val-bg-secondary p-4 space-y-3">
          <div className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest mb-1">Top Agents</div>
          {topAgents.map((agent, i) => (
            <div key={agent.name} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0">
                <Image
                  src={`/assets/agents/${agent.name.toLowerCase()}.png`}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-barlow text-xs font-semibold text-val-text-primary">{agent.name}</span>
                  <span className="font-jetbrains text-[10px] text-val-text-muted tabular-nums">{agent.hours}h</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${agent.barPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${agent.color}88, ${agent.color})`,
                      boxShadow: `0 0 6px ${agent.color}40`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Competency */}
        <div className="sm:w-44 rounded-sm ghost-border bg-val-bg-secondary p-4 flex flex-col items-center justify-center text-center">
          <div className="font-barlow text-[9px] font-semibold text-val-text-muted uppercase tracking-widest mb-2">Core Competency</div>
          <div className="relative w-20 h-20 mb-2">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="core-ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF4655" />
                  <stop offset="100%" stopColor="#FF8A94" />
                </linearGradient>
              </defs>
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
              <motion.circle
                cx="18" cy="18" r="15.9" fill="none" stroke="url(#core-ring-grad)" strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 100 - corePercent }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,70,85,0.5))' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-jetbrains font-bold text-lg text-val-text-primary">{corePercent}%</span>
            </div>
          </div>
          <div className="font-oswald font-bold text-base text-val-red">{coreRole} Main</div>
          <div className="font-inter text-[10px] text-val-text-muted mt-1">Dominant playstyle detected</div>
        </div>
      </div>
    </div>
  );
}

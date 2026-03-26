'use client';

import { motion } from 'framer-motion';
import { HEATMAP_DATA } from '@/lib/showcase/data';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const INTENSITY_COLORS = [
  'bg-white/[0.03]',
  'bg-val-red/20',
  'bg-val-red/40',
  'bg-val-red/60',
  'bg-val-red/80',
];

export default function HeatmapPreview() {
  const { grid, topAgents, coreRole, corePercent } = HEATMAP_DATA;

  return (
    <div className="space-y-4">
      {/* Heatmap Grid */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-4 sm:p-5">
        <div className="flex items-start gap-2">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] pt-0.5">
            {DAYS.map((d, i) => (
              <div key={i} className="h-[14px] sm:h-[18px] flex items-center">
                <span className="font-jetbrains text-[8px] sm:text-[9px] text-val-text-muted w-3">{d}</span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-[3px]" style={{ minWidth: 'max-content' }}>
              {grid[0].map((_, col) => (
                <div key={col} className="flex flex-col gap-[3px]">
                  {grid.map((row, rowIdx) => (
                    <motion.div
                      key={`${rowIdx}-${col}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: col * 0.03 + rowIdx * 0.01 }}
                      className={`w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] rounded-[2px] ${INTENSITY_COLORS[row[col]]} transition-colors`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intensity Legend */}
        <div className="flex items-center justify-end gap-1 mt-3">
          <span className="font-barlow text-[8px] text-val-text-muted uppercase mr-1">Less</span>
          {INTENSITY_COLORS.map((c, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-[1px] ${c}`} />
          ))}
          <span className="font-barlow text-[8px] text-val-text-muted uppercase ml-1">More</span>
        </div>
      </div>

      {/* Agent Playtime Bars + Core Role */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Bars */}
        <div className="flex-1 rounded-sm ghost-border bg-val-bg-secondary p-4 space-y-3">
          {topAgents.map((agent, i) => (
            <div key={agent.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-barlow text-xs font-semibold text-val-text-primary">{agent.name}</span>
                <span className="font-jetbrains text-[10px] text-val-text-muted tabular-nums">{agent.hours}h</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${agent.barPercent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: agent.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Core Competency */}
        <div className="sm:w-44 rounded-sm ghost-border bg-val-bg-secondary p-4 flex flex-col items-center justify-center text-center">
          <div className="font-barlow text-[9px] font-semibold text-val-text-muted uppercase tracking-widest mb-2">Core Competency</div>
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
              <motion.circle
                cx="18" cy="18" r="15.9" fill="none" stroke="#FF4655" strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 100 - corePercent }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-jetbrains font-bold text-sm text-val-text-primary">{corePercent}%</span>
            </div>
          </div>
          <div className="font-oswald font-bold text-sm text-val-red">{coreRole} Main</div>
        </div>
      </div>
    </div>
  );
}

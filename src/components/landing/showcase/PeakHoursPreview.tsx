'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PEAK_HOURS_DATA } from '@/lib/showcase/data';

function getHeatColor(winRate: number): string {
  if (winRate >= 62) return '#22C55E';
  if (winRate >= 56) return '#4ADE80';
  if (winRate >= 50) return '#F59E0B';
  if (winRate >= 44) return '#F97316';
  return '#FF4655';
}

function getHeatOpacity(winRate: number): number {
  const dist = Math.abs(winRate - 50);
  return 0.25 + (dist / 50) * 0.75;
}

const COL_HEADERS = ['6a–10a', '10a–2p', '2p–6p', '6p–10p', '10p–2a', '2a–6a'];

export default function PeakHoursPreview() {
  const { grid, bestWindow, worstWindow, optimalSession, totalGames } = PEAK_HOURS_DATA;
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  return (
    <div className="space-y-3">
      {/* Main heatmap card */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-val-stat-positive animate-pulse" />
            <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">
              Peak Performance Windows
            </span>
          </div>
          <span className="font-jetbrains text-[10px] text-val-text-muted tabular-nums">
            {totalGames} games analyzed
          </span>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto -mx-1">
          <div className="min-w-[420px] px-1">
            {/* Column headers */}
            <div className="grid grid-cols-[40px_repeat(6,1fr)] gap-1 mb-1">
              <div />
              {COL_HEADERS.map((h) => (
                <div key={h} className="text-center">
                  <span className="font-barlow text-[8px] sm:text-[9px] font-semibold text-val-text-muted uppercase tracking-wider">
                    {h}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            {grid.map((row, ri) => (
              <div key={row.day} className="grid grid-cols-[40px_repeat(6,1fr)] gap-1 mb-1">
                <div className="flex items-center">
                  <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-wider">
                    {row.day}
                  </span>
                </div>
                {row.slots.map((slot, ci) => {
                  const color = getHeatColor(slot.winRate);
                  const opacity = getHeatOpacity(slot.winRate);
                  const isHovered = hoveredCell?.row === ri && hoveredCell?.col === ci;
                  const isBest = bestWindow.day.startsWith(row.day) && slot.winRate >= 64;

                  return (
                    <div
                      key={ci}
                      className="relative aspect-[2/1] rounded-[3px] flex items-center justify-center cursor-default transition-all duration-200"
                      style={{
                        backgroundColor: color,
                        opacity: isHovered ? 1 : opacity,
                        boxShadow: isHovered ? `0 0 12px ${color}60` : isBest ? `0 0 8px ${color}40` : 'none',
                        transitionDelay: `${ci * 40 + ri * 20}ms`,
                      }}
                      onMouseEnter={() => setHoveredCell({ row: ri, col: ci })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <span className={`font-jetbrains font-bold tabular-nums transition-opacity duration-150 ${
                        isHovered ? 'text-white text-[11px]' : 'text-white/80 text-[9px] sm:text-[10px]'
                      }`}>
                        {slot.winRate}%
                      </span>
                      {/* Tooltip on hover */}
                      {isHovered && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-val-bg-primary ghost-border whitespace-nowrap z-10">
                          <span className="font-inter text-[9px] text-val-text-secondary">
                            {slot.games} games
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <span className="font-inter text-[8px] text-val-text-muted">Cold</span>
          {['#FF4655', '#F97316', '#F59E0B', '#4ADE80', '#22C55E'].map((c) => (
            <div key={c} className="w-4 h-2 rounded-[2px]" style={{ backgroundColor: c, opacity: 0.7 }} />
          ))}
          <span className="font-inter text-[8px] text-val-text-muted">Hot</span>
        </div>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Best window */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-sm ghost-border bg-val-bg-secondary p-3 sm:p-4"
          style={{ borderLeft: '2px solid #22C55E' }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-val-stat-positive" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="font-barlow text-[9px] font-semibold text-val-stat-positive uppercase tracking-widest">
              Best Window
            </span>
          </div>
          <div className="font-oswald font-bold text-lg sm:text-xl text-val-text-primary leading-tight">
            {bestWindow.day}
          </div>
          <div className="font-barlow text-xs text-val-text-secondary mt-0.5">
            {bestWindow.time}
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-jetbrains font-bold text-lg text-val-stat-positive tabular-nums">
              {bestWindow.winRate}%
            </span>
            <span className="font-inter text-[10px] text-val-text-muted">win rate</span>
          </div>
        </motion.div>

        {/* Worst window */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="rounded-sm ghost-border bg-val-bg-secondary p-3 sm:p-4"
          style={{ borderLeft: '2px solid #FF4655' }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <svg className="w-3.5 h-3.5 text-val-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="font-barlow text-[9px] font-semibold text-val-red uppercase tracking-widest">
              Worst Window
            </span>
          </div>
          <div className="font-oswald font-bold text-lg sm:text-xl text-val-text-primary leading-tight">
            {worstWindow.day}
          </div>
          <div className="font-barlow text-xs text-val-text-secondary mt-0.5">
            {worstWindow.time}
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-jetbrains font-bold text-lg text-val-red tabular-nums">
              {worstWindow.winRate}%
            </span>
            <span className="font-inter text-[10px] text-val-text-muted">win rate</span>
          </div>
        </motion.div>
      </div>

      {/* Session length insight */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="rounded-sm ghost-border bg-val-bg-secondary p-3 sm:p-4 flex items-center gap-3"
      >
        <div className="w-9 h-9 rounded-sm bg-val-red/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-4.5 h-4.5 text-val-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-barlow text-[9px] font-semibold text-val-text-muted uppercase tracking-widest mb-0.5">
            Optimal Session Length
          </div>
          <div className="font-inter text-xs sm:text-sm text-val-text-primary">
            <span className="font-jetbrains font-bold text-val-text-primary">{optimalSession.games} games</span>
            <span className="text-val-text-secondary"> — after 5+ games, win rate drops </span>
            <span className="font-jetbrains font-bold text-val-red">{optimalSession.dropPercent}%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

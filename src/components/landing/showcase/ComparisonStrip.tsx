'use client';

import { motion } from 'framer-motion';
import { COMPARISON_DATA } from '@/lib/showcase/data';

export default function ComparisonStrip() {
  const othersCount = COMPARISON_DATA.filter(r => r.others).length;
  const vsCount = COMPARISON_DATA.length;

  return (
    <div className="max-w-3xl mx-auto mb-6">
      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center gap-2 sm:gap-4 mb-3 px-3">
        <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Feature</span>
        <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest text-center">Others</span>
        <div className="flex items-center justify-center gap-1.5">
          <span className="w-4 h-4 rounded-[3px] bg-val-red flex items-center justify-center font-oswald text-[7px] font-bold text-white">VS</span>
          <span className="font-barlow text-[10px] font-semibold text-val-red uppercase tracking-widest">Ours</span>
        </div>
      </div>

      {/* Rows */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary overflow-hidden">
        {COMPARISON_DATA.map((row, i) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 border-b border-white/[0.03] last:border-0 transition-colors ${
              row.isHighlight ? 'bg-val-red/[0.06]' : ''
            }`}
            style={row.isHighlight ? { boxShadow: 'inset 3px 0 0 #FF4655' } : undefined}
          >
            <span className={`font-inter text-xs sm:text-sm ${row.isHighlight ? 'text-val-text-primary font-medium' : 'text-val-text-primary'}`}>
              {row.feature}
            </span>

            {/* Others column */}
            <div className="flex justify-center">
              {row.others ? (
                <svg className="w-4 h-4 text-val-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-val-stat-negative/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* ValorantScan column */}
            <div className="flex justify-center">
              <svg className={`w-4 h-4 ${row.isHighlight ? 'text-val-red' : 'text-val-stat-positive'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        ))}

        {/* Score Summary Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3 bg-val-bg-surface border-t border-white/[0.06]"
        >
          <span className="font-oswald font-bold text-xs sm:text-sm text-val-text-primary uppercase tracking-wide">Score</span>
          <div className="text-center">
            <span className="font-jetbrains font-bold text-sm text-val-text-muted">{othersCount}/{COMPARISON_DATA.length}</span>
          </div>
          <div className="text-center">
            <span className="font-jetbrains font-bold text-sm text-val-red">{vsCount}/{COMPARISON_DATA.length}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

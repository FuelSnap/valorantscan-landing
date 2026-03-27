'use client';

import { motion } from 'framer-motion';
import { COMPARISON_DATA } from '@/lib/showcase/data';

export default function ComparisonStrip() {
  const othersCount = COMPARISON_DATA.filter(r => r.others).length;
  const vsCount = COMPARISON_DATA.length;
  const exclusiveCount = vsCount - othersCount;

  return (
    <div className="max-w-2xl mx-auto mb-6">
      {/* Column headers */}
      <div className="grid grid-cols-[1fr_72px_72px] sm:grid-cols-[1fr_100px_100px] items-end gap-0 mb-2 px-3">
        <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Feature</span>
        <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest text-center">Others</span>
        <span className="font-barlow text-[10px] font-semibold text-val-red uppercase tracking-widest text-center">ValorantScan</span>
      </div>

      {/* Table */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary overflow-hidden">
        {COMPARISON_DATA.map((row, i) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            className={`grid grid-cols-[1fr_72px_72px] sm:grid-cols-[1fr_100px_100px] items-center gap-0 px-3 sm:px-4 py-2 border-b border-white/[0.04] last:border-0 ${
              row.isHighlight ? 'bg-val-red/[0.04]' : ''
            }`}
            style={row.isHighlight ? { borderLeft: '2px solid #FF4655' } : { borderLeft: '2px solid transparent' }}
          >
            <span className={`font-inter text-[11px] sm:text-[13px] leading-tight ${row.isHighlight ? 'text-val-text-primary font-medium' : 'text-val-text-secondary'}`}>
              {row.feature}
            </span>

            {/* Others column */}
            <div className="flex justify-center">
              {row.others ? (
                <div className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center">
                  <svg className="w-3 h-3 text-val-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-val-stat-negative/[0.08] flex items-center justify-center">
                  <svg className="w-3 h-3 text-val-stat-negative/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            {/* ValorantScan column */}
            <div className="flex justify-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${row.isHighlight ? 'bg-val-red/20' : 'bg-val-stat-positive/10'}`}>
                <svg className={`w-3 h-3 ${row.isHighlight ? 'text-val-red' : 'text-val-stat-positive'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Score row */}
        <div className="grid grid-cols-[1fr_72px_72px] sm:grid-cols-[1fr_100px_100px] items-center gap-0 px-3 sm:px-4 py-2.5 bg-val-bg-surface border-t border-white/[0.08]">
          <span className="font-barlow text-[11px] sm:text-xs font-semibold text-val-text-primary uppercase tracking-wider">
            {exclusiveCount} exclusive tools
          </span>
          <div className="text-center">
            <span className="font-jetbrains font-bold text-xs sm:text-sm text-val-text-muted">{othersCount}/{vsCount}</span>
          </div>
          <div className="text-center">
            <span className="font-jetbrains font-bold text-xs sm:text-sm text-val-red">{vsCount}/{vsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

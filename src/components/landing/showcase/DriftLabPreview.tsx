'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { DRIFTLAB_DATA } from '@/lib/showcase/data';

export default function DriftLabPreview() {
  const { roleData, months, currentMain, previousMain } = DRIFTLAB_DATA;

  const W = 560;
  const H = 160;
  const padX = 30;
  const padY = 10;
  const chartW = W - padX * 2;
  const chartH = H - padY * 2;
  const n = months.length;

  const cumulativeAtPoint = (pointIdx: number, upToRole: number): number => {
    let sum = 0;
    for (let r = 0; r <= upToRole; r++) {
      sum += roleData[r].values[pointIdx];
    }
    return sum;
  };

  const toX = (i: number) => padX + (i / (n - 1)) * chartW;
  const toY = (val: number) => padY + chartH - (val / 100) * chartH;

  const areaPaths = roleData.map((_, rIdx) => {
    const topPoints = Array.from({ length: n }, (__, i) => {
      const y = cumulativeAtPoint(i, rIdx);
      return `${toX(i).toFixed(1)},${toY(y).toFixed(1)}`;
    });

    const bottomPoints = Array.from({ length: n }, (__, i) => {
      const y = rIdx === 0 ? 0 : cumulativeAtPoint(i, rIdx - 1);
      return `${toX(n - 1 - i).toFixed(1)},${toY(y).toFixed(1)}`;
    });

    return `M${topPoints.join(' L')} L${bottomPoints.join(' L')} Z`;
  });

  // Trend: compare first vs last values for current main role (Duelist)
  const duelistFirst = roleData[0].values[0];
  const duelistLast = roleData[0].values[n - 1];
  const trendUp = duelistLast >= duelistFirst;

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-3 sm:p-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Role Distribution</span>
            <span className="font-jetbrains text-[10px] text-val-text-muted/50">12 Months</span>
          </div>
          {/* Legend — wraps on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {roleData.map((r) => (
              <div key={r.role} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="font-barlow text-[8px] sm:text-[9px] text-val-text-muted">{r.role}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-32 sm:h-40" preserveAspectRatio="none">
            <defs>
              {roleData.map((r, i) => (
                <linearGradient key={`grad-${i}`} id={`drift-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={r.color} stopOpacity="0.85" />
                  <stop offset="100%" stopColor={r.color} stopOpacity="0.25" />
                </linearGradient>
              ))}
              <filter id="drift-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {[25, 50, 75].map((pct) => (
              <line key={pct} x1={padX} y1={toY(pct)} x2={W - padX} y2={toY(pct)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Y-axis labels */}
            {[25, 50, 75, 100].map((pct) => (
              <text key={`y-${pct}`} x={padX - 4} y={toY(pct) + 3} textAnchor="end" fill="rgba(236,232,225,0.2)" fontSize="7" className="font-jetbrains">
                {pct}%
              </text>
            ))}

            {/* Stacked areas with gradients */}
            {areaPaths.map((path, i) => (
              <path key={roleData[i].role} d={path} fill={`url(#drift-grad-${i})`} />
            ))}

            {/* Top-edge stroke lines for definition */}
            {areaPaths.map((_, i) => {
              const topLine = Array.from({ length: n }, (__, pi) => {
                const y = cumulativeAtPoint(pi, i);
                return `${pi === 0 ? 'M' : 'L'}${toX(pi).toFixed(1)},${toY(y).toFixed(1)}`;
              }).join(' ');
              return (
                <path key={`edge-${i}`} d={topLine} fill="none" stroke={roleData[i].color} strokeWidth="1.5" opacity="0.7" filter="url(#drift-glow)" />
              );
            })}

            {/* Month labels */}
            {months.map((m, i) => (
              <text key={m} x={toX(i)} y={H - 1} textAnchor="middle" className="font-barlow" fill="rgba(236,232,225,0.25)" fontSize="8">
                {m}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Agent Cards + Trend */}
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_auto] gap-3">
        {[
          { label: 'Current Main', ...currentMain, isCurrent: true },
          { label: 'Previous Main', ...previousMain, isCurrent: false },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`rounded-sm ghost-border bg-val-bg-secondary p-3 flex items-center gap-3 ${card.isCurrent ? 'data-strip-left' : ''}`}
          >
            <div className="w-11 h-11 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0">
              <Image
                src={`/assets/agents/${card.agent.toLowerCase()}.png`}
                alt={card.agent}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div>
              <div className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider">{card.label}</div>
              <div className="font-oswald font-bold text-sm text-val-text-primary">{card.agent}</div>
              <div className="font-jetbrains text-[10px] text-val-red tabular-nums">{card.pickRate}% pick rate</div>
            </div>
          </motion.div>
        ))}

        {/* Trend Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hidden sm:flex rounded-sm ghost-border bg-val-bg-secondary p-3 flex-col items-center justify-center text-center"
        >
          <svg className={`w-5 h-5 mb-1 ${trendUp ? 'text-val-stat-positive' : 'text-val-stat-negative'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={trendUp ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
          </svg>
          <span className="font-barlow text-[8px] text-val-text-muted uppercase tracking-wider">
            {trendUp ? 'Specializing' : 'Diversifying'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

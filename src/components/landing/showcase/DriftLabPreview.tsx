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

  // Build stacked area paths (bottom-up)
  const cumulativeAtPoint = (pointIdx: number, upToRole: number): number => {
    let sum = 0;
    for (let r = 0; r <= upToRole; r++) {
      sum += roleData[r].values[pointIdx];
    }
    return sum;
  };

  const toX = (i: number) => padX + (i / (n - 1)) * chartW;
  const toY = (val: number) => padY + chartH - (val / 100) * chartH;

  const areaPaths = roleData.map((role, rIdx) => {
    // Top edge (left to right)
    const topPoints = Array.from({ length: n }, (_, i) => {
      const y = cumulativeAtPoint(i, rIdx);
      return `${toX(i).toFixed(1)},${toY(y).toFixed(1)}`;
    });

    // Bottom edge (right to left)
    const bottomPoints = Array.from({ length: n }, (_, i) => {
      const y = rIdx === 0 ? 0 : cumulativeAtPoint(i, rIdx - 1);
      return `${toX(n - 1 - i).toFixed(1)},${toY(y).toFixed(1)}`;
    });

    return `M${topPoints.join(' L')} L${bottomPoints.join(' L')} Z`;
  });

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="rounded-sm ghost-border bg-val-bg-secondary p-3 sm:p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="font-barlow text-[10px] font-semibold text-val-text-muted uppercase tracking-widest">Role Distribution — 12 Months</span>
          <div className="flex items-center gap-3">
            {roleData.map((r) => (
              <div key={r.role} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="font-barlow text-[9px] text-val-text-muted">{r.role}</span>
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
            {/* Grid lines */}
            {[25, 50, 75].map((pct) => (
              <line key={pct} x1={padX} y1={toY(pct)} x2={W - padX} y2={toY(pct)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}

            {/* Stacked areas */}
            {areaPaths.map((path, i) => (
              <path key={roleData[i].role} d={path} fill={roleData[i].color} opacity="0.5" />
            ))}

            {/* Month labels */}
            {months.map((m, i) => (
              <text key={m} x={toX(i)} y={H - 1} textAnchor="middle" className="font-barlow" fill="rgba(236,232,225,0.25)" fontSize="8">
                {m}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Current Main', ...currentMain },
          { label: 'Previous Main', ...previousMain },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-sm ghost-border bg-val-bg-secondary p-3 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-sm overflow-hidden bg-val-bg-tertiary relative flex-shrink-0">
              <Image
                src={`/assets/agents/${card.agent.toLowerCase()}.png`}
                alt={card.agent}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <div className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider">{card.label}</div>
              <div className="font-oswald font-bold text-sm text-val-text-primary">{card.agent}</div>
              <div className="font-jetbrains text-[10px] text-val-red tabular-nums">{card.pickRate}% pick rate</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

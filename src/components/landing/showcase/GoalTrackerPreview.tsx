'use client';

import { motion } from 'framer-motion';
import { GOALS_DATA } from '@/lib/showcase/data';

const TYPE_COLORS: Record<string, string> = {
  daily: '#FF4655',
  weekly: '#3B82F6',
  monthly: '#B042FF',
};

const TYPE_LABELS: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};

export default function GoalTrackerPreview() {
  const { activeGoals, weeklyStreak, goalsCompleted } = GOALS_DATA;

  return (
    <div className="space-y-4">
      {/* Streak Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-sm ghost-border bg-val-bg-secondary p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🔥</div>
          <div>
            <div className="font-oswald font-bold text-lg text-val-text-primary">
              {weeklyStreak} Week Streak
            </div>
            <div className="font-inter text-[11px] text-val-text-muted">Keep it up! You&apos;re on fire.</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-jetbrains font-bold text-xl text-val-stat-positive">{goalsCompleted}</div>
          <div className="font-barlow text-[9px] text-val-text-muted uppercase tracking-wider">Goals Done</div>
        </div>
      </motion.div>

      {/* Goal Cards */}
      <div className="space-y-3">
        {activeGoals.map((goal, i) => {
          const color = TYPE_COLORS[goal.type];
          const circumference = 2 * Math.PI * 14;
          const offset = circumference - (goal.progress / 100) * circumference;

          return (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="rounded-sm ghost-border bg-val-bg-secondary p-4 flex items-center gap-4"
            >
              {/* Progress Ring */}
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                  <motion.circle
                    cx="16" cy="16" r="14" fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.12 + 0.2, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-jetbrains text-[9px] font-bold text-val-text-primary">{goal.progress}%</span>
                </div>
              </div>

              {/* Goal Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-1.5 py-0.5 rounded font-barlow text-[8px] font-bold uppercase tracking-wider"
                    style={{ color, backgroundColor: `${color}15` }}
                  >
                    {TYPE_LABELS[goal.type]}
                  </span>
                  {goal.streak > 0 && (
                    <span className="font-barlow text-[9px] text-val-accent-gold">
                      🔥 {goal.streak}
                    </span>
                  )}
                </div>
                <div className="font-inter text-xs text-val-text-primary truncate">{goal.title}</div>
              </div>

              {/* Progress */}
              <div className="text-right flex-shrink-0">
                <div className="font-jetbrains text-sm font-bold text-val-text-primary tabular-nums">{goal.current}</div>
                <div className="font-barlow text-[9px] text-val-text-muted">/ {goal.target}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

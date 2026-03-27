import type {
  ComparisonRow,
  EncounterPreviewData,
  HeatmapPreviewData,
  DriftLabPreviewData,
  GoalPreviewData,
  TrophyPreviewData,
} from './types';

/* ═══════════════════════════════════════════════════════════
   PLUG IN YOUR REAL STATS HERE
   ═══════════════════════════════════════════════════════════ */

export const MY_PLAYER = {
  name: 'YourName',
  tag: 'NA1',
  rank: 'Immortal 2',
};

/* ─── Comparison Strip ─── */

export const COMPARISON_DATA: ComparisonRow[] = [
  { feature: 'K/D, Win Rate & Match History', others: true, valorantscan: true },
  { feature: 'Leaderboards', others: true, valorantscan: true },
  { feature: 'Agent & Map Stats', others: true, valorantscan: true },
  { feature: 'In-Game Overlay', others: true, valorantscan: true },
  { feature: 'Player Encounter Tracking', others: false, valorantscan: true, isHighlight: true },
  { feature: '365-Day Performance Trends', others: false, valorantscan: true, isHighlight: true },
  { feature: 'Agent Mastery Heatmap', others: false, valorantscan: true, isHighlight: true },
  { feature: 'Goal Tracker with Streaks', others: false, valorantscan: true, isHighlight: true },
  { feature: '100+ Achievements & Trophies', others: false, valorantscan: true, isHighlight: true },
  { feature: 'Crosshair Builder', others: false, valorantscan: true },
  { feature: 'Peek Reaction Trainer', others: false, valorantscan: true },
];

/* ─── Player Encounters ─── */

export const ENCOUNTERS_DATA: EncounterPreviewData = {
  player: {
    name: MY_PLAYER.name,
    tag: MY_PLAYER.tag,
    rank: MY_PLAYER.rank,
    kd: 1.84,
    hsPercent: 32.4,
    agent: 'jett',
  },
  rival: {
    name: 'ViperMain99',
    tag: 'NA1',
    rank: 'Immortal 2',
    kd: 0.92,
    hsPercent: 21.8,
    agent: 'viper',
  },
  matchup: { wins: 5, losses: 3 },
  badges: [
    { name: 'NEMESIS', color: '#FF4655' },
    { name: 'FREE ELO', color: '#22C55E' },
    { name: 'TRUSTED DUO', color: '#2DD4BF' },
  ],
  encounterList: [
    { name: 'ShadowStep_Pro', rank: 'Radiant', timesFaced: 12, record: '8W-4L', kd: 1.45 },
    { name: 'GhostProtocol', rank: 'Imm 3', timesFaced: 9, record: '4W-5L', kd: 1.02 },
    { name: 'SageOrFeed', rank: 'Imm 1', timesFaced: 7, record: '6W-1L', kd: 2.10 },
  ],
};

/* ─── Agent Heatmap ─── */

// 7 rows (Mon-Sun) x 16 columns (weeks). Values 0-4 intensity.
export const HEATMAP_DATA: HeatmapPreviewData = {
  grid: [
    [0,1,2,1,3,2,1,0,2,3,4,2,1,3,2,1],
    [1,2,3,2,1,3,2,1,3,4,3,2,3,2,1,2],
    [2,1,0,1,2,1,0,2,1,2,3,4,2,1,3,2],
    [3,2,1,2,3,4,3,2,1,2,1,3,4,3,2,1],
    [1,0,1,3,2,1,2,3,4,3,2,1,0,2,3,4],
    [4,3,2,1,0,1,2,3,2,1,3,2,4,3,2,1],
    [2,1,0,0,1,2,1,0,1,2,1,0,1,2,3,2],
  ],
  topAgents: [
    { name: 'Jett', hours: 260, color: '#87CEEB', barPercent: 100 },
    { name: 'Omen', hours: 185, color: '#4B0082', barPercent: 71 },
    { name: 'Killjoy', hours: 142, color: '#FFD700', barPercent: 55 },
    { name: 'Reyna', hours: 98, color: '#9B59B6', barPercent: 38 },
  ],
  coreRole: 'Duelist',
  corePercent: 62,
};

/* ─── DriftLab ─── */

export const DRIFTLAB_DATA: DriftLabPreviewData = {
  roleData: [
    { role: 'Duelist', color: '#FF4655', values: [55,58,52,48,45,50,55,60,62,58,55,60] },
    { role: 'Controller', color: '#22C55E', values: [15,12,18,22,25,20,18,15,12,15,18,15] },
    { role: 'Sentinel', color: '#3B82F6', values: [20,18,15,15,12,15,12,10,13,15,15,12] },
    { role: 'Initiator', color: '#F59E0B', values: [10,12,15,15,18,15,15,15,13,12,12,13] },
  ],
  months: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
  currentMain: { agent: 'Jett', role: 'Duelist', pickRate: 42 },
  previousMain: { agent: 'Omen', role: 'Controller', pickRate: 18 },
};

/* ─── Goal Tracker ─── */

export const GOALS_DATA: GoalPreviewData = {
  activeGoals: [
    { title: 'Win 3 Competitive Matches', type: 'daily', progress: 67, current: '2', target: '3', streak: 5 },
    { title: 'Play 5 Different Agents', type: 'weekly', progress: 80, current: '4', target: '5', streak: 12 },
    { title: 'Reach 30% Headshot Rate', type: 'monthly', progress: 92, current: '27.6%', target: '30%', streak: 3 },
  ],
  weeklyStreak: 12,
  goalsCompleted: 47,
};

/* ─── Trophy System ─── */

export const TROPHIES_DATA: TrophyPreviewData = {
  unlocked: 42,
  total: 100,
  trophies: [
    { name: 'First Blood King', description: 'Get 500 first bloods', rarity: 'epic', isUnlocked: true, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Ace Machine', description: 'Get 25 aces in competitive', rarity: 'legendary', isUnlocked: true, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { name: 'Headshot Specialist', description: 'Maintain 30%+ HS rate for a season', rarity: 'rare', isUnlocked: true, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Wall of Iron', description: 'Win 100 pistol rounds', rarity: 'common', isUnlocked: true, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'CLASSIFIED', description: '???', rarity: 'legendary', isUnlocked: false, icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { name: 'CLASSIFIED', description: '???', rarity: 'epic', isUnlocked: false, icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ],
  featured: {
    name: 'Ace Machine',
    description: 'Get 25 aces in competitive matches. Only the most clutch players earn this.',
    rarity: 'legendary',
    progress: { current: 25, max: 25 },
  },
};

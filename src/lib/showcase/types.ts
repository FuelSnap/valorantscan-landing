export interface ComparisonRow {
  feature: string;
  others: boolean;
  valorantscan: boolean;
  isHighlight?: boolean;
}

export interface EncounterPreviewData {
  player: {
    name: string;
    tag: string;
    rank: string;
    kd: number;
    hsPercent: number;
    agent: string;
  };
  rival: {
    name: string;
    tag: string;
    rank: string;
    kd: number;
    hsPercent: number;
    agent: string;
  };
  matchup: {
    wins: number;
    losses: number;
  };
  badges: Array<{
    name: string;
    color: string;
  }>;
  encounterList: Array<{
    name: string;
    rank: string;
    timesFaced: number;
    record: string;
    kd: number;
  }>;
}

export interface HeatmapPreviewData {
  grid: number[][];
  topAgents: Array<{
    name: string;
    hours: number;
    color: string;
    barPercent: number;
  }>;
  coreRole: string;
  corePercent: number;
}

export interface DriftLabPreviewData {
  roleData: Array<{
    role: string;
    color: string;
    values: number[];
  }>;
  months: string[];
  currentMain: { agent: string; role: string; pickRate: number };
  previousMain: { agent: string; role: string; pickRate: number };
}

export interface GoalPreviewData {
  activeGoals: Array<{
    title: string;
    type: 'daily' | 'weekly' | 'monthly';
    progress: number;
    current: string;
    target: string;
    streak: number;
  }>;
  weeklyStreak: number;
  goalsCompleted: number;
}

export interface TrophyPreviewData {
  unlocked: number;
  total: number;
  trophies: Array<{
    name: string;
    description: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    isUnlocked: boolean;
    icon: string;
  }>;
  featured: {
    name: string;
    description: string;
    rarity: 'legendary';
    progress: { current: number; max: number };
  };
}

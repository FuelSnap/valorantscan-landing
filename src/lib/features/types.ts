// COTW (Clip of the Week) Types
export interface ClipSubmission {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  submittedBy: {
    id: string;
    gameName: string;
    tagLine: string;
    rank: string;
    avatar?: string;
  };
  submittedAt: string;
  week: number;
  year: number;
  votes: number;
  views: number;
  agent: string;
  map: string;
  clipType: 'ace' | 'clutch' | 'highlight' | 'funny' | 'wallbang' | 'lineup' | 'collateral';
  hasVoted?: boolean;
  isWinner?: boolean;
  placement?: number;
}

export interface COTWWeek {
  week: number;
  year: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'voting' | 'closed';
  totalSubmissions: number;
  totalVotes: number;
  winner?: ClipSubmission;
  prize: {
    amount: number;
    currency: string;
    description: string;
  };
}

export interface COTWFilters {
  week: number | 'current';
  rated: 'all' | 'top' | 'new' | 'trending';
  clipType?: ClipSubmission['clipType'];
  agent?: string;
  map?: string;
}

// Stratbook (Map Strategy Maker) Types
export type ValorantMap = 
  | 'Ascent' 
  | 'Bind' 
  | 'Haven' 
  | 'Split' 
  | 'Icebox' 
  | 'Breeze' 
  | 'Fracture' 
  | 'Pearl' 
  | 'Lotus' 
  | 'Sunset' 
  | 'Abyss'
  | 'Corrode';

export type ValorantAgent =
  | 'Jett' | 'Phoenix' | 'Reyna' | 'Raze' | 'Yoru' | 'Neon' | 'Iso'
  | 'Brimstone' | 'Viper' | 'Omen' | 'Astra' | 'Harbor' | 'Clove' | 'Miks'
  | 'Sage' | 'Cypher' | 'Killjoy' | 'Chamber' | 'Deadlock' | 'Vyse'
  | 'Sova' | 'Breach' | 'Skye' | 'KAY/O' | 'Fade' | 'Gekko'
  | 'Tejo' | 'Veto' | 'Waylay';

export type WeaponCategory = 'sidearm' | 'smg' | 'shotgun' | 'rifle' | 'sniper' | 'machine-gun' | 'melee';

export interface Weapon {
  id: string;
  name: string;
  category: WeaponCategory;
  cost: number;
}

export interface AgentAbility {
  id: string;
  name: string;
  key: 'C' | 'Q' | 'E' | 'X';
  type: 'smoke' | 'flash' | 'recon' | 'molly' | 'wall' | 'trap' | 'heal' | 'movement' | 'damage' | 'ultimate';
  color: string;
}

export interface AgentData {
  id: string;
  name: ValorantAgent;
  role: 'Duelist' | 'Controller' | 'Sentinel' | 'Initiator';
  abilities: AgentAbility[];
  color: string;
  uuid: string;
  hasPortrait: boolean;
  fact: string;
}

export interface MapCallout {
  id: string;
  name: string;
  x: number;
  y: number;
  site?: 'A' | 'B' | 'C' | 'Mid';
}

export interface MapData {
  id: string;
  name: ValorantMap;
  sites: ('A' | 'B' | 'C')[];
  imageUrl: string;
  minimapUrl: string;
  callouts: MapCallout[];
  dimensions: { width: number; height: number };
  mapColor: string;
}

// Strategy Canvas Elements
export interface CanvasElement {
  id: string;
  type: 'agent' | 'ability' | 'arrow' | 'text' | 'ping' | 'line' | 'area' | 'icon';
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
  color?: string;
  data?: Record<string, unknown>;
}

export interface AgentElement extends CanvasElement {
  type: 'agent';
  data: {
    agent: ValorantAgent;
    number: 1 | 2 | 3 | 4 | 5;
    weapon?: string;
  };
}

export interface AbilityElement extends CanvasElement {
  type: 'ability';
  data: {
    agent: ValorantAgent;
    abilityKey: 'C' | 'Q' | 'E' | 'X';
    abilityName: string;
  };
}

export interface ArrowElement extends CanvasElement {
  type: 'arrow';
  data: {
    endX: number;
    endY: number;
    style: 'solid' | 'dashed' | 'curved';
    arrowHead: boolean;
  };
}

export interface TextElement extends CanvasElement {
  type: 'text';
  data: {
    text: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold';
  };
}

export interface AreaElement extends CanvasElement {
  type: 'area';
  data: {
    width: number;
    height: number;
    shape: 'rectangle' | 'circle' | 'cone';
    opacity: number;
  };
}

// Strategy Document
export interface Strategy {
  id: string;
  name: string;
  description: string;
  map: ValorantMap;
  side: 'attack' | 'defense';
  agents: ValorantAgent[];
  elements: CanvasElement[];
  createdBy: {
    id: string;
    gameName: string;
  };
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  likes: number;
  views: number;
  tags: string[];
  steps?: StrategyStep[];
}

export interface StrategyStep {
  id: string;
  order: number;
  title: string;
  description: string;
  elements: CanvasElement[];
  duration?: number; // seconds
}

// Premium / Subscription Types
export interface PremiumStatus {
  isPremium: boolean;
  tier: 'free' | 'premium' | 'pro';
  expiresAt?: string;
  features: {
    cotwVoting: boolean;
    cotwSubmissions: number;
    strategySaves: number;
    strategyExports: boolean;
    challengeMode: boolean;
    adFree: boolean;
    prioritySupport: boolean;
  };
}

export const PREMIUM_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      cotwVoting: false,
      cotwSubmissions: 0,
      strategySaves: 3,
      strategyExports: false,
      challengeMode: false,
      adFree: false,
      prioritySupport: false,
    },
  },
  premium: {
    name: 'Premium',
    price: 4.99,
    features: {
      cotwVoting: true,
      cotwSubmissions: 1,
      strategySaves: 25,
      strategyExports: true,
      challengeMode: true,
      adFree: true,
      prioritySupport: false,
    },
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    features: {
      cotwVoting: true,
      cotwSubmissions: 5,
      strategySaves: -1, // unlimited
      strategyExports: true,
      challengeMode: true,
      adFree: true,
      prioritySupport: true,
    },
  },
} as const;

import { RANKS, RANK_COLORS } from '@/lib/data/constants';
import realPlayersData from './realPlayers.json';

interface RealPlayer {
  rank: string;
  rankTier: number;
  stats: {
    kd: number;
    hsPercent: number;
    winRate: number;
    acs: number;
    matches: number;
  };
  topAgents: { name: string; role: string; matches: number; kd: number }[];
  topMaps: { name: string; winRate: number }[];
  synthetic?: boolean;
}

export interface RoundData {
  stats: {
    kd: number;
    hsPercent: number;
    winRate: number;
    acs: number;
  };
  topAgents: { name: string; role: string; kd: number; id: string }[];
  topMaps: { name: string; winRate: number }[];
  correctRank: string;
  archetype: string;
  archetypeDesc: string;
  topAgentId: string;
  choices: { rank: string; isCorrect: boolean }[];
}

const players: RealPlayer[] = (realPlayersData as RealPlayer[]).filter(p => !p.synthetic);

const MAP_SLUGS: Record<string, string> = {
  'Ascent': 'ascent', 'Bind': 'bind', 'Haven': 'haven',
  'Split': 'split', 'Icebox': 'icebox', 'Breeze': 'breeze',
  'Fracture': 'fracture', 'Pearl': 'pearl', 'Lotus': 'lotus',
  'Sunset': 'sunset', 'Abyss': 'abyss', 'Corrode': 'corrode',
};

const ROLE_SLUGS: Record<string, string> = {
  'Duelist': 'duelist', 'Sentinel': 'sentinel',
  'Controller': 'controller', 'Initiator': 'initiator',
};

export function mapNameToSlug(name: string): string | null {
  return MAP_SLUGS[name] || null;
}

export function roleToSlug(role: string): string | null {
  return ROLE_SLUGS[role] || null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRankIndex(rank: string): number {
  return RANKS.indexOf(rank as typeof RANKS[number]);
}

function agentNameToId(name: string): string {
  if (name === 'KAY/O') return 'kayo';
  return name.toLowerCase();
}

/** Derive a fun archetype label + description from stats */
function deriveArchetype(stats: RealPlayer['stats'], topAgents: RealPlayer['topAgents']): { archetype: string; desc: string } {
  const { kd, hsPercent, winRate, acs } = stats;
  const mainRole = topAgents[0]?.role || 'Duelist';

  if (kd >= 1.5 && winRate < 50) {
    return { archetype: 'Stat Padder', desc: 'Insane KD but can\'t close rounds. All aim, no brain.' };
  }
  if (kd >= 1.3 && winRate >= 55) {
    return { archetype: 'Carry Machine', desc: 'Dominates lobbies and drags the team to wins.' };
  }
  if (hsPercent >= 28 && kd >= 1.1) {
    return { archetype: 'Headhunter', desc: 'Surgical crosshair placement. Every duel is a one-tap.' };
  }
  if (acs >= 260 && mainRole === 'Duelist') {
    return { archetype: 'Entry Demon', desc: 'First in every round. Lives fast, fragging out.' };
  }
  if (winRate >= 55 && kd < 1.0) {
    return { archetype: 'Team Anchor', desc: 'Doesn\'t need kills to win. Utility and comms carry the day.' };
  }
  if (mainRole === 'Controller' && winRate >= 50) {
    return { archetype: 'Smoke Brain', desc: 'Reads the map like a book. Always in the right spot.' };
  }
  if (mainRole === 'Sentinel' && kd >= 1.0) {
    return { archetype: 'Lockdown Artist', desc: 'Nothing gets past this player. Site is on lockdown.' };
  }
  if (mainRole === 'Initiator' && acs >= 200) {
    return { archetype: 'Info Gatherer', desc: 'Flash, scan, reveal — then cleans up the kills.' };
  }
  if (kd < 0.8 && winRate < 45) {
    return { archetype: 'Grinder', desc: 'Still climbing the ranks. Heart bigger than the stats.' };
  }
  if (kd >= 1.0 && winRate >= 48 && winRate <= 53) {
    return { archetype: 'Consistent Performer', desc: 'Solid all around. Never the problem, always reliable.' };
  }
  return { archetype: 'Ranked Warrior', desc: 'Queues up and grinds. The backbone of competitive.' };
}

function generateDistractors(correctRank: string): string[] {
  const idx = getRankIndex(correctRank);
  const distractors: string[] = [];
  const used = new Set<number>([idx]);

  const offsets = shuffle([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);

  for (const offset of offsets) {
    if (distractors.length >= 3) break;
    const dIdx = idx + offset;
    if (dIdx >= 0 && dIdx < RANKS.length && !used.has(dIdx)) {
      used.add(dIdx);
      distractors.push(RANKS[dIdx]);
    }
  }

  while (distractors.length < 3) {
    const rIdx = Math.floor(Math.random() * RANKS.length);
    if (!used.has(rIdx)) {
      used.add(rIdx);
      distractors.push(RANKS[rIdx]);
    }
  }

  return distractors;
}

function realPlayerToRound(player: RealPlayer): RoundData {
  const topAgents = player.topAgents.slice(0, 3).map(a => ({
    name: a.name,
    role: a.role,
    kd: a.kd,
    id: agentNameToId(a.name),
  }));

  const topMaps = player.topMaps.slice(0, 3).map(m => ({
    name: m.name,
    winRate: m.winRate,
  }));

  const { archetype, desc } = deriveArchetype(player.stats, player.topAgents);

  const distractors = generateDistractors(player.rank);
  const choices = shuffle([
    { rank: player.rank, isCorrect: true },
    ...distractors.map(r => ({ rank: r, isCorrect: false })),
  ]);

  return {
    stats: {
      kd: player.stats.kd,
      hsPercent: player.stats.hsPercent,
      winRate: player.stats.winRate,
      acs: player.stats.acs,
    },
    topAgents,
    topMaps,
    correctRank: player.rank,
    archetype,
    archetypeDesc: desc,
    topAgentId: topAgents[0]?.id || 'jett',
    choices,
  };
}

/**
 * Pick rounds ensuring rank variety — one player from each tier group,
 * so players see a spread from Iron to Radiant.
 */
export function prepareRounds(count = 5): RoundData[] {
  // Group players by tier group (Iron, Bronze, Silver, Gold, Plat, Diamond, Ascendant, Immortal, Radiant)
  const tierGroups: Record<string, RealPlayer[]> = {};
  for (const p of players) {
    const tier = p.rank.split(' ')[0]; // "Iron 3" → "Iron"
    if (!tierGroups[tier]) tierGroups[tier] = [];
    tierGroups[tier].push(p);
  }

  // Pick one random player from each tier group, then shuffle and take `count`
  const pool: RealPlayer[] = [];
  for (const tier of Object.keys(tierGroups)) {
    const group = tierGroups[tier];
    const pick = group[Math.floor(Math.random() * group.length)];
    pool.push(pick);
  }

  // Shuffle the pool and pick `count` rounds
  const selected = shuffle(pool).slice(0, count);
  return selected.map(realPlayerToRound);
}

export function getRankTierColor(rank: string): string {
  const tier = rank.split(' ')[0];
  return RANK_COLORS[tier] || '#FFFFFF';
}

export function getScoreRating(score: number, total: number): { title: string; color: string } {
  const ratio = score / total;
  if (ratio === 1) return { title: 'RADIANT GAME SENSE', color: '#FBBF24' };
  if (ratio >= 0.8) return { title: 'IMMORTAL READS', color: '#EF4444' };
  if (ratio >= 0.6) return { title: 'DIAMOND ANALYST', color: '#A855F7' };
  if (ratio >= 0.4) return { title: 'HARDSTUCK GUESSER', color: '#14B8A6' };
  return { title: 'IRON EYES', color: '#71717A' };
}

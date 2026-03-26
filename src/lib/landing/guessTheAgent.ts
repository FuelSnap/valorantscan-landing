import { AGENTS } from '@/lib/gamedata';
const ALL_AGENTS = AGENTS.map(a => ({ id: a.id, name: a.name, role: a.role }));

export interface AgentRoundData {
  agentId: string;
  agentName: string;
  role: string;
  cropPosition: string;
  zoomLevel: number;
  choices: { name: string; id: string; isCorrect: boolean }[];
}

const AGENT_FACTS: Record<string, string> =
  Object.fromEntries(AGENTS.map(a => [a.id, a.fact]));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomCropPosition(): string {
  // NEVER land on the head/face — crop only torso, hands, legs, accessories
  // Agent art: head is roughly 0-20% Y. Avoid Y 0-30% entirely.
  const x = Math.floor(Math.random() * 60) + 20; // 20-80%
  const y = Math.floor(Math.random() * 40) + 50;  // 50-90% (torso and below only)
  return `${x}% ${y}%`;
}

function randomZoomLevel(roundIdx: number): number {
  // Very zoomed in — 5.6x base, increases per round (2x'd)
  const base = 5.6;
  const perRound = 0.5;
  const jitter = (Math.random() - 0.5) * 0.6;
  return Math.round((base + roundIdx * perRound + jitter) * 100) / 100;
}

export function prepareAgentRounds(count = 5): AgentRoundData[] {
  const selected = shuffle([...ALL_AGENTS]).slice(0, count);

  return selected.map((agent, i) => {
    // Pick 3 distractors, prefer same role for harder guessing
    const sameRole = ALL_AGENTS.filter(a => a.id !== agent.id && a.role === agent.role);
    const diffRole = ALL_AGENTS.filter(a => a.id !== agent.id && a.role !== agent.role);

    const distractors: typeof ALL_AGENTS = [];
    const shuffledSame = shuffle(sameRole);
    const shuffledDiff = shuffle(diffRole);

    // 1-2 from same role, rest from different
    const sameCount = Math.min(shuffledSame.length, Math.random() > 0.5 ? 2 : 1);
    for (let j = 0; j < sameCount && distractors.length < 3; j++) {
      distractors.push(shuffledSame[j]);
    }
    for (let j = 0; distractors.length < 3; j++) {
      distractors.push(shuffledDiff[j]);
    }

    const choices = shuffle([
      { name: agent.name, id: agent.id, isCorrect: true },
      ...distractors.map(d => ({ name: d.name, id: d.id, isCorrect: false })),
    ]);

    return {
      agentId: agent.id,
      agentName: agent.name,
      role: agent.role,
      cropPosition: randomCropPosition(),
      zoomLevel: randomZoomLevel(i),
      choices,
    };
  });
}

export function getAgentFact(agentId: string): string {
  return AGENT_FACTS[agentId] || 'A Valorant agent ready for battle.';
}

export function getAgentScoreRating(score: number, total: number): { title: string; color: string } {
  const ratio = score / total;
  if (ratio === 1) return { title: 'AGENT ENCYCLOPEDIA', color: '#FBBF24' };
  if (ratio >= 0.8) return { title: 'ROSTER EXPERT', color: '#A855F7' };
  if (ratio >= 0.6) return { title: 'AGENT SPOTTER', color: '#F97316' };
  if (ratio >= 0.4) return { title: 'STILL LEARNING', color: '#71717A' };
  return { title: 'FRIENDLY FIRE', color: '#EF4444' };
}

const ROLE_COLORS: Record<string, string> = {
  Duelist: '#FF4655',
  Initiator: '#14B8A6',
  Controller: '#A855F7',
  Sentinel: '#F59E0B',
};

export function getRoleColor(role: string): string {
  return ROLE_COLORS[role] || '#ECE8E1';
}

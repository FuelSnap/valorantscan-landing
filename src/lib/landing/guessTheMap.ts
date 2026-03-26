const ALL_MAPS = [
  { id: 'ascent', name: 'Ascent' },
  { id: 'bind', name: 'Bind' },
  { id: 'haven', name: 'Haven' },
  { id: 'split', name: 'Split' },
  { id: 'icebox', name: 'Icebox' },
  { id: 'breeze', name: 'Breeze' },
  { id: 'fracture', name: 'Fracture' },
  { id: 'pearl', name: 'Pearl' },
  { id: 'lotus', name: 'Lotus' },
  { id: 'sunset', name: 'Sunset' },
  { id: 'abyss', name: 'Abyss' },
  { id: 'corrode', name: 'Corrode' },
];

export interface MapRoundData {
  mapId: string;
  mapName: string;
  cropPosition: string;
  zoomLevel: number;
  choices: { name: string; id: string; isCorrect: boolean }[];
}

const MAP_FACTS: Record<string, string> = {
  ascent: 'Set in Venice, Italy — the floating island map with a massive A-site door.',
  bind: 'Two teleporters connect the sites — the only map with no mid.',
  haven: 'The original three-site map. Defenders have to spread thin.',
  split: 'Vertical map with ropes and tight chokepoints. Removed and brought back by popular demand.',
  icebox: 'Set in a frozen Kingdom facility. The zipline plays are iconic.',
  breeze: 'Tropical island with long sightlines. Operator paradise.',
  fracture: 'Attackers spawn in the middle — a unique H-shaped layout.',
  pearl: 'Underground Portuguese city. No gimmicks, pure fundamentals.',
  lotus: 'Three sites with rotating doors and destructible walls.',
  sunset: 'Set in Los Angeles with vibrant colors and mid-focused gameplay.',
  abyss: 'No barriers at the edges — fall off and you die.',
  corrode: 'A decaying French fortress turned Radianite salt mine.',
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomCropPosition(): string {
  // Generate a random crop position, avoiding dead center (too easy)
  const x = Math.floor(Math.random() * 80) + 10; // 10-90%
  const y = Math.floor(Math.random() * 60) + 20;  // 20-80%
  return `${x}% ${y}%`;
}

function randomZoomLevel(roundIdx: number): number {
  // Rounds get harder — zoom increases (2x'd)
  const base = 3.2;
  const perRound = 0.3;
  const jitter = (Math.random() - 0.5) * 0.4;
  return Math.round((base + roundIdx * perRound + jitter) * 100) / 100;
}

export function prepareMapRounds(count = 5): MapRoundData[] {
  const selected = shuffle([...ALL_MAPS]).slice(0, count);

  return selected.map((map, i) => {
    const distractors = shuffle(
      ALL_MAPS.filter(m => m.id !== map.id)
    ).slice(0, 3);

    const choices = shuffle([
      { name: map.name, id: map.id, isCorrect: true },
      ...distractors.map(d => ({ name: d.name, id: d.id, isCorrect: false })),
    ]);

    return {
      mapId: map.id,
      mapName: map.name,
      cropPosition: randomCropPosition(),
      zoomLevel: randomZoomLevel(i),
      choices,
    };
  });
}

export function getMapFact(mapId: string): string {
  return MAP_FACTS[mapId] || 'A competitive Valorant battleground.';
}

export function getMapScoreRating(score: number, total: number): { title: string; color: string } {
  const ratio = score / total;
  if (ratio === 1) return { title: 'MASTER CARTOGRAPHER', color: '#FBBF24' };
  if (ratio >= 0.8) return { title: 'MAP SPECIALIST', color: '#A855F7' };
  if (ratio >= 0.6) return { title: 'TOURIST', color: '#14B8A6' };
  if (ratio >= 0.4) return { title: 'LOST IN THE SMOKE', color: '#71717A' };
  return { title: 'WRONG TELEPORTER', color: '#EF4444' };
}

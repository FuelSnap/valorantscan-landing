// Landing page game data — derived from canonical source (features/data.ts)

import { AGENTS, MAPS, WEAPONS } from './features/data';

export { AGENTS, MAPS, WEAPONS };

// Counts
export const AGENT_COUNT = AGENTS.length;
export const MAP_COUNT = MAPS.length;

// Marquee: split agents into two balanced rows
export const MARQUEE_ROW1 = AGENTS.slice(0, Math.ceil(AGENTS.length / 2)).map(a => a.id);
export const MARQUEE_ROW2 = AGENTS.slice(Math.ceil(AGENTS.length / 2)).map(a => a.id);

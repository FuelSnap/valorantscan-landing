import type { 
  ClipSubmission, 
  COTWWeek, 
  AgentData, 
  MapData, 
  Strategy,
  Weapon,
  ValorantAgent,
  ValorantMap,
  CanvasElement,
  PremiumStatus 
} from './types';

// ============================================================================
// CANONICAL AGENT DATA — Single source of truth for the entire codebase.
// When Riot releases a new agent, add it HERE and everything auto-derives.
// ============================================================================
export const AGENTS: AgentData[] = [
  // Duelists
  { id: 'jett', name: 'Jett', role: 'Duelist', color: '#7DD3E5', uuid: 'add6443a-41bd-e414-f6ad-e58d267f4e95', hasPortrait: true, fact: 'A wind-wielding Korean duelist who dashes through danger.', abilities: [
    { id: 'jett-c', name: 'Cloudburst', key: 'C', type: 'smoke', color: '#7DD3E5' },
    { id: 'jett-q', name: 'Updraft', key: 'Q', type: 'movement', color: '#7DD3E5' },
    { id: 'jett-e', name: 'Tailwind', key: 'E', type: 'movement', color: '#7DD3E5' },
    { id: 'jett-x', name: 'Blade Storm', key: 'X', type: 'ultimate', color: '#7DD3E5' },
  ]},
  { id: 'phoenix', name: 'Phoenix', role: 'Duelist', color: '#FE8732', uuid: 'eb93336a-449b-9c1b-0a54-a891f7921d69', hasPortrait: true, fact: "London's firestarter who flashes in and heals himself.", abilities: [
    { id: 'phoenix-c', name: 'Blaze', key: 'C', type: 'wall', color: '#FE8732' },
    { id: 'phoenix-q', name: 'Curveball', key: 'Q', type: 'flash', color: '#FE8732' },
    { id: 'phoenix-e', name: 'Hot Hands', key: 'E', type: 'molly', color: '#FE8732' },
    { id: 'phoenix-x', name: 'Run It Back', key: 'X', type: 'ultimate', color: '#FE8732' },
  ]},
  { id: 'reyna', name: 'Reyna', role: 'Duelist', color: '#B54DCE', uuid: 'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc', hasPortrait: true, fact: 'The Mexican vampire — every kill fuels her next play.', abilities: [
    { id: 'reyna-c', name: 'Leer', key: 'C', type: 'flash', color: '#B54DCE' },
    { id: 'reyna-q', name: 'Devour', key: 'Q', type: 'heal', color: '#B54DCE' },
    { id: 'reyna-e', name: 'Dismiss', key: 'E', type: 'movement', color: '#B54DCE' },
    { id: 'reyna-x', name: 'Empress', key: 'X', type: 'ultimate', color: '#B54DCE' },
  ]},
  { id: 'raze', name: 'Raze', role: 'Duelist', color: '#F78440', uuid: 'f94c3b30-42be-e959-889c-5aa313dba261', hasPortrait: true, fact: 'Brazilian demolition expert. If it moves, she explodes it.', abilities: [
    { id: 'raze-c', name: 'Boom Bot', key: 'C', type: 'recon', color: '#F78440' },
    { id: 'raze-q', name: 'Blast Pack', key: 'Q', type: 'movement', color: '#F78440' },
    { id: 'raze-e', name: 'Paint Shells', key: 'E', type: 'damage', color: '#F78440' },
    { id: 'raze-x', name: 'Showstopper', key: 'X', type: 'ultimate', color: '#F78440' },
  ]},
  { id: 'yoru', name: 'Yoru', role: 'Duelist', color: '#325DAF', uuid: '7f94d92c-4234-0a36-9646-3a87eb8b5c89', hasPortrait: true, fact: 'Japanese dimension-rifter. Masters of deception fear him.', abilities: [
    { id: 'yoru-c', name: 'Fakeout', key: 'C', type: 'recon', color: '#325DAF' },
    { id: 'yoru-q', name: 'Blindside', key: 'Q', type: 'flash', color: '#325DAF' },
    { id: 'yoru-e', name: 'Gatecrash', key: 'E', type: 'movement', color: '#325DAF' },
    { id: 'yoru-x', name: 'Dimensional Drift', key: 'X', type: 'ultimate', color: '#325DAF' },
  ]},
  { id: 'neon', name: 'Neon', role: 'Duelist', color: '#4B59F7', uuid: 'bb2a4828-46eb-8cd1-e765-15848195d751', hasPortrait: true, fact: 'Filipino sprinter who channels bioelectric energy.', abilities: [
    { id: 'neon-c', name: 'Fast Lane', key: 'C', type: 'wall', color: '#4B59F7' },
    { id: 'neon-q', name: 'Relay Bolt', key: 'Q', type: 'damage', color: '#4B59F7' },
    { id: 'neon-e', name: 'High Gear', key: 'E', type: 'movement', color: '#4B59F7' },
    { id: 'neon-x', name: 'Overdrive', key: 'X', type: 'ultimate', color: '#4B59F7' },
  ]},
  { id: 'iso', name: 'Iso', role: 'Duelist', color: '#8B5CF6', uuid: '0e38b510-41a8-5780-5e8f-568b2a4f2d6c', hasPortrait: true, fact: 'Chinese hitman who duels enemies in another dimension.', abilities: [
    { id: 'iso-c', name: 'Undercut', key: 'C', type: 'damage', color: '#8B5CF6' },
    { id: 'iso-q', name: 'Double Tap', key: 'Q', type: 'damage', color: '#8B5CF6' },
    { id: 'iso-e', name: 'Contingency', key: 'E', type: 'wall', color: '#8B5CF6' },
    { id: 'iso-x', name: 'Kill Contract', key: 'X', type: 'ultimate', color: '#8B5CF6' },
  ]},
  { id: 'waylay', name: 'Waylay', role: 'Duelist', color: '#14B8A6', uuid: 'df1cb487-4902-002e-5c17-d28e83e78588', hasPortrait: false, fact: 'Deadly trapper who manipulates the battlefield from the shadows.', abilities: [
    { id: 'waylay-c', name: 'Shroud Step', key: 'C', type: 'movement', color: '#14B8A6' },
    { id: 'waylay-q', name: 'Dual Daggers', key: 'Q', type: 'damage', color: '#14B8A6' },
    { id: 'waylay-e', name: 'Shadow Shift', key: 'E', type: 'movement', color: '#14B8A6' },
    { id: 'waylay-x', name: 'Phantom Rush', key: 'X', type: 'ultimate', color: '#14B8A6' },
  ]},
  // Controllers
  { id: 'brimstone', name: 'Brimstone', role: 'Controller', color: '#F67D3C', uuid: '9f0d8ba9-4140-b941-57d3-a7ad57c6b417', hasPortrait: true, fact: 'American commander who calls in orbital strikes.', abilities: [
    { id: 'brim-c', name: 'Stim Beacon', key: 'C', type: 'damage', color: '#F67D3C' },
    { id: 'brim-q', name: 'Incendiary', key: 'Q', type: 'molly', color: '#F67D3C' },
    { id: 'brim-e', name: 'Sky Smoke', key: 'E', type: 'smoke', color: '#F67D3C' },
    { id: 'brim-x', name: 'Orbital Strike', key: 'X', type: 'ultimate', color: '#F67D3C' },
  ]},
  { id: 'viper', name: 'Viper', role: 'Controller', color: '#25D366', uuid: '707eab51-4836-f488-046a-cda6bf494859', hasPortrait: true, fact: 'Toxic chemist who controls the map with poison clouds.', abilities: [
    { id: 'viper-c', name: 'Snake Bite', key: 'C', type: 'molly', color: '#25D366' },
    { id: 'viper-q', name: 'Poison Cloud', key: 'Q', type: 'smoke', color: '#25D366' },
    { id: 'viper-e', name: 'Toxic Screen', key: 'E', type: 'wall', color: '#25D366' },
    { id: 'viper-x', name: 'Viper\'s Pit', key: 'X', type: 'ultimate', color: '#25D366' },
  ]},
  { id: 'omen', name: 'Omen', role: 'Controller', color: '#5A49C7', uuid: '8e253930-4c05-31dd-1b6c-968525494517', hasPortrait: true, fact: 'A phantom who teleports through shadows and paranoia.', abilities: [
    { id: 'omen-c', name: 'Shrouded Step', key: 'C', type: 'movement', color: '#5A49C7' },
    { id: 'omen-q', name: 'Paranoia', key: 'Q', type: 'flash', color: '#5A49C7' },
    { id: 'omen-e', name: 'Dark Cover', key: 'E', type: 'smoke', color: '#5A49C7' },
    { id: 'omen-x', name: 'From the Shadows', key: 'X', type: 'ultimate', color: '#5A49C7' },
  ]},
  { id: 'astra', name: 'Astra', role: 'Controller', color: '#9333EA', uuid: '41fb69c1-4189-7b37-f117-bcaf1e96f1bf', hasPortrait: true, fact: 'Ghanaian cosmic warrior who shapes the battlefield with stars.', abilities: [
    { id: 'astra-c', name: 'Gravity Well', key: 'C', type: 'damage', color: '#9333EA' },
    { id: 'astra-q', name: 'Nova Pulse', key: 'Q', type: 'damage', color: '#9333EA' },
    { id: 'astra-e', name: 'Nebula', key: 'E', type: 'smoke', color: '#9333EA' },
    { id: 'astra-x', name: 'Cosmic Divide', key: 'X', type: 'ultimate', color: '#9333EA' },
  ]},
  { id: 'harbor', name: 'Harbor', role: 'Controller', color: '#0EA5E9', uuid: '95b78ed7-4637-86d9-7e41-71ba8c293152', hasPortrait: true, fact: 'Indian agent who commands ancient water technology.', abilities: [
    { id: 'harbor-c', name: 'Cascade', key: 'C', type: 'wall', color: '#0EA5E9' },
    { id: 'harbor-q', name: 'Cove', key: 'Q', type: 'smoke', color: '#0EA5E9' },
    { id: 'harbor-e', name: 'High Tide', key: 'E', type: 'wall', color: '#0EA5E9' },
    { id: 'harbor-x', name: 'Reckoning', key: 'X', type: 'ultimate', color: '#0EA5E9' },
  ]},
  { id: 'clove', name: 'Clove', role: 'Controller', color: '#EC4899', uuid: '1dbf2edd-4729-0984-3115-daa5eed44993', hasPortrait: true, fact: 'Scottish immortal who cheats death itself.', abilities: [
    { id: 'clove-c', name: 'Pick-Me-Up', key: 'C', type: 'heal', color: '#EC4899' },
    { id: 'clove-q', name: 'Meddle', key: 'Q', type: 'damage', color: '#EC4899' },
    { id: 'clove-e', name: 'Ruse', key: 'E', type: 'smoke', color: '#EC4899' },
    { id: 'clove-x', name: 'Not Dead Yet', key: 'X', type: 'ultimate', color: '#EC4899' },
  ]},
  { id: 'miks', name: 'Miks', role: 'Controller', color: '#D4A843', uuid: '7c8a4701-4de6-9355-b254-e09bc2a34b72', hasPortrait: true, fact: 'Croatian sound master who rallies his squad with sonic energy.', abilities: [
    { id: 'miks-c', name: 'M-pulse', key: 'C', type: 'damage', color: '#D4A843' },
    { id: 'miks-q', name: 'Harmonize', key: 'Q', type: 'damage', color: '#D4A843' },
    { id: 'miks-e', name: 'Waveform', key: 'E', type: 'smoke', color: '#D4A843' },
    { id: 'miks-x', name: 'Bassquake', key: 'X', type: 'ultimate', color: '#D4A843' },
  ]},
  // Sentinels
  { id: 'sage', name: 'Sage', role: 'Sentinel', color: '#6EE7B7', uuid: '569fdd95-4d10-43ab-ca70-79becc718b46', hasPortrait: true, fact: 'Chinese healer — the only agent who can resurrect teammates.', abilities: [
    { id: 'sage-c', name: 'Barrier Orb', key: 'C', type: 'wall', color: '#6EE7B7' },
    { id: 'sage-q', name: 'Slow Orb', key: 'Q', type: 'damage', color: '#6EE7B7' },
    { id: 'sage-e', name: 'Healing Orb', key: 'E', type: 'heal', color: '#6EE7B7' },
    { id: 'sage-x', name: 'Resurrection', key: 'X', type: 'ultimate', color: '#6EE7B7' },
  ]},
  { id: 'cypher', name: 'Cypher', role: 'Sentinel', color: '#D4D4D8', uuid: '117ed9e3-49f3-6512-3ccf-0cada7e3823b', hasPortrait: true, fact: 'Moroccan spy who watches everything with tripwires and cameras.', abilities: [
    { id: 'cypher-c', name: 'Trapwire', key: 'C', type: 'trap', color: '#D4D4D8' },
    { id: 'cypher-q', name: 'Cyber Cage', key: 'Q', type: 'smoke', color: '#D4D4D8' },
    { id: 'cypher-e', name: 'Spycam', key: 'E', type: 'recon', color: '#D4D4D8' },
    { id: 'cypher-x', name: 'Neural Theft', key: 'X', type: 'ultimate', color: '#D4D4D8' },
  ]},
  { id: 'killjoy', name: 'Killjoy', role: 'Sentinel', color: '#FDE047', uuid: '1e58de9c-4950-5125-93e9-a0aee9f98746', hasPortrait: true, fact: 'German genius whose turrets and bots lock down sites.', abilities: [
    { id: 'kj-c', name: 'Nanoswarm', key: 'C', type: 'molly', color: '#FDE047' },
    { id: 'kj-q', name: 'Alarmbot', key: 'Q', type: 'trap', color: '#FDE047' },
    { id: 'kj-e', name: 'Turret', key: 'E', type: 'trap', color: '#FDE047' },
    { id: 'kj-x', name: 'Lockdown', key: 'X', type: 'ultimate', color: '#FDE047' },
  ]},
  { id: 'chamber', name: 'Chamber', role: 'Sentinel', color: '#FBBF24', uuid: '22697a3d-45bf-8dd7-4fec-84a9e28c69d7', hasPortrait: true, fact: 'French weapons designer with a custom arsenal.', abilities: [
    { id: 'chamber-c', name: 'Trademark', key: 'C', type: 'trap', color: '#FBBF24' },
    { id: 'chamber-q', name: 'Headhunter', key: 'Q', type: 'damage', color: '#FBBF24' },
    { id: 'chamber-e', name: 'Rendezvous', key: 'E', type: 'movement', color: '#FBBF24' },
    { id: 'chamber-x', name: 'Tour De Force', key: 'X', type: 'ultimate', color: '#FBBF24' },
  ]},
  { id: 'deadlock', name: 'Deadlock', role: 'Sentinel', color: '#94A3B8', uuid: 'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235', hasPortrait: true, fact: 'Norwegian operative who deploys nanowire traps.', abilities: [
    { id: 'deadlock-c', name: 'GravNet', key: 'C', type: 'trap', color: '#94A3B8' },
    { id: 'deadlock-q', name: 'Sonic Sensor', key: 'Q', type: 'trap', color: '#94A3B8' },
    { id: 'deadlock-e', name: 'Barrier Mesh', key: 'E', type: 'wall', color: '#94A3B8' },
    { id: 'deadlock-x', name: 'Annihilation', key: 'X', type: 'ultimate', color: '#94A3B8' },
  ]},
  { id: 'vyse', name: 'Vyse', role: 'Sentinel', color: '#C084FC', uuid: 'efba5359-4016-a1e5-7626-b1ae76895940', hasPortrait: true, fact: 'A sentinel who bends metal to defend her team.', abilities: [
    { id: 'vyse-c', name: 'Shear', key: 'C', type: 'wall', color: '#C084FC' },
    { id: 'vyse-q', name: 'Arc Rose', key: 'Q', type: 'trap', color: '#C084FC' },
    { id: 'vyse-e', name: 'Razorvine', key: 'E', type: 'wall', color: '#C084FC' },
    { id: 'vyse-x', name: 'Steel Garden', key: 'X', type: 'ultimate', color: '#C084FC' },
  ]},
  { id: 'veto', name: 'Veto', role: 'Sentinel', color: '#3B82F6', uuid: '92eeef5d-43b5-1d4a-8d03-b3927a09034b', hasPortrait: false, fact: 'Signal disruptor who jams enemy tech.', abilities: [
    { id: 'veto-c', name: 'Nano Swarm', key: 'C', type: 'trap', color: '#3B82F6' },
    { id: 'veto-q', name: 'Relay Bolt', key: 'Q', type: 'recon', color: '#3B82F6' },
    { id: 'veto-e', name: 'Curtain Call', key: 'E', type: 'wall', color: '#3B82F6' },
    { id: 'veto-x', name: 'Override', key: 'X', type: 'ultimate', color: '#3B82F6' },
  ]},
  // Initiators
  { id: 'sova', name: 'Sova', role: 'Initiator', color: '#3B82F6', uuid: '320b2a48-4d9b-a075-30f1-1f93a9b638fa', hasPortrait: true, fact: 'Russian hunter who tracks enemies with recon bolts.', abilities: [
    { id: 'sova-c', name: 'Owl Drone', key: 'C', type: 'recon', color: '#3B82F6' },
    { id: 'sova-q', name: 'Shock Bolt', key: 'Q', type: 'damage', color: '#3B82F6' },
    { id: 'sova-e', name: 'Recon Bolt', key: 'E', type: 'recon', color: '#3B82F6' },
    { id: 'sova-x', name: 'Hunter\'s Fury', key: 'X', type: 'ultimate', color: '#3B82F6' },
  ]},
  { id: 'breach', name: 'Breach', role: 'Initiator', color: '#F97316', uuid: '5f8d3a7f-467b-97f3-062c-13acf203c006', hasPortrait: true, fact: 'Swedish brawler who punches abilities through walls.', abilities: [
    { id: 'breach-c', name: 'Aftershock', key: 'C', type: 'damage', color: '#F97316' },
    { id: 'breach-q', name: 'Flashpoint', key: 'Q', type: 'flash', color: '#F97316' },
    { id: 'breach-e', name: 'Fault Line', key: 'E', type: 'damage', color: '#F97316' },
    { id: 'breach-x', name: 'Rolling Thunder', key: 'X', type: 'ultimate', color: '#F97316' },
  ]},
  { id: 'skye', name: 'Skye', role: 'Initiator', color: '#22C55E', uuid: '6f2a04ca-43e0-be17-7f36-b3908627744d', hasPortrait: true, fact: 'Australian guide who commands mystical predators.', abilities: [
    { id: 'skye-c', name: 'Regrowth', key: 'C', type: 'heal', color: '#22C55E' },
    { id: 'skye-q', name: 'Trailblazer', key: 'Q', type: 'recon', color: '#22C55E' },
    { id: 'skye-e', name: 'Guiding Light', key: 'E', type: 'flash', color: '#22C55E' },
    { id: 'skye-x', name: 'Seekers', key: 'X', type: 'ultimate', color: '#22C55E' },
  ]},
  { id: 'kayo', name: 'KAY/O', role: 'Initiator', color: '#6B7280', uuid: '601dbbe7-43ce-be57-2a40-4abd24953621', hasPortrait: true, fact: 'A war machine built to suppress radiants.', abilities: [
    { id: 'kayo-c', name: 'FRAG/MENT', key: 'C', type: 'molly', color: '#6B7280' },
    { id: 'kayo-q', name: 'FLASH/DRIVE', key: 'Q', type: 'flash', color: '#6B7280' },
    { id: 'kayo-e', name: 'ZERO/POINT', key: 'E', type: 'recon', color: '#6B7280' },
    { id: 'kayo-x', name: 'NULL/CMD', key: 'X', type: 'ultimate', color: '#6B7280' },
  ]},
  { id: 'fade', name: 'Fade', role: 'Initiator', color: '#0D9488', uuid: 'dade69b4-4f5a-8528-247b-219e5a1facd6', hasPortrait: true, fact: "Turkish nightmare who reveals enemies' deepest fears.", abilities: [
    { id: 'fade-c', name: 'Prowler', key: 'C', type: 'recon', color: '#0D9488' },
    { id: 'fade-q', name: 'Seize', key: 'Q', type: 'damage', color: '#0D9488' },
    { id: 'fade-e', name: 'Haunt', key: 'E', type: 'recon', color: '#0D9488' },
    { id: 'fade-x', name: 'Nightfall', key: 'X', type: 'ultimate', color: '#0D9488' },
  ]},
  { id: 'gekko', name: 'Gekko', role: 'Initiator', color: '#84CC16', uuid: 'e370fa57-4757-3604-3648-499e1f642d3f', hasPortrait: true, fact: 'LA native whose crew of creatures does the dirty work.', abilities: [
    { id: 'gekko-c', name: 'Mosh Pit', key: 'C', type: 'molly', color: '#84CC16' },
    { id: 'gekko-q', name: 'Wingman', key: 'Q', type: 'recon', color: '#84CC16' },
    { id: 'gekko-e', name: 'Dizzy', key: 'E', type: 'flash', color: '#84CC16' },
    { id: 'gekko-x', name: 'Thrash', key: 'X', type: 'ultimate', color: '#84CC16' },
  ]},
  { id: 'tejo', name: 'Tejo', role: 'Initiator', color: '#C2410C', uuid: 'b444168c-4e35-8076-db47-ef9bf368f384', hasPortrait: true, fact: 'Colombian tactician with explosive precision.', abilities: [
    { id: 'tejo-c', name: 'Stealth Drone', key: 'C', type: 'recon', color: '#C2410C' },
    { id: 'tejo-q', name: 'Guided Salvo', key: 'Q', type: 'damage', color: '#C2410C' },
    { id: 'tejo-e', name: 'Special Delivery', key: 'E', type: 'damage', color: '#C2410C' },
    { id: 'tejo-x', name: 'Armageddon', key: 'X', type: 'ultimate', color: '#C2410C' },
  ]},
];

// ============================================================================
// CANONICAL MAP DATA — Single source of truth for the entire codebase.
// When Riot releases a new map, add it HERE and everything auto-derives.
// ============================================================================
export const MAPS: MapData[] = [
  { id: 'ascent', name: 'Ascent', sites: ['A', 'B'], imageUrl: '/maps/ascent.webp', minimapUrl: '/maps/ascent-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#4CAF50' },
  { id: 'bind', name: 'Bind', sites: ['A', 'B'], imageUrl: '/maps/bind.webp', minimapUrl: '/maps/bind-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#FF9800' },
  { id: 'haven', name: 'Haven', sites: ['A', 'B', 'C'], imageUrl: '/maps/haven.webp', minimapUrl: '/maps/haven-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#9C27B0' },
  { id: 'split', name: 'Split', sites: ['A', 'B'], imageUrl: '/maps/split.webp', minimapUrl: '/maps/split-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#F44336' },
  { id: 'icebox', name: 'Icebox', sites: ['A', 'B'], imageUrl: '/maps/icebox.webp', minimapUrl: '/maps/icebox-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#00BCD4' },
  { id: 'breeze', name: 'Breeze', sites: ['A', 'B'], imageUrl: '/maps/breeze.webp', minimapUrl: '/maps/breeze-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#03A9F4' },
  { id: 'fracture', name: 'Fracture', sites: ['A', 'B'], imageUrl: '/maps/fracture.webp', minimapUrl: '/maps/fracture-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#795548' },
  { id: 'pearl', name: 'Pearl', sites: ['A', 'B'], imageUrl: '/maps/pearl.webp', minimapUrl: '/maps/pearl-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#E91E63' },
  { id: 'lotus', name: 'Lotus', sites: ['A', 'B', 'C'], imageUrl: '/maps/lotus.webp', minimapUrl: '/maps/lotus-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#8BC34A' },
  { id: 'sunset', name: 'Sunset', sites: ['A', 'B'], imageUrl: '/maps/sunset.webp', minimapUrl: '/maps/sunset-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#FF5722' },
  { id: 'abyss', name: 'Abyss', sites: ['A', 'B'], imageUrl: '/maps/abyss.webp', minimapUrl: '/maps/abyss-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#673AB7' },
  { id: 'corrode', name: 'Corrode', sites: ['A', 'B'], imageUrl: '/maps/corrode.webp', minimapUrl: '/maps/corrode-mini.webp', callouts: [], dimensions: { width: 1024, height: 1024 }, mapColor: '#607D8B' },
];

// Weapons Data
export const WEAPONS: Weapon[] = [
  // Sidearms
  { id: 'classic', name: 'Classic', category: 'sidearm', cost: 0 },
  { id: 'shorty', name: 'Shorty', category: 'sidearm', cost: 150 },
  { id: 'frenzy', name: 'Frenzy', category: 'sidearm', cost: 450 },
  { id: 'ghost', name: 'Ghost', category: 'sidearm', cost: 500 },
  { id: 'sheriff', name: 'Sheriff', category: 'sidearm', cost: 800 },
  // SMGs
  { id: 'stinger', name: 'Stinger', category: 'smg', cost: 950 },
  { id: 'spectre', name: 'Spectre', category: 'smg', cost: 1600 },
  // Shotguns
  { id: 'bucky', name: 'Bucky', category: 'shotgun', cost: 850 },
  { id: 'judge', name: 'Judge', category: 'shotgun', cost: 1850 },
  // Rifles
  { id: 'bulldog', name: 'Bulldog', category: 'rifle', cost: 2050 },
  { id: 'guardian', name: 'Guardian', category: 'rifle', cost: 2250 },
  { id: 'phantom', name: 'Phantom', category: 'rifle', cost: 2900 },
  { id: 'vandal', name: 'Vandal', category: 'rifle', cost: 2900 },
  // Snipers
  { id: 'marshal', name: 'Marshal', category: 'sniper', cost: 950 },
  { id: 'outlaw', name: 'Outlaw', category: 'sniper', cost: 2400 },
  { id: 'operator', name: 'Operator', category: 'sniper', cost: 4700 },
  // Machine Guns
  { id: 'ares', name: 'Ares', category: 'machine-gun', cost: 1600 },
  { id: 'odin', name: 'Odin', category: 'machine-gun', cost: 3200 },
  // Melee
  { id: 'knife', name: 'Tactical Knife', category: 'melee', cost: 0 },
];

// Generate demo COTW clips
const clipTypes: ClipSubmission['clipType'][] = ['ace', 'clutch', 'highlight', 'funny', 'wallbang', 'lineup', 'collateral'];
const ranks = ['Iron 2', 'Bronze 3', 'Silver 2', 'Gold 1', 'Platinum 3', 'Diamond 2', 'Ascendant 1', 'Immortal 2', 'Radiant'];
const mapNames = MAPS.map(m => m.name);
const agentNames = AGENTS.map(a => a.name);

// Real YouTube Valorant clips for embed previews
const YOUTUBE_CLIPS: { videoId: string; title: string; clipType: ClipSubmission['clipType']; agent: string; map: string }[] = [
  { videoId: 'b1kVZ4mKmtM', title: 'Crashies Iconic Zipline Ace', clipType: 'ace', agent: 'Sova', map: 'Split' },
  { videoId: 'A79N1p6xNDo', title: 'yay Ace vs Guard', clipType: 'ace', agent: 'Chamber', map: 'Haven' },
  { videoId: 'RnulPqFv0VM', title: 'yay Ace vs LOUD', clipType: 'ace', agent: 'Chamber', map: 'Bind' },
  { videoId: 'jnplVMIntP0', title: 'nAts Ace on Bind', clipType: 'ace', agent: 'Viper', map: 'Bind' },
  { videoId: 'PESDHAbpRMI', title: 'Laz Operator Ace - Champs 2022', clipType: 'ace', agent: 'Chamber', map: 'Pearl' },
  { videoId: 'pLaBzx0FhYg', title: 'B0i Most Iconic Ace on Ascent', clipType: 'ace', agent: 'Jett', map: 'Ascent' },
  { videoId: 'ye5R90LmZHE', title: 'nukkye Insane ACE with Raze Movement', clipType: 'ace', agent: 'Raze', map: 'Breeze' },
  { videoId: 'EELTyU1jkI4', title: 'Crashies Frenzy Ace vs LOUD', clipType: 'ace', agent: 'Sova', map: 'Fracture' },
  { videoId: '67YaPTOTX_I', title: 'sScary Impossible 1v4 Ace', clipType: 'ace', agent: 'Jett', map: 'Ascent' },
  { videoId: '2dSXNrzeUcE', title: 'Ardiis 1HP 1v3 Overtime vs DRX', clipType: 'clutch', agent: 'Jett', map: 'Ascent' },
  { videoId: 'NyCnTFYIUy8', title: 'Hiko Iconic 1v3 Clutch', clipType: 'clutch', agent: 'Sova', map: 'Haven' },
  { videoId: 'EepAHWLX0_Q', title: 'Alfajer Insane 1v2 Clutch', clipType: 'clutch', agent: 'Raze', map: 'Lotus' },
  { videoId: 'g5MPtKYQNq0', title: 'Saadhak 1v5 Clutch vs NRG', clipType: 'clutch', agent: 'Sage', map: 'Split' },
  { videoId: 'd3LyOc_RKoo', title: 'Pancada 1v3 Sheriff Clutch', clipType: 'clutch', agent: 'Omen', map: 'Icebox' },
  { videoId: 'XzNI4EMFFwU', title: 'Demon1 Double Flick at Masters Tokyo', clipType: 'highlight', agent: 'Neon', map: 'Lotus' },
  { videoId: 'tpdJQSF5lGg', title: 'Demon1 Crazy 3K vs FNATIC', clipType: 'highlight', agent: 'Neon', map: 'Lotus' },
  { videoId: '9D-YAHacQKI', title: 'Suygetsu Grand Final Winning 4K', clipType: 'highlight', agent: 'Viper', map: 'Split' },
  { videoId: 'wo14k2l3ZR4', title: 'Enzo Insane 1v3 Clutch vs LEV', clipType: 'clutch', agent: 'Raze', map: 'Icebox' },
  { videoId: 'XVokoZ0arG8', title: 'Zombs Clutch on Breeze with Classic', clipType: 'clutch', agent: 'Astra', map: 'Breeze' },
  { videoId: 'NtaNa-qVoZg', title: 'yay Another Ace on Bind', clipType: 'ace', agent: 'Chamber', map: 'Bind' },
  { videoId: 'Ch_leAaYK0U', title: 'Stax Out of This World 3K in OT', clipType: 'clutch', agent: 'Killjoy', map: 'Haven' },
  { videoId: '4BtXv6Sr5mg', title: 'Jinggg Insane 4K vs DRX', clipType: 'highlight', agent: 'Raze', map: 'Lotus' },
  { videoId: 'CE7y42JGgF8', title: 'Shao Best Player in the World', clipType: 'highlight', agent: 'Fade', map: 'Pearl' },
  { videoId: 'ga1C02Z-9Mc', title: 'f0rsakeN Insane Yoru Play vs FNC', clipType: 'highlight', agent: 'Yoru', map: 'Bind' },
  { videoId: 'gFEx5r1xxc4', title: 'Aspas Saves LOUD on Breeze', clipType: 'clutch', agent: 'Jett', map: 'Breeze' },
  { videoId: 'Ja-_EYG9nMI', title: 'Pancada 1v3 Clutch vs OpTic', clipType: 'clutch', agent: 'Omen', map: 'Fracture' },
  { videoId: 'ek8ErxPkh0g', title: 'Insane Round Leviatan vs XSET', clipType: 'highlight', agent: 'Chamber', map: 'Ascent' },
  { videoId: 'kY61_L5_9os', title: 'Ardiis 1v3 Clutch vs DRX', clipType: 'clutch', agent: 'Jett', map: 'Haven' },
  { videoId: 'uP3T_RH8IPM', title: 'kiNgg 3K Clutch on Last Round', clipType: 'clutch', agent: 'Raze', map: 'Split' },
  { videoId: '3uHYuZ_CNZk', title: 'Marved Anti-ECO 4K vs DRX', clipType: 'highlight', agent: 'Brimstone', map: 'Pearl' },
];

function generateClipTitle(clipType: ClipSubmission['clipType'], agent: string): string {
  const titles: Record<ClipSubmission['clipType'], string[]> = {
    ace: [`${agent} ACE in Ranked`, `Clean 5K with ${agent}`, `ACE Clutch! ${agent} Carry`],
    clutch: [`1v5 Clutch! Unbelievable!`, `${agent} 1v4 to save the game`, `Insane 1v3 Clutch Victory`],
    highlight: [`${agent} Highlight Reel`, `Best ${agent} Plays of the Week`, `Nutty ${agent} Moment`],
    funny: [`${agent} Fail Compilation`, `When ${agent} Goes Wrong`, `Funniest ${agent} Moment`],
    wallbang: [`INSANE Wallbang with ${agent}`, `Through the Wall Kill`, `Prediction Wallbang`],
    lineup: [`${agent} Lineup Guide`, `Post-Plant Lineup`, `Perfect ${agent} Setup`],
    collateral: [`Double Kill One Bullet`, `Collateral Headshot`, `2 Birds 1 Stone`],
  };
  return titles[clipType][Math.floor(Math.random() * titles[clipType].length)];
}

export function generateDemoClips(week: number, count: number = 20): ClipSubmission[] {
  const clips: ClipSubmission[] = [];
  // Seeded RNG for deterministic results per week
  const seed = week * 31;
  const seededRand = (i: number) => {
    const x = Math.sin(seed + i * 9973) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    // Assign a real YouTube clip deterministically
    const ytIdx = (seed + i * 7) % YOUTUBE_CLIPS.length;
    const ytClip = YOUTUBE_CLIPS[ytIdx];

    // Use the YouTube clip's metadata when available, fallback to random
    const clipType = i < YOUTUBE_CLIPS.length ? ytClip.clipType : clipTypes[Math.floor(seededRand(i) * clipTypes.length)];
    const agent = i < YOUTUBE_CLIPS.length ? ytClip.agent : agentNames[Math.floor(seededRand(i + 100) * agentNames.length)];
    const map = i < YOUTUBE_CLIPS.length ? ytClip.map : mapNames[Math.floor(seededRand(i + 200) * mapNames.length)];
    const rank = ranks[Math.floor(seededRand(i + 300) * ranks.length)];
    const title = i < YOUTUBE_CLIPS.length ? ytClip.title : generateClipTitle(clipType, agent);

    const daysAgo = Math.floor(seededRand(i + 400) * 7);
    const submittedAt = new Date();
    submittedAt.setDate(submittedAt.getDate() - daysAgo);

    // Pro player names for clips with real videos
    const proNames = ['TenZ', 'yay', 'Demon1', 'Aspas', 'Crashies', 'nAts', 'Derke', 'Chronicle', 'Marved', 'SicK',
      'ShahZaM', 'Hiko', 'Keznit', 'Laz', 'Heat', 'Saadhak', 'Pancada', 'Ardiis', 'Alfajer', 'Zombs'];
    const gameName = i < YOUTUBE_CLIPS.length ? proNames[ytIdx % proNames.length] : `Player${100 + i}`;

    clips.push({
      id: `clip-${week}-${i}`,
      title,
      description: `Watch this insane ${clipType} on ${map} playing as ${agent}!`,
      videoUrl: i < YOUTUBE_CLIPS.length
        ? `https://www.youtube.com/watch?v=${ytClip.videoId}`
        : `https://example.com/clips/clip-${week}-${i}.mp4`,
      thumbnailUrl: i < YOUTUBE_CLIPS.length
        ? `https://img.youtube.com/vi/${ytClip.videoId}/maxresdefault.jpg`
        : `/api/placeholder/640/360`,
      submittedBy: {
        id: `user-${i}`,
        gameName,
        tagLine: `${1000 + Math.floor(seededRand(i + 500) * 9000)}`,
        rank,
      },
      submittedAt: submittedAt.toISOString(),
      week,
      year: 2025,
      votes: Math.floor(seededRand(i + 600) * 500) + 10,
      views: Math.floor(seededRand(i + 700) * 5000) + 100,
      agent,
      map,
      clipType,
      hasVoted: false,
      isWinner: i === 0 && week < getCurrentWeek(),
      placement: i < 10 ? i + 1 : undefined,
    });
  }

  return clips.sort((a, b) => b.votes - a.votes);
}

export function getCurrentWeek(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

export function generateCOTWWeeks(count: number = 10): COTWWeek[] {
  const weeks: COTWWeek[] = [];
  const currentWeek = getCurrentWeek();
  
  for (let i = 0; i < count; i++) {
    const weekNum = currentWeek - i;
    const startDate = new Date(2025, 0, 1 + (weekNum - 1) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    weeks.push({
      week: weekNum,
      year: 2025,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: i === 0 ? 'active' : 'closed',
      totalSubmissions: Math.floor(Math.random() * 100) + 20,
      totalVotes: Math.floor(Math.random() * 5000) + 500,
      prize: {
        amount: 50,
        currency: 'USD',
        description: '$50 Valorant Points + Featured on Homepage',
      },
    });
  }
  
  return weeks;
}

// Generate demo strategies
export function generateDemoStrategies(count: number = 10): Strategy[] {
  const strategies: Strategy[] = [];
  const sides: ('attack' | 'defense')[] = ['attack', 'defense'];
  const stratNames = [
    'A Site Execute', 'B Site Rush', 'Mid Control', 'Default Setup',
    'Fast A', 'Slow B', 'Split Push', 'Lurk Heavy', 'Eco Round',
    'Anti-Eco', 'Retake Setup', 'Post Plant', 'Fake A Go B'
  ];
  
  for (let i = 0; i < count; i++) {
    const map = MAPS[Math.floor(Math.random() * MAPS.length)];
    const side = sides[Math.floor(Math.random() * 2)];
    const selectedAgents: ValorantAgent[] = [];
    
    // Pick 5 random agents
    const shuffled = [...AGENTS].sort(() => Math.random() - 0.5);
    for (let j = 0; j < 5; j++) {
      selectedAgents.push(shuffled[j].name);
    }
    
    // Generate some elements
    const elements: CanvasElement[] = selectedAgents.map((agent, idx) => ({
      id: `agent-${idx}`,
      type: 'agent' as const,
      x: 200 + Math.random() * 400,
      y: 200 + Math.random() * 400,
      data: { agent, number: (idx + 1) as 1 | 2 | 3 | 4 | 5 },
    }));
    
    strategies.push({
      id: `strat-${i}`,
      name: stratNames[Math.floor(Math.random() * stratNames.length)],
      description: `A ${side} strategy for ${map.name} featuring coordinated utility usage.`,
      map: map.name,
      side,
      agents: selectedAgents,
      elements,
      createdBy: {
        id: `user-${i}`,
        gameName: `Strategist${100 + i}`,
      },
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: true,
      likes: Math.floor(Math.random() * 200),
      views: Math.floor(Math.random() * 2000),
      tags: [side, map.name.toLowerCase(), 'competitive'],
    });
  }
  
  return strategies;
}

// Demo Premium Status
export function getDemoPremiumStatus(isPremium: boolean = false): PremiumStatus {
  if (isPremium) {
    return {
      isPremium: true,
      tier: 'premium',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      features: {
        cotwVoting: true,
        cotwSubmissions: 1,
        strategySaves: 25,
        strategyExports: true,
        challengeMode: true,
        adFree: true,
        prioritySupport: false,
      },
    };
  }

  return {
    isPremium: false,
    tier: 'free',
    features: {
      cotwVoting: false,
      cotwSubmissions: 0,
      strategySaves: 3,
      strategyExports: false,
      challengeMode: false,
      adFree: false,
      prioritySupport: false,
    },
  };
}

export function getAgentByName(name: ValorantAgent): AgentData | undefined {
  return AGENTS.find(a => a.name === name);
}

export function getMapByName(name: ValorantMap): MapData | undefined {
  return MAPS.find(m => m.name === name);
}

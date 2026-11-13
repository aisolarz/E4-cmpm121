// the enemy types a wave can spawn
export type EnemyKind = "drone" | "dart" | "turret" | "lancer";

/**
 * line:   all at once, side by side
 * vee:    the middle enemy first, the outer ones a little later
 * column: one after another, straight down one lane
 * pincer: lancers entering from both sides, two per row
 */
export type Formation = "line" | "vee" | "column" | "pincer";

export interface EnemyStats {
  hp: number;
  score: number;
  radius: number;
  dropChance: number;
  canShoot: boolean;
}

export interface Wave {
  kind: EnemyKind;
  count: number;
  formation: Formation;
  // tick, counted from the start of the sector, when the wave begins
  start: number;
  // center of a line or vee, or the lane of a column. Defaults to 240
  x?: number;
}

export interface Sector {
  name: string;
  subtitle: string;
  // ticks before the next sector can begin
  length: number;
  waves: Wave[];
}

export const ENEMY_STATS: Record<EnemyKind, EnemyStats> = {
  drone: { hp: 2, score: 100, radius: 13, dropChance: 0.015, canShoot: true },
  dart: { hp: 1, score: 150, radius: 12, dropChance: 0.015, canShoot: false },
  turret: { hp: 12, score: 400, radius: 19, dropChance: 0.3, canShoot: true },
  lancer: { hp: 4, score: 250, radius: 15, dropChance: 0.06, canShoot: true },
};

// the route. the Warden always comes after the last sector in this list
export const SECTORS: Sector[] = [
  {
    name: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      { kind: "drone", count: 4, formation: "line", start: 60 },
      { kind: "drone", count: 5, formation: "vee", start: 360, x: 168 },
      { kind: "drone", count: 5, formation: "vee", start: 660, x: 312 },
      { kind: "drone", count: 6, formation: "line", start: 960 },
      { kind: "drone", count: 4, formation: "column", start: 1200, x: 120 },
      { kind: "drone", count: 4, formation: "column", start: 1260, x: 360 },
    ],
  },
  {
    name: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      { kind: "drone", count: 6, formation: "vee", start: 60 },
      { kind: "dart", count: 4, formation: "line", start: 300 },
      { kind: "dart", count: 5, formation: "column", start: 600, x: 144 },
      { kind: "dart", count: 5, formation: "column", start: 720, x: 336 },
      { kind: "drone", count: 7, formation: "line", start: 1020 },
      { kind: "dart", count: 5, formation: "vee", start: 1140 },
      { kind: "dart", count: 6, formation: "line", start: 1440 },
    ],
  },
  {
    name: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      { kind: "turret", count: 1, formation: "line", start: 60 },
      { kind: "drone", count: 6, formation: "vee", start: 240 },
      { kind: "turret", count: 2, formation: "line", start: 540 },
      { kind: "dart", count: 6, formation: "column", start: 840, x: 240 },
      { kind: "turret", count: 2, formation: "line", start: 1080 },
      { kind: "drone", count: 6, formation: "line", start: 1140 },
      { kind: "turret", count: 3, formation: "line", start: 1500 },
    ],
  },
  {
    name: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      { kind: "lancer", count: 4, formation: "pincer", start: 60 },
      { kind: "dart", count: 6, formation: "vee", start: 360 },
      { kind: "lancer", count: 6, formation: "pincer", start: 600 },
      { kind: "turret", count: 2, formation: "line", start: 780 },
      { kind: "lancer", count: 6, formation: "pincer", start: 1140 },
      { kind: "drone", count: 8, formation: "vee", start: 1260 },
      { kind: "dart", count: 8, formation: "line", start: 1560 },
    ],
  },
  {
    name: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      { kind: "turret", count: 3, formation: "line", start: 60 },
      { kind: "lancer", count: 6, formation: "pincer", start: 180 },
      { kind: "dart", count: 6, formation: "column", start: 540, x: 120 },
      { kind: "dart", count: 6, formation: "column", start: 540, x: 360 },
      { kind: "drone", count: 9, formation: "vee", start: 900 },
      { kind: "turret", count: 2, formation: "line", start: 1020 },
      { kind: "lancer", count: 8, formation: "pincer", start: 1320 },
      { kind: "dart", count: 8, formation: "vee", start: 1560 },
    ],
  },
];

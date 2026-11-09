// Decides if a commit is due now. Hourly cron calls this; all runs on the same
// day/week reach the same decision (seeded by date), so it is stable and retry-safe.
import { readFileSync, existsSync, appendFileSync } from 'node:fs';

const LOG = '.activity/health.log';
const now = new Date();
const today = now.toISOString().slice(0, 10);

function rng(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), (h = (h << 13) | (h >>> 19));
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

// Monday-based week key
const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
const dow = (d.getUTCDay() + 6) % 7; // Mon=0
const monday = new Date(d - dow * 864e5).toISOString().slice(0, 10);

const r = rng('week-' + monday);
const days = [0, 1, 2, 3, 4, 5, 6];
// skip 2 random days per week -> 5 active days
for (let i = 0; i < 2; i++) days.splice(Math.floor(r() * days.length), 1);

const hourRng = rng('day-' + today);
const hour = 7 + Math.floor(hourRng() * 15); // random hour 07-21 UTC

const already = existsSync(LOG) && readFileSync(LOG, 'utf8').includes(today);
const run = days.includes(dow) && now.getUTCHours() >= hour && !already;
console.log(`today=${today} active=${days.includes(dow)} hour=${hour} already=${already} run=${run}`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `run=${run}\n`);

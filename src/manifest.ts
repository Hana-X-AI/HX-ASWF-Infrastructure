import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));

export type Manifest = Record<string, string>;

export function readManifest(root: string = ROOT): Manifest {
  const raw = readFileSync(resolve(root, '.factory.yaml'), 'utf8');
  const out: Manifest = {};
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf(':');
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    const value = t.slice(i + 1).trim();
    out[key] = value;
  }
  return out;
}

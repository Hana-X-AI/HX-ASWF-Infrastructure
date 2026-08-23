#!/usr/bin/env node
// Read receipt. Records that a technology's knowledge pack was read.
// Usage:
//   node governance/hooks/read-receipt.mjs <technology> --pack <path> [--pack <path> ...] [--reader <name>]
//
// The receipt is append-only evidence in `evidence/read-receipts/`.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { homedir } from 'node:os';

function expandPath(p) {
  if (p === '~') return homedir();
  if (p.startsWith('~/')) return resolve(homedir(), p.slice(2));
  return p;
}

function main() {
  const args = process.argv.slice(2);
  const technology = args[0];
  if (!technology) {
    console.error('usage: read-receipt.mjs <technology> --pack <path> [--reader <name>] [--blockers <b>] [--assumptions <a>]');
    process.exit(2);
  }

  const packs = [];
  const blockers = [];
  const assumptions = [];
  let reader = process.env.HX_AGENT ?? 'agent';
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--pack') packs.push(args[++i]);
    else if (args[i] === '--reader') reader = args[++i];
    else if (args[i] === '--blockers') blockers.push(args[++i]);
    else if (args[i] === '--assumptions') assumptions.push(args[++i]);
  }

  if (packs.length === 0) {
    console.error('no --pack given');
    process.exit(2);
  }

  const outDir = resolve(process.env.RECEIPTS_DIR ?? 'evidence/read-receipts');
  mkdirSync(outDir, { recursive: true });

  const receipt = {
    technology,
    reader,
    read_at: new Date().toISOString(),
    status: 'read',
    preflight: { blockers, assumptions },
    packs: packs.map((p) => {
      const abs = isAbsolute(p) ? p : expandPath(p);
      const entry = { path: abs };
      if (existsSync(abs)) {
        const buf = readFileSync(abs);
        entry.sha256 = createHash('sha256').update(buf).digest('hex');
        entry.size = buf.length;
        entry.mtime_ms = statSync(abs).mtimeMs;
      } else {
        entry.missing = true;
      }
      return entry;
    })
  };

  const outPath = resolve(outDir, `${technology}.json`);
  writeFileSync(outPath, JSON.stringify(receipt, null, 2) + '\n');
  console.log(`read receipt recorded: ${outPath}`);
}

main();

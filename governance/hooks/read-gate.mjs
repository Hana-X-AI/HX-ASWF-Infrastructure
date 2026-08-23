#!/usr/bin/env node
// Read gate. Decides whether a technology-scoped path may be edited.
// A path may be edited only when a current read receipt exists for the
// technology that owns it. "No knowledge review, no execution."
//
// This module is imported by factory-guard.mjs and by the tests.

import { readFileSync, existsSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { homedir } from 'node:os';

export function expandPath(p) {
  if (p === '~') return homedir();
  if (p.startsWith('~/')) return resolve(homedir(), p.slice(2));
  return p;
}

// Convert a path glob to a regex. Same rules as factory-guard.mjs.
export function globToRegex(pattern) {
  let re = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '*') {
      if (pattern[i + 1] === '*') {
        re += '.*';
        i += 1;
        if (pattern[i + 1] === '/') i += 1;
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else if ('\\.[]{}()+-^$|'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

export function matches(path, patterns) {
  for (const p of patterns) {
    if (globToRegex(p).test(path)) return true;
  }
  return false;
}

// relPath — repo-relative path being edited (forward slashes).
// config — parsed read-gate.json.
// repoRoot — absolute repo root.
// Returns { ok, technology?, reason? }.
export function checkReadGate(relPath, config, repoRoot) {
  const technologies = config?.technologies ?? {};
  for (const [technology, def] of Object.entries(technologies)) {
    const paths = def?.paths ?? [];
    if (paths.length === 0) continue;
    if (!matches(relPath, paths)) continue;

    const receiptsDir = resolve(repoRoot, config?.receipts_dir ?? 'evidence/read-receipts');
    const receiptPath = resolve(receiptsDir, `${technology}.json`);
    if (!existsSync(receiptPath)) {
      return { ok: false, technology, reason: `no read receipt for ${technology}` };
    }

    let receipt;
    try {
      receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
    } catch {
      return { ok: false, technology, reason: `unreadable read receipt for ${technology}` };
    }

    if (receipt?.status !== 'read') {
      return { ok: false, technology, reason: `read receipt for ${technology} is not marked read` };
    }

    const required = def?.packs ?? [];
    const receiptPacks = (receipt?.packs ?? []).map((p) => p?.path);
    for (const pack of required) {
      const packPath = isAbsolute(pack) ? pack : expandPath(pack);
      if (!receiptPacks.includes(packPath)) {
        return { ok: false, technology, reason: `read receipt for ${technology} missing pack ${pack}` };
      }
    }
  }
  return { ok: true };
}

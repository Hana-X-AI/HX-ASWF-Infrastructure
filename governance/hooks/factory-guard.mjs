#!/usr/bin/env node
// Path guard. Blocks Write/Edit against forbidden paths.
// A guardrail, not a sandbox: it blocks Write and Edit, not Bash.
// Usage: node factory-guard.mjs <path>

import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { matches, checkReadGate } from './read-gate.mjs';

const ROOT = resolve(fileURLToPath(new URL('../../', import.meta.url)));
const SCOPE_FILE = resolve(ROOT, 'governance/hooks/factory-scope.json');
const READ_GATE_FILE = process.env.READ_GATE_CONFIG
  ? resolve(process.env.READ_GATE_CONFIG)
  : resolve(ROOT, 'governance/hooks/read-gate.json');

function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('usage: factory-guard.mjs <path>');
    process.exit(2);
  }

  const abs = resolve(ROOT, target);
  const rel = relative(ROOT, abs);

  if (rel === '' || rel.startsWith('..') || rel.split('/')[0] === '..') {
    console.log(`BLOCKED ${target}`);
    process.exit(1);
  }

  const scope = JSON.parse(readFileSync(SCOPE_FILE, 'utf8'));
  const path = rel.replace(/\\/g, '/');

  if (matches(path, scope.forbidden || [])) {
    console.log(`BLOCKED ${target}`);
    process.exit(1);
  }
  if (matches(path, scope.allowed || [])) {
    if (existsSync(READ_GATE_FILE)) {
      const readGate = JSON.parse(readFileSync(READ_GATE_FILE, 'utf8'));
      const check = checkReadGate(path, readGate, ROOT);
      if (!check.ok) {
        console.log(`BLOCKED ${target} (read gate: ${check.reason})`);
        process.exit(1);
      }
    }
    console.log(`ALLOWED ${target}`);
    process.exit(0);
  }

  // Deny by default. An unlisted path is out of scope.
  console.log(`BLOCKED ${target}`);
  process.exit(1);
}

main();

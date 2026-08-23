#!/usr/bin/env node
// Path guard. Blocks Write/Edit against forbidden paths.
// A guardrail, not a sandbox: it blocks Write and Edit, not Bash.
// Usage: node factory-guard.mjs <path>

import { readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../../', import.meta.url)));
const SCOPE_FILE = resolve(ROOT, 'governance/hooks/factory-scope.json');

// Convert a path glob to a regex. Supports:
//   *    matches within one path segment
//   **   matches across segments (including none)
function globToRegex(pattern) {
  let re = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '*') {
      if (pattern[i + 1] === '*') {
        re += '.*';
        i += 1;
        if (pattern[i + 1] === '/') i += 1; // a/**/b also matches a/b
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

function matches(path, patterns) {
  for (const p of patterns) {
    if (globToRegex(p).test(path)) return true;
  }
  return false;
}

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
    console.log(`ALLOWED ${target}`);
    process.exit(0);
  }

  // Deny by default. An unlisted path is out of scope.
  console.log(`BLOCKED ${target}`);
  process.exit(1);
}

main();

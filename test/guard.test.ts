import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));
const GUARD = resolve(ROOT, 'governance/hooks/factory-guard.mjs');

function runGuard(path: string): { code: number; out: string } {
  try {
    const out = execFileSync('node', [GUARD, path], { encoding: 'utf8' });
    return { code: 0, out };
  } catch (err) {
    const e = err as { status?: number; stdout?: string };
    return { code: e.status ?? 1, out: e.stdout ?? '' };
  }
}

describe('factory-guard', () => {
  it('allows an in-scope path', () => {
    const r = runGuard('src/cli.ts');
    expect(r.code).toBe(0);
    expect(r.out).toContain('ALLOWED');
  });

  it('blocks the manifest (forbidden)', () => {
    const r = runGuard('.factory.yaml');
    expect(r.code).toBe(1);
    expect(r.out).toContain('BLOCKED');
  });

  it('blocks the roster (forbidden)', () => {
    const r = runGuard('roster.yaml');
    expect(r.code).toBe(1);
  });

  it('blocks a git path', () => {
    const r = runGuard('.git/config');
    expect(r.code).toBe(1);
  });

  it('blocks an unlisted path (deny by default)', () => {
    const r = runGuard('unknown.txt');
    expect(r.code).toBe(1);
    expect(r.out).toContain('BLOCKED');
  });

  it('blocks a path that escapes the repo', () => {
    const r = runGuard('../outside.txt');
    expect(r.code).toBe(1);
  });
});

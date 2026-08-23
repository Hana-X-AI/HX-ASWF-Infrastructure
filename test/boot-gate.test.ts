import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';

const ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));
const BOOT = resolve(ROOT, 'governance/hooks/aswf-boot.mjs');

function setup() {
  const dir = mkdtempSync(resolve(tmpdir(), 'bootgate-'));
  const receipts = resolve(dir, 'receipts');
  mkdirSync(receipts, { recursive: true });
  const creds = resolve(dir, 'credentials.yaml');
  writeFileSync(creds, 'DEEPSEEK_API_KEY: sk-00000000000000000000000000000000\n');
  return { dir, receipts, creds };
}

function run(args: string[], env: Record<string, string>): { code: number; out: string } {
  try {
    const out = execFileSync('node', [BOOT, ...args], {
      encoding: 'utf8',
      env: { ...process.env, ...env }
    });
    return { code: 0, out };
  } catch (err) {
    const e = err as { status?: number; stdout?: string; stderr?: string };
    return { code: e.status ?? 1, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

function receipt(receipts: string, profile: string, withPreflight = true) {
  writeFileSync(
    resolve(receipts, `${profile}.json`),
    JSON.stringify({
      technology: profile,
      reader: 'test',
      read_at: new Date().toISOString(),
      status: 'read',
      ...(withPreflight
        ? { preflight: { blockers: ['b'], assumptions: ['a'] } }
        : {}),
      packs: [{ path: '/not/here/pack.md' }]
    })
  );
}

describe('aswf-boot', () => {
  it('boots when the credential and pre-flight pass', () => {
    const { receipts, creds } = setup();
    receipt(receipts, 'testprofile');
    const r = run(['testprofile'], {
      CREDENTIALS_FILE: creds,
      RECEIPTS_DIR: receipts,
      DSH_BIN: '/bin/echo'
    });
    expect(r.code).toBe(0);
    expect(r.out).toContain('--profile testprofile');
  });

  it('blocks a malformed credential', () => {
    const { receipts, creds } = setup();
    writeFileSync(creds, 'DEEPSEEK_API_KEY: not-a-key\n');
    receipt(receipts, 'testprofile');
    const r = run(['testprofile'], {
      CREDENTIALS_FILE: creds,
      RECEIPTS_DIR: receipts,
      DSH_BIN: '/bin/echo'
    });
    expect(r.code).toBe(1);
    expect(r.out).toContain('malformed');
  });

  it('blocks a missing pre-flight', () => {
    const { receipts, creds } = setup();
    receipt(receipts, 'testprofile', false);
    const r = run(['testprofile'], {
      CREDENTIALS_FILE: creds,
      RECEIPTS_DIR: receipts,
      DSH_BIN: '/bin/echo'
    });
    expect(r.code).toBe(1);
    expect(r.out).toContain('missing pre-flight');
  });

  it('blocks when no read receipt exists', () => {
    const { receipts, creds } = setup();
    const r = run(['testprofile'], {
      CREDENTIALS_FILE: creds,
      RECEIPTS_DIR: receipts,
      DSH_BIN: '/bin/echo'
    });
    expect(r.code).toBe(1);
    expect(r.out).toContain('no read receipt');
  });
});

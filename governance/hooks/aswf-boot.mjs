#!/usr/bin/env node
// ASWF boot gate. Runs before `dsh` boots a profile.
// Checks the credential and the read-receipt pre-flight, then execs dsh.
//
// Usage: node aswf-boot.mjs <profile> [dsh args...]
//
// Overridable for tests:
//   CREDENTIALS_FILE — path to the credentials yaml (default ~/.dsh/.credentials.yaml)
//   RECEIPTS_DIR     — read-receipt directory (default <cwd>/evidence/read-receipts)
//   DSH_BIN          — the launcher (default `dsh`)

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';

const CRED_FILE = process.env.CREDENTIALS_FILE
  ? resolve(process.env.CREDENTIALS_FILE)
  : resolve(homedir(), '.dsh', '.credentials.yaml');
const RECEIPTS_DIR = process.env.RECEIPTS_DIR
  ? resolve(process.env.RECEIPTS_DIR)
  : resolve(process.cwd(), 'evidence', 'read-receipts');
const DSH_BIN = process.env.DSH_BIN ?? 'dsh';

function fail(msg) {
  console.error(`BLOCKED: ${msg}`);
  process.exit(1);
}

function main() {
  const profile = process.argv[2];
  if (!profile) {
    console.error('usage: aswf-boot.mjs <profile> [dsh args...]');
    process.exit(2);
  }

  // 1. Credential check.
  if (!existsSync(CRED_FILE)) fail(`credential file missing: ${CRED_FILE}`);
  const raw = readFileSync(CRED_FILE, 'utf8');
  const match = raw.match(/^DEEPSEEK_API_KEY:\s*(\S+)\s*$/m);
  if (!match) fail('DEEPSEEK_API_KEY not found in credential file');
  const key = match[1].trim();
  if (!/^sk-[A-Za-z0-9-]{16,}$/.test(key)) {
    fail('DEEPSEEK_API_KEY malformed (expected sk- followed by at least 16 chars)');
  }

  // 2. Pre-flight check.
  const receiptPath = resolve(RECEIPTS_DIR, `${profile}.json`);
  if (!existsSync(receiptPath)) {
    fail(`no read receipt for profile ${profile}: ${receiptPath}`);
  }
  let receipt;
  try {
    receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
  } catch {
    fail(`unreadable read receipt for profile ${profile}`);
  }
  if (receipt?.status !== 'read') {
    fail(`read receipt for ${profile} is not marked read`);
  }
  const preflight = receipt?.preflight;
  if (
    !preflight ||
    !Array.isArray(preflight.blockers) || preflight.blockers.length === 0 ||
    !Array.isArray(preflight.assumptions) || preflight.assumptions.length === 0
  ) {
    fail(`read receipt for ${profile} missing pre-flight (blockers and assumptions)`);
  }

  // 3. Boot.
  const args = process.argv.slice(3);
  const result = spawnSync(DSH_BIN, ['--profile', profile, ...args], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

main();

import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readManifest, ROOT } from '../manifest.js';
import { renderRules } from '../render.js';

export function install(): void {
  const m = readManifest();
  const root = ROOT;

  // 1. Generate the rules file from the knowledge layer and manifest.
  const rules = renderRules(m, root);
  writeFileSync(resolve(root, m.rules_file ?? 'AGENTS.md'), rules);

  // 2. The guard script and scope are generated artifacts that ship with the
  //    skeleton. Verify they are present so a simple commit completes.
  for (const f of [m.guard_script, m.scope_file]) {
    if (!f) throw new Error('manifest is missing guard_script or scope_file');
    if (!existsSync(resolve(root, f))) {
      throw new Error(`missing ${f}`);
    }
  }

  console.log(`wrote ${m.rules_file}`);
  console.log(`guard ${m.guard_script} ok`);
  console.log(`scope ${m.scope_file} ok`);
}

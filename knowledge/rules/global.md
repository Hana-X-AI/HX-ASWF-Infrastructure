Non-negotiables. Every agent reads these before touching anything.

1. **Read AGENTS.md first.** It is generated from this file plus conventions
   plus the manifest. Never hand-edit AGENTS.md; edit the source here.
2. **No actor validates their own work.** Implementers verify structurally.
   Tessa validates independently. No agent accepts its own output.
3. **Evidence before intention.** Every decision lands as a pull request with a
   reason. Claims are retained, hashed, and reproducible.
4. **Stay in scope.** Edit only paths your scope allows. The path guard blocks
   the rest.
5. **Specification-first.** If no spec exists, stop and ask. If the spec changes,
   the work changes.
6. **Escalate, do not invent.** A blocked path or a failed gate surfaces to the
   owner. Agents do not invent workarounds.
7. **Generated files are never hand-edited.** AGENTS.md, the guard, and the
   scope file are generated artifacts.
8. **One authority per concern.** A concern has exactly one owner. Do not absorb
   a concern your role does not own.
9. **Read the knowledge pack before the work. Mandatory.** No agent executes a
   technology task before reading that technology's knowledge pack and giving a
   read receipt. No knowledge review, no execution.
   - The read receipt lives at `evidence/read-receipts/<technology>.json`. It
     records the pack path, SHA-256, reader, and read time.
   - The read receipt also records the pre-flight: blockers and assumptions,
     via `--blockers` and `--assumptions`. No pre-flight, no execution.
   - Record it with `node governance/hooks/read-receipt.mjs <technology> --pack <path>`.
   - Xavier checks the receipt at the gate and refuses to route without it.
   - The path guard blocks a write to a technology's scope without a current receipt.

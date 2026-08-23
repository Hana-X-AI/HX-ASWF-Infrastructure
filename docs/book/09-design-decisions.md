# 09 — Design decisions

Initial entries. Each is decision → why.

- D1: Self-hosted. The factory manages itself first. Why: the first product is
  the factory; dogfooding proves the loop.
- D2: Four primitives. Prompts, profiles, manifest, adapters. Why: one axis of
  change per primitive.
- D3: TypeScript control plane. Why: KDD-013; typed handoffs at every boundary.
- D4: DeepSeek Harness primary adapter. Why: KDD-015.
- D5: Knowledge two-tier. `knowledge/` in git; the vault local via `vaults.yaml`.
  Why: keep the large store out of git.
- D6: The rules file is `AGENTS.md`, generated. Why: one source of truth.
- D7: Book plus ADRs. Why: the previous project failed for lack of this.
- D8: Two-layer path guard, opt-in. Why: enforce scope at the tool level.
- D9: Tiered workflows map to stages. Why: ceremony scales with consequence.
- D10: Evidence git-ignored, append-only, hashed. Why: evidence before intention.
- D11: `test/` for code, `evals/` for agents. Why: verification is the bottleneck.
- D12: Two-class roster. Technology experts plus cross-cutting roles. Why: KDD-024.
- D13: Base factory vs product line. Why: KDD-027.

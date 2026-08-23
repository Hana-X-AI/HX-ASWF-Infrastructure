# Stage 1 — Scout and Plan-Build-Test

The smallest set of rules that lets one commit complete end to end.

## Applies to

- Research and understanding tasks (Scout).
- Small, single-layer changes (Plan-Build-Test).

## Rules

1. A spec exists before work, or the task is a Scout with no code change.
2. The path guard passes. No out-of-scope edits.
3. Typecheck passes. `npm run typecheck`.
4. Tests pass. `npm test`.
5. One commit, one reason, one convention (`knowledge/conventions/commits.md`).

## Advancement

A change advances to Stage 2 when it touches more than one layer, changes
schema, or adds an API contract.

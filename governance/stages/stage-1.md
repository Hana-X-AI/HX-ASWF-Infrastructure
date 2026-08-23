# Stage 1 — Scout and Plan-Build-Test

The smallest set of rules that lets one commit complete end to end.

## Applies to

- Research and understanding tasks (Scout).
- Small, single-layer changes (Plan-Build-Test).

## Rules

1. Read gate and pre-flight. Before execution, the technology expert reads the
   knowledge pack, lists the blockers, and lists the assumptions. Record all
   three in the read receipt. No read receipt, no execution.
2. A spec exists before work, or the task is a Scout with no code change.
3. The path guard passes. No out-of-scope edits.
4. Typecheck passes. `npm run typecheck`.
5. Tests pass. `npm test`.
6. One commit, one reason, one convention (`knowledge/conventions/commits.md`).

## Advancement

A change advances to Stage 2 when it touches more than one layer, changes
schema, or adds an API contract.

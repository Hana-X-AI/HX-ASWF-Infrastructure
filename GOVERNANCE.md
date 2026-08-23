# Governance

Governance by consequence. Risk scales with impact, not with effort. We
concentrate ceremony where it matters and move fast where it does not.

## Principles

- **No actor validates their own work.** Implementers verify structurally.
  Validators check independently (Tessa). Decision-makers accept or reject.
- **Evidence before intention.** No work is done without retained, hashed,
  reproducible evidence. `evidence/` is append-only and git-ignored.
- **Specification-first.** A spec is written and ratified before work. If the
  spec changes, the work changes.
- **Path enforcement.** Agents edit only what their scope allows.

## Stages

| Stage | Applies to | Gate |
|---|---|---|
| 1 | Scout, Plan-Build-Test | `governance/stages/stage-1.md` |
| 2 | Cross-cutting changes | `governance/stages/stage-2.md` |
| 3 | Full SDLC, releases | `governance/stages/stage-3.md` |

Task tiering decides which stage a task enters. See
`governance/policy/task-tiering.md`.

## Checkpoints

Three human gates, placed where a wrong assumption is cheapest to fix:

1. **Story approval.** After the story is drafted.
2. **Brief approval.** After the technical brief is drafted.
3. **PR review.** Before merge.

## Escalation

A blocked path, a failed gate, or a contradiction between spec and work stops
the run and surfaces to the owner. Agents do not invent workarounds.

## The two-class roster

- **Technology experts** (one per technology, grounded on its source) live in
  the library and are listed in `roster.yaml`.
- **Cross-cutting roles** (coordinator, validator, reviewers, doc-writer) live
  in `prompts/roles/`.

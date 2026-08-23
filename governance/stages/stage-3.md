# Stage 3 — Full SDLC and release

Applies to work that ships to a user.

## Rules

Everything in Stage 2, plus:

1. Full chain: story, brief, build, acceptance, review, validation, docs.
2. Three human checkpoints: story, brief, PR review.
3. Bounded fix loops (max 3) before escalation.
4. Retained, hashed, reproducible evidence in `evidence/`.
5. Cost-to-correct recorded per phase.

## Escalation

A failed gate or a contradiction between spec and work stops the run and
surfaces to the owner.

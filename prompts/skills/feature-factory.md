# Feature Factory — Full SDLC (Tier 3)

For substantive features: multi-layer, schema or API contract changes.

## Sequence

1. Triage the tier.
2. Read gate. The technology expert reads the knowledge pack for the domain
   and records a read receipt before any work.
3. Story (technology expert drafts the story).
4. Checkpoint 1: story approval.
5. Brief (technology expert drafts the technical brief).
6. Checkpoint 2: brief approval.
7. Build (technology experts, one per layer).
8. Acceptance (Veritas role: verify the story's criteria).
9. Fix loop 1, max 3.
10. Review: security reviewer, performance reviewer.
11. Validation: Tessa.
12. Fix loop 2, max 3, on Critical findings.
13. Docs.
14. Checkpoint 3: PR review.

## Information passing

Agents do not share context. Pass each agent the outputs it needs. Carry the
story and brief verbatim to every downstream agent.

## Hard rules

- Do not skip checkpoints.
- Do not invent agent outputs.
- Do not bypass the fix-loop limits.

# Feature Factory — Full SDLC (Tier 3)

For substantive features: multi-layer, schema or API contract changes.

## Sequence

1. Triage the tier.
2. Story (technology expert drafts the story).
3. Checkpoint 1: story approval.
4. Brief (technology expert drafts the technical brief).
5. Checkpoint 2: brief approval.
6. Build (technology experts, one per layer).
7. Acceptance (Veritas role: verify the story's criteria).
8. Fix loop 1, max 3.
9. Review: security reviewer, performance reviewer.
10. Validation: Tessa.
11. Fix loop 2, max 3, on Critical findings.
12. Docs.
13. Checkpoint 3: PR review.

## Information passing

Agents do not share context. Pass each agent the outputs it needs. Carry the
story and brief verbatim to every downstream agent.

## Hard rules

- Do not skip checkpoints.
- Do not invent agent outputs.
- Do not bypass the fix-loop limits.

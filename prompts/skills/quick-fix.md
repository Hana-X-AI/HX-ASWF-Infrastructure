# Quick Fix — Plan-Build-Test (Tier 2)

For small, single-layer changes: bug fixes, small enhancements, roughly under
100 lines in 1-3 files, no schema or API contract change.

## Sequence

1. Triage. A typo or rename is Tier 0 (direct edit). Schema or API change is
   Tier 3. Research is Tier 1.
2. Route research to a technology expert for the domain. The expert records a
   read receipt before building.
3. Checkpoint: a 3-bullet plan (files, approach, risks). Wait for go.
4. Route build to one technology expert.
5. Route validation to Tessa.
6. Fix loop, max 3. Then summarize.

## Hard rules

- One expert per run. If the change spans both backend and frontend, escalate.
- Skip the story and brief; they are for Tier 3.

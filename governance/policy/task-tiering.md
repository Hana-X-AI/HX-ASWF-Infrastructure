# Task tiering

Ceremony scales with consequence, not volume. Assign each task a tier, then a
stage.

| Tier | Name | Shape | Stage |
|---|---|---|---|
| 0 | Direct edit | typo, log line, rename, single-line tweak | 1 |
| 1 | Scout | research only, no code | 1 |
| 2 | Plan-Build-Test | small single-layer change, 1-3 files | 1 |
| 3 | Full SDLC | multi-layer, schema or API change | 2-3 |

## Rule

- If unsure between two tiers, take the lighter one and escalate when the work
  shows it was the wrong call.
- A change that touches more than one layer is never Tier 2.
- A change that ships to a user is never below Stage 3.

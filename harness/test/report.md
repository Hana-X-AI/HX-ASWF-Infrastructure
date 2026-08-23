# Real test — ASWF loop on dsh

**Date:** 2026-08-23
**Harness:** `dsh` 0.1.0-rc.7, profile `aswf`, three `--patch` personas.

## What ran

1. **Xavier** (coordinator) read the spec, tiered it (Tier 1 Scout), and routed
   Craig → Tessa. Xavier refused to release Craig until a read receipt with
   pre-flight existed.
2. **Craig** (Ollama specialist) read the pack and the runbook, checked the
   runbook against the five criteria, reported all five PASS, and flagged that
   the cited audit source did not exist.
3. **Tessa** (validator) re-read the runbook independently, agreed with Craig's
   five PASSes as stated text, corrected them to unverified, and returned
   **VALIDATED_WITH_FINDINGS** with one Critical finding.

## Findings

- C1 (Critical, closed): the spec and runbook cited
  `audits/hx-cos-08-23-26-hxs4_ollama_audit.md`, which does not exist in this
  repo. The audit lives in HX-I.T at
  `/home/hxsa/hx-i-t/docs/audits/hx-cos-08-23-26-hxs4_ollama_audit.md`. Both
  references fixed.
- M1: the runbook abbreviates the GPU UUID with `…`. Accepted for now.
- M2: `GGML_VK_VISIBLE_DEVICES=999` is non-canonical (the pack documents `-1`).
  Deliberate per the drop-in comment. Not changed.

## Gates

- Read gate: enforced by Xavier in routing.
- Boot gate: `aswf-boot.mjs` blocks a malformed key or a missing pre-flight.
- Path guard: blocks a write with no receipt or an empty pre-flight.

## Verdict

The loop runs end to end with three separate agents, no shared context, and it
caught a real defect (C1) that a solo run would not have surfaced. F3 and F5
are proven. F4 is proven by Xavier's routing gate and by the unit tests.

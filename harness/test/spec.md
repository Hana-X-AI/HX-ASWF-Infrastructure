# Spec — verify the hxs-4 runbook

**Task tier:** 1 (Scout, read-only).

**Acceptance criteria.** The file `knowledge/runbooks/ollama-hxs4.md` must
correctly state the hxs-4 Ollama commissioning:

1. The 8 GB card is pinned and the 16 GB card is reserved.
2. `OLLAMA_DEBUG` was removed.
3. `OLLAMA_NO_CLOUD=1` was added.
4. FlashAttention is kept at `auto` (measured faster than off).
5. The daemon context stays 64K with per-request `num_ctx` for utility clients.

**Evidence source.** `/home/hxsa/hx-i-t/docs/audits/hx-cos-08-23-26-hxs4_ollama_audit.md`.

**Flow.** Xavier routes. Craig checks the runbook against the audit and the
Ollama pack, and reports findings. Tessa validates Craig's findings against
these criteria and returns a verdict.

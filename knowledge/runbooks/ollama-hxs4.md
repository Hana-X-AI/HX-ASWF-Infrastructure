# Ollama on hxs-4 — operational notes

**Scope:** the hxs-4 Ollama service and its interactive TUI.
**Source:** M3 hxs-4 audit (2026-08-23), `audits/hx-cos-08-23-26-hxs4_ollama_audit.md`.

## Effective commissioning state

The drop-in `/etc/systemd/system/ollama.service.d/hx-commissioning.conf` holds:

- `CUDA_VISIBLE_DEVICES=GPU-cc758e31…` (the 8 GB card; 16 GB card reserved)
- `GGML_VK_VISIBLE_DEVICES=999`
- `OLLAMA_VULKAN=0`
- `OLLAMA_CONTEXT_LENGTH=65536`
- `OLLAMA_NUM_PARALLEL=1`
- `OLLAMA_MAX_LOADED_MODELS=1`
- `OLLAMA_NO_CLOUD=1`

`OLLAMA_DEBUG` was removed 2026-08-23. Rollback backup:
`/etc/systemd/system/ollama.service.d/hx-commissioning.conf.bak-20260823`.

Service: `User=ollama`, `Restart=always`, bind `127.0.0.1:11434`, version 0.32.9.

## Interactive TUI tool surface

The `ollama` interactive TUI ships built-in `Bash` and `Web Search` tools. They
are not user-configured MCP (`~/.ollama/config.json` has `integrations: {}`).

- **Keep auto-approve off.** Each tool call then requires approval. Do not
  enable auto-approve.
- The `Bash` tool runs as the invoking user. Passwordless sudo with exceptions
  (reboot) is the known server configuration.
- `OLLAMA_NO_CLOUD=1` gates the daemon's cloud inference; it does not remove the
  TUI's `Web Search` tool. Treat the TUI as a supervised surface, not a
  background service.

## Thinking is on by default

`qwen3.5:9b-q4_K_M` thinks by default and spends output tokens on thinking before
producing content. Utility and tool clients must disable it:

- Native `/api/chat`: set top-level `"think": false`.
- Anthropic `/v1/messages`: set `"thinking": {"type": "disabled"}`.
- `options.think` is ignored. Do not use it.

## Context

Decision (2026-08-23): keep the daemon at 64K. Utility and tool clients set
`num_ctx` per request (for example 16384 or 32768) when they want 100% GPU and
faster prompt eval. Recall is verified correct at 32K and 64K. At 64K the model
runs 28/72 CPU/GPU (offload).

## FlashAttention

Decision (2026-08-23): keep `--flash-attn auto` (default). Measured on hxs-4 at
`num_ctx=4096`: auto 69.4 tok/s generation, off 21.0 tok/s. Do not set
`OLLAMA_FLASH_ATTENTION=0`.

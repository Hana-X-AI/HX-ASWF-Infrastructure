# HX-ASWF-Infrastructure

The Agentic Software Factory (ASWF). This repository is the factory that builds
itself first, then builds products.

- **What it is:** a self-hosted factory with a TypeScript control plane, a
  two-class agent roster, a two-tier knowledge layer, and tiered governance.
- **First product:** the factory itself (KDD-010). The git history shows the
  machine building itself.
- **How work enters:** spec → change → deploy, through stage gates. See
  `CONTRIBUTING.md`.
- **Design reasoning:** the book lives in `docs/book/`, starting at
  `00-introduction.md`.

## Quick start

```bash
npm install
npm run install:factory   # generates AGENTS.md and installs the path guard
npm test                  # runs the control-plane tests
```

## Layout

| Path | Purpose |
|---|---|
| `knowledge/` | In-repo knowledge layer (tier 1). Rules, conventions, ADRs, precedents, runbooks. |
| `specs/` | Specification store. |
| `prompts/` | Cross-cutting role prompts and orchestrator skills. |
| `roster.yaml` | The agent registry. Technology experts and cross-cutting roles. |
| `profiles/` | Per-stack rule packs. |
| `src/` | TypeScript control plane. |
| `governance/` | Stages, policy, path guard, templates. |
| `test/` | Control-plane tests. |
| `evals/` | Per-agent evaluation cases. |
| `evidence/` | Retained run evidence. Append-only, git-ignored. |
| `observability/` | Metric definitions. |
| `docs/book/` | The book. Human-facing design reasoning. |
| `examples/` | Sample manifests and workspace files. |

## License

MIT. See `LICENSE`.

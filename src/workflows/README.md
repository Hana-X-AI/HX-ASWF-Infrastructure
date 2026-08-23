# Typed workflows

The orchestrator chain, Mastra-style. Typed handoffs at every step boundary.

Planned workflows (KDD-013, D3):

- `sdlcWorkflow` — the full chain.
- `triageWorkflow` — tier and route.
- `codeGenWorkflow` — build.
- `validationWorkflow` — validate.

These land with the full control plane in M3. The M2 skeleton ships the working
`factory install` only.

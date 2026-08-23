# Knowledge layer (tier 1)

In-repo, git-versioned, small, curated. This is what every agent reads at the
gate. The large store lives on local disk in the Technology Knowledge Vault
(TKV), tier 2, and is declared in `vaults.yaml`.

## What lives here

| Path | Purpose |
|---|---|
| `rules/` | Global rules. The source of the generated rules file. |
| `conventions/` | Naming, commit message, code style. |
| `adr/` | Architecture decision records. One file per decision. Read at the gate. |
| `precedents/` | Validated patterns and libraries. What to reuse, what to avoid. |
| `runbooks/` | Operational runbooks. |
| `vaults.yaml` | Manifest that declares the TKV path and access (tier 2 pointer). |

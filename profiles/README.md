# Profiles

Per-stack rule packs. A profile states the conventions and commands for one
stack. The manifest is the per-repo source of truth; a profile is the shared
convention pack.

## Add a profile

1. Create `profiles/<stack>.md`.
2. State the stack, the default paths, the default commands, and the forbidden
   patterns.
3. Reference it from the repo manifest when a repo uses that stack.

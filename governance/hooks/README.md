# Path guard

Two layers:

- `factory-scope.json` — the scope: a forbidden net plus an allow-list.
- `factory-guard.mjs` — the script. It reads the scope and answers one
  question: may this path be edited?

## Behavior

- A forbidden path is blocked.
- An allowed path is allowed.
- An unlisted path is blocked (deny by default).
- A path that escapes the repository is blocked.

The guard answers with `ALLOWED <path>` (exit 0) or `BLOCKED <path>` (exit 1).

## Limits

The guard is a guardrail, not a sandbox. It blocks Write and Edit, not Bash.
Stage 3 sandboxing closes that gap later.

## Scope change rule

`factory-scope.json` is generated from the manifest and profiles. Edit the
source, then re-run `npm run install:factory`. Do not hand-edit the generated
file.

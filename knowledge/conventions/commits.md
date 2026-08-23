One convention, everywhere.

## Format

```
<type>(<scope>): <subject>

<body>
```

## Types

- `feat` — a new capability
- `fix` — a defect
- `docs` — documentation only
- `chore` — housekeeping, no behavior change
- `refactor` — behavior-preserving change
- `test` — tests only

## Subject

- Imperative, lowercase, no trailing period.
- At most 72 characters.
- State what changed, not how.

## Body

- One or more lines explaining why. Reference the spec or ADR when one exists.

## Example

```
feat(guard): block edits outside the declared scope

The path guard now rejects Write and Edit against forbidden paths.
Spec: specs/0001-path-guard.md
```

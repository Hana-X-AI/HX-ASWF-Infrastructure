# Contributing

Work enters the factory one way: spec → change → deploy. Every change passes a
stage gate before it moves on.

## The loop

1. **Spec.** Write a specification in `specs/` using `specs/template.md`.
   State the problem, the acceptance criteria, the context, the constraints,
   and the rollback plan.
2. **Change.** Open a pull request. One change, one reason. Commit messages
   follow `knowledge/conventions/commits.md`.
3. **Deploy.** The change merges after it passes the gate for its stage.

## Stage gates

- **Stage 1 (Scout and Plan-Build-Test).** Smallest set of rules that lets one
  commit complete end to end. See `governance/stages/stage-1.md`.
- **Stage 2 and 3** add ceremony as consequence grows. See
  `governance/stages/`.

## The path guard

The path guard blocks agents from editing what they must not. It is a guardrail,
not a sandbox: it blocks Write and Edit, not Bash. See
`governance/hooks/README.md` and `GOVERNANCE.md`.

## Rules for agents

Every agent reads `AGENTS.md` first. It is generated from the knowledge layer and
the manifest. Never hand-edit it; edit the source in `knowledge/` and re-run
`npm run install:factory`.

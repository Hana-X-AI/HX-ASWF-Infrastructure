# Node + Fastify

Stack: Node.js + Fastify, TypeScript.

## Default paths

- source: `src/`
- tests: `test/`
- config: `tsconfig.json`

## Default commands

- install: `npm install`
- typecheck: `npx tsc --noEmit`
- test: `npx vitest run`
- run: `npm run dev`

## Forbidden patterns

- No `any` without a comment.
- No raw SQL in route handlers; use the data layer.
- No secrets in code or config; use environment variables.

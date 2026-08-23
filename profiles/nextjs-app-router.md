# Next.js App Router

Stack: Next.js App Router, React, TypeScript.

## Default paths

- app: `app/`
- components: `components/`
- tests: `__tests__/` or colocated `*.test.tsx`

## Default commands

- install: `npm install`
- typecheck: `npx tsc --noEmit`
- test: `npx vitest run`
- run: `npm run dev`

## Forbidden patterns

- No client secrets in server components.
- No data fetching in render without a loading boundary.

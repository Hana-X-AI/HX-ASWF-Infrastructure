# ADR-0001 — Four primitives

- **Status:** accepted
- **Date:** 2026-08-23
- **Decided by:** KDD-017, owner

## Decision

The repository structure is organized around four primitives, each owning one
axis of change: prompts, profiles, manifest, adapters.

## Why

A change to process, stack, repo facts, or platform output should touch exactly
one place. That is what makes the factory teachable and safe to extend.

## Trade-off

More moving parts than a single template. Worth it the moment more than one
repo exists.

## Consequences

- Change the process: edit a prompt.
- Change a stack's conventions: edit a profile.
- Change one repo's facts: edit its manifest.
- Change a platform's output shape: edit an adapter.
- Change who the agents are: edit `roster.yaml`.

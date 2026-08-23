# 04 — Path enforcement

The path guard makes "agents edit only what they should" real.

Two layers: a scope file (forbidden net + allow-list) and a guard script that
answers one question — may this path be edited?

The guard is a guardrail, not a sandbox. It blocks Write and Edit, not Bash.
Stage 3 sandboxing closes that gap.

Full detail lands with M3.

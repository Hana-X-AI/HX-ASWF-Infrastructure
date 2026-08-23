# Retained run evidence

Append-only. Git-ignored. Runs are hashed and reproducible.

## What is retained

- The input, the change, the validation result, and the cost per phase.
- The hash of each artifact, so a run can be reproduced.

## Rules

- Never edit evidence after it is written. Append a new record instead.
- Never commit evidence to git. The `.gitignore` excludes it.
- A claim without evidence is not accepted.

The data lands in M3. This README states the rules before the data exists.

# Python + FastAPI

Stack: Python + FastAPI.

## Default paths

- source: `app/`
- tests: `tests/`
- deps: `pyproject.toml` or `requirements.txt`

## Default commands

- install: `pip install -e .`
- typecheck: `mypy app`
- test: `pytest`
- run: `uvicorn app.main:app`

## Forbidden patterns

- No raw SQL; use the ORM or a query layer.
- No synchronous blocking calls in async routes.

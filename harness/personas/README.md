# ASWF harness personas

Per-role `--patch` overlays over the `aswf` profile. Each is one `system-prompt`
persona. Apply with:

```sh
dsh --profile aswf --patch harness/personas/xavier.patch.yml "<task>"
```

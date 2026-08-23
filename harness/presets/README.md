# ASWF subagent presets

Source of truth for the Craig and Tessa subagent presets. The dsh roster
discovers user presets at `<dshHome>/.agent-presets/` (the harness-home root).

Install:

```sh
mkdir -p ~/.dsh/.agent-presets
cp -r harness/presets/craig ~/.dsh/.agent-presets/
cp -r harness/presets/tessa ~/.dsh/.agent-presets/
```

Each preset is a directory: `preset.yml` (metadata) and `agent.cordis.yml`
(the agent-plane composition: persona plus tools).

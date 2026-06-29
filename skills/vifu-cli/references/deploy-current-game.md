---
description: One-command deploy workflow for the current game directory.
metadata:
  required_access:
    - CODEBASE
    - VIFU_CLI
    - VIFU_CLOUD
---

# Deploy The Current Game

Use this when the user asks to deploy, publish, share, or make the current game playable.

1. Treat the current working directory as the game unless another path is supplied.
2. Run `vifu --help` if the environment is unfamiliar.
3. Run:

```bash
vifu deploy --yes
```

Use an explicit path when the user supplied one:

```bash
vifu deploy <path> --yes
```

`vifu deploy --yes` creates missing setup from detected defaults, builds static output, validates the artifact, uploads it, and creates a playable share URL.

Report the `Playable URL:` line when deployment succeeds. If deployment fails, report the command, file, line, rule, and documentation URL that Vifu printed.

For a no-upload check:

```bash
vifu deploy --dry-run
```

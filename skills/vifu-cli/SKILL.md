---
name: vifu-cli
description: Operate the Vifu CLI from coding agents. Use when the user asks to install or verify Vifu, deploy the current game directory, adapt an existing browser game for Vifu, run Vifu build/test checks, publish or share a Vifu game, or debug Vifu deploy errors.
allowed-tools:
  - Bash(vifu --help)
  - Bash(vifu * --help)
  - Bash(vifu deploy --dry-run)
  - Bash(vifu manifest check)
  - Bash(vifu build)
---

# Vifu CLI

Use the installed `vifu` command first. If it is missing, install the CLI with:

```bash
curl -fsSL https://vifu.dev/cli | bash
```

Then run `vifu --help` before depending on command shape.

## Common Workflows

- **CLI setup and command checks**: read [references/cli.md](references/cli.md).
- **Deploy the current game directory**: read [references/deploy-current-game.md](references/deploy-current-game.md).
- **Existing browser games**: read [references/existing-browser-game.md](references/existing-browser-game.md).
- **Auth and login issues**: read [references/auth.md](references/auth.md).
- **Deploy errors and validation failures**: read [references/troubleshooting.md](references/troubleshooting.md).

## Defaults

- Treat the current working directory as the game unless the user supplies a path.
- Assume the user is already logged in until Vifu reports otherwise.
- If the user explicitly asks to deploy, publish, share, or make the game playable, that is authorization to run the remote deploy command.
- If upload or marketplace intent is ambiguous, ask before running remote commands.
- Do not print auth tokens, bearer tokens, refresh tokens, API keys, or local auth file contents.
- Do not use OpenClaw-specific setup paths.

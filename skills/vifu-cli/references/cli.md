---
description: Vifu CLI installation and command discovery.
metadata:
  required_access:
    - CODEBASE
    - VIFU_CLI
---

# CLI

Install the CLI separately from this skill:

```bash
curl -fsSL https://vifu.dev/cli | bash
vifu --help
```

Use npm only when the native installer is unavailable:

```bash
npm install -g @vifu/cli@alpha
vifu --help
```

For project-local usage:

```bash
npm install --save-dev @vifu/cli@alpha
npx vifu --help
```

For command-specific syntax, run:

```bash
vifu <command> --help
```

Do not assume old commands such as `vifu create` or `vifu new`. New projects use:

```bash
npm create @vifu/vifu my-game -- --template vanilla --no-interactive
```

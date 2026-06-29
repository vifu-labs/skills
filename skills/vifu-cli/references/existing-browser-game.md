---
description: Adapting an existing browser game to Vifu.
metadata:
  required_access:
    - CODEBASE
    - VIFU_CLI
---

# Existing Browser Games

For Vite, Phaser, Three.js, Pixi, Angular, or static HTML games, start with the one-step deploy path:

```bash
vifu deploy --yes
```

Vifu detects common browser project layouts and starts setup automatically when it is missing. Run `vifu setup` first only when the user asks to inspect or edit the detected setup before deploy.

If adapting source code is required:

1. Keep the existing source layout.
2. Confirm the HTML entry, build command, and output directory.
3. Replace direct AI/backend calls with the Vifu SDK where needed.
4. Build to static browser files.
5. Run `vifu deploy --yes`.

Do not vendor private provider keys into the game bundle. Runtime AI/backend access should go through Vifu-supported SDK paths.

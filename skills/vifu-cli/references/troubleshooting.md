---
description: Handling Vifu deploy validation and runtime errors.
metadata:
  required_access:
    - CODEBASE
    - VIFU_CLI
---

# Troubleshooting

When Vifu blocks deploy, prefer the error output over guessing. Report:

- The failed command.
- The file and line number, when present.
- The policy rule or validation name.
- The documentation URL printed by Vifu.

Common fixes:

- Remove remote executable JavaScript imports from deployed runtime artifacts.
- Replace direct AI/provider API calls with Vifu SDK paths.
- Keep local-only secrets out of browser bundles.
- Ensure the build output contains an HTML entry file.
- Run `vifu manifest check` for manifest-only diagnosis.

For a safe planning check without upload:

```bash
vifu deploy --dry-run
```

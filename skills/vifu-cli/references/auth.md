---
description: Authentication expectations for Vifu CLI deploy workflows.
metadata:
  required_access:
    - VIFU_CLI
    - VIFU_CLOUD
---

# Auth

Assume the user is logged in unless command output says otherwise.

If login is required, run interactively only when the user asks you to handle login:

```bash
vifu login
```

If Vifu prints a verification URL or code, relay exactly those values to the user and wait for the command to finish. Do not persist or document plaintext credentials.

Useful account commands:

```bash
vifu logout
vifu logout --all
```

Do not read or print local auth files.

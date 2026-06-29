# Vifu Skills Contribution Guide

This repository stores agent-facing workflow knowledge, not product source code.

## Rules

- Keep `skills/vifu-cli/SKILL.md` concise. Put detailed workflows in
  `skills/vifu-cli/references/*.md`.
- Do not duplicate current CLI source code in a skill. Link to public docs when
  the exact behavior should stay current.
- Keep CLI installation and skill installation separate. Do not document
  `~/.vifu/skills` as an installation path.
- Use `npx skills add vifu-labs/skills --skill "vifu-cli"` for the standard
  install command. Do not use `npx skill add`.
- Do not add plaintext credentials, tokens, bearer strings, refresh tokens,
  API keys, signing material, or local auth paths.
- Keep `.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json` versions
  in lockstep.
- If a reference file is added, link it from `SKILL.md` and include
  `metadata.required_access` in frontmatter.

## Skill Shape

Each skill should include:

- `SKILL.md` with `name` and `description` frontmatter.
- Optional `allowed-tools` frontmatter for low-risk checks.
- One-level `references/` files for details that are loaded only when needed.

Run validation before committing:

```bash
node scripts/validate-skills.mjs
```

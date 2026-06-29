# Vifu Skills

Agent skills for using Vifu from coding agents.

| Skill | Description |
| --- | --- |
| `vifu-cli` | Guides agents through Vifu CLI setup checks, one-command game deploys, existing browser game adaptation, and deploy troubleshooting. |

## Installation

The Vifu CLI and Vifu Agent Skill are installed separately. Install the CLI first:

```bash
curl -fsSL https://vifu.dev/cli | bash
vifu --help
```

Then install the skill with one of these methods:

| Method | Command | Best for |
| --- | --- | --- |
| Skills CLI | `npx skills add vifu-labs/skills --skill "vifu-cli"` | Standard cross-agent install. |
| Cursor Plugin | `/add-plugin vifu` | Cursor users after plugin indexing is available. |
| Manual Symlink | `git clone https://github.com/vifu-labs/skills.git && ln -s /path/to/vifu-skills/skills/vifu-cli <agent-skills-dir>/vifu-cli` | Manual or private skill directories. |
| Agent Prompt | `Install the vifu-cli skill from https://github.com/vifu-labs/skills` | Agents that can install skills from GitHub. |

Use `npx skills add`, not `npx skill add`.

## Usage

From a game directory, ask your coding agent:

```text
Use the Vifu CLI skill. Deploy this game directory with Vifu and report the Playable URL.
```

The skill assumes the user owns the deployment decision. If the CLI reports
missing or expired auth, run:

```bash
vifu login
```

## Development

Validate the repository before opening a pull request:

```bash
node scripts/validate-skills.mjs
node scripts/test-install-flow.mjs
```

See [agents.md](agents.md) for contribution rules.

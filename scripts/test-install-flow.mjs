#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2] || repoRoot;
const root = mkdtempSync(path.join(os.tmpdir(), "vifu-skill-install-"));
const stepTimeoutMs = Number.parseInt(process.env.VIFU_SKILL_INSTALL_STEP_TIMEOUT_MS || "180000", 10);

function run(command, args, options = {}) {
  execFileSync(command, args, {
    stdio: "inherit",
    timeout: stepTimeoutMs,
    ...options,
    env: {
      ...process.env,
      npm_config_update_notifier: "false",
      ...options.env,
    },
  });
}

try {
  const home = path.join(root, "home");
  const cache = path.join(root, "npm-cache");
  const work = path.join(root, "work");
  for (const dir of [home, cache, work]) mkdirSync(dir, { recursive: true });

  run("npx", ["-y", "skills", "add", source, "--skill", "vifu-cli"], {
    cwd: work,
    env: {
      HOME: home,
      XDG_CONFIG_HOME: path.join(home, ".config"),
      npm_config_cache: cache,
    },
  });

  const skillPath = path.join(work, ".agents", "skills", "vifu-cli", "SKILL.md");
  if (!existsSync(skillPath)) {
    throw new Error(`vifu-cli skill was not installed: ${skillPath}`);
  }
  if (!readFileSync(skillPath, "utf8").includes("name: vifu-cli")) {
    throw new Error("installed skill does not look like vifu-cli");
  }

  console.log("Vifu skill install flow passed");
} finally {
  rmSync(root, { recursive: true, force: true });
}

#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");

function fail(message) {
  console.error(`validate-skills: ${message}`);
  process.exitCode = 1;
}

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function frontmatter(markdown, relativePath) {
  if (!markdown.startsWith("---\n")) {
    fail(`${relativePath} is missing YAML frontmatter`);
    return "";
  }
  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    fail(`${relativePath} has unterminated YAML frontmatter`);
    return "";
  }
  return markdown.slice(4, end);
}

function hasField(yaml, field) {
  return new RegExp(`^${field}:\\s*\\S`, "m").test(yaml);
}

function listMarkdownFiles(dir) {
  return readdirSync(dir)
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry);
      if (statSync(fullPath).isDirectory()) return listMarkdownFiles(fullPath);
      return fullPath.endsWith(".md") ? [fullPath] : [];
    });
}

const claude = readJson(".claude-plugin/plugin.json");
const cursor = readJson(".cursor-plugin/plugin.json");
if (claude.version !== cursor.version) {
  fail("Claude and Cursor plugin versions must match");
}
if (claude.repository !== cursor.repository) {
  fail("Claude and Cursor plugin repositories must match");
}

for (const skillName of readdirSync(skillsRoot)) {
  const skillDir = path.join(skillsRoot, skillName);
  if (!statSync(skillDir).isDirectory()) continue;

  const skillPath = path.join(skillDir, "SKILL.md");
  if (!existsSync(skillPath)) {
    fail(`${skillName} is missing SKILL.md`);
    continue;
  }

  const skillRelative = path.relative(repoRoot, skillPath);
  const skillMarkdown = readFileSync(skillPath, "utf8");
  const skillYaml = frontmatter(skillMarkdown, skillRelative);
  for (const field of ["name", "description"]) {
    if (!hasField(skillYaml, field)) fail(`${skillRelative} is missing ${field}`);
  }

  const referencesDir = path.join(skillDir, "references");
  if (existsSync(referencesDir)) {
    for (const referencePath of listMarkdownFiles(referencesDir)) {
      const referenceRelative = path.relative(repoRoot, referencePath);
      const referenceMarkdown = readFileSync(referencePath, "utf8");
      const referenceYaml = frontmatter(referenceMarkdown, referenceRelative);
      if (!/metadata:\n(?:  .+\n)*  required_access:/m.test(referenceYaml)) {
        fail(`${referenceRelative} is missing metadata.required_access`);
      }
      const linkTarget = path.relative(skillDir, referencePath).split(path.sep).join("/");
      if (!skillMarkdown.includes(linkTarget)) {
        fail(`${referenceRelative} is not linked from ${skillRelative}`);
      }
    }
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log("skills validation passed");

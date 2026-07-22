import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  GROUNDING_RULE,
  appendGroundingRule,
  default as androidCurrent,
} from "../extensions/android-current.js";

test("extension registers one per-turn handler and preserves the system prompt", async () => {
  const handlers = new Map();
  const fakePi = {
    on(event, handler) {
      assert.equal(handlers.has(event), false);
      handlers.set(event, handler);
    },
  };

  androidCurrent(fakePi);

  assert.deepEqual([...handlers.keys()], ["before_agent_start"]);
  const result = await handlers.get("before_agent_start")({
    systemPrompt: "Existing system prompt",
  });
  assert.equal(result.systemPrompt, `Existing system prompt\n\n${GROUNDING_RULE}`);
});

test("grounding rule is appended only once", () => {
  const once = appendGroundingRule("Base prompt");
  const twice = appendGroundingRule(once);

  assert.equal(twice, once);
  assert.equal(twice.split(GROUNDING_RULE).length - 1, 1);
});

test("manifest exposes only the intended extension and skill", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(manifest.name, "pi-android-current");
  assert.equal(manifest.version, "0.1.0");
  assert.deepEqual(manifest.pi, {
    extensions: ["./extensions/android-current.js"],
    skills: ["./skills/android-current-docs"],
  });
  assert.equal(manifest.dependencies, undefined);
  assert.equal(manifest.devDependencies, undefined);
});

test("skill frontmatter and workflow contain the required safeguards", async () => {
  const skill = await readFile(
    new URL("../skills/android-current-docs/SKILL.md", import.meta.url),
    "utf8",
  );

  assert.match(skill, /^---\r?\nname: android-current-docs\r?\n/);
  assert.match(skill, /android docs search/);
  assert.match(skill, /android docs fetch/);
  assert.match(skill, /best one to three `kb:\/\//);
  assert.match(skill, /Preserve versions already pinned/);
  assert.match(skill, /Stable releases are the default/);
  assert.match(skill, /Do not invent/);
  assert.match(skill, /official source links/);
});

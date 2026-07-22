export const GROUNDING_RULE =
  "MANDATORY FOR THIS PROJECT: For every Android development task, including code review, architecture review, implementation, bug fixing, refactoring, testing, and build or dependency work, use the read tool to load the android-current-docs skill before substantive analysis or edits, then follow it. For an Android code review, inspect the code, run `android -V`, perform at least one targeted `android docs search`, and fetch relevant results with `android docs fetch` before finalizing Android-framework claims. If live documentation is unavailable, disclose that and mark those claims unverified. Do not rely only on model training data. A code review is included even when the user does not mention versions.";

export function appendGroundingRule(systemPrompt) {
  const prompt = typeof systemPrompt === "string" ? systemPrompt : "";

  if (prompt.includes(GROUNDING_RULE)) {
    return prompt;
  }

  return prompt.length === 0 ? GROUNDING_RULE : `${prompt}\n\n${GROUNDING_RULE}`;
}

export default function androidCurrent(pi) {
  pi.on("before_agent_start", async (event) => ({
    systemPrompt: appendGroundingRule(event.systemPrompt),
  }));
}

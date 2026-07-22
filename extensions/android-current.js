export const GROUNDING_RULE =
  "For version-sensitive Android decisions, load the android-current-docs skill and follow it before recommending or editing versions, APIs, SDK behavior, deprecations, Compose, AGP, or Firebase.";

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

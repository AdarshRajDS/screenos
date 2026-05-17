export type ResearchRequest = {
  topic: string;
  depth: string;
  sourceType: string;
};

export function buildMockResearch(request: ResearchRequest) {
  return {
    topic: request.topic,
    depth: request.depth,
    sourceType: request.sourceType,
    generatedAt: new Date().toISOString(),
    kpis: [
      { label: "Sources Reviewed", value: 24, delta: 6 },
      { label: "Signal Score", value: 91, delta: 12, suffix: "%" },
      { label: "Emerging Themes", value: 5, delta: 2 },
      { label: "Estimated Time", value: 7, suffix: " min", deltaLabel: "fast mode" }
    ],
    summary: {
      headline: `ScreenOS scan for ${request.topic}`,
      body:
        "Mock structured output highlights workflow-specific demand, strong appetite for source transparency, and a consistent preference for tools that compress multi-step research tasks."
    },
    sources: [
      {
        title: "Market Pulse Weekly",
        type: request.sourceType === "mixed" ? "news" : request.sourceType,
        confidence: "high",
        finding: "Budget is moving toward tools with direct revenue or productivity impact."
      },
      {
        title: "AI Operator Index",
        type: "report",
        confidence: "high",
        finding: "Operators reward products that combine synthesis with actionability."
      },
      {
        title: "Founder Transcript Set",
        type: "interview",
        confidence: "medium",
        finding: "Users want tighter workflow handoff from insight to execution."
      }
    ],
    insights: [
      {
        title: "Verticalized workflows are winning",
        detail: "Specialized tools continue to outperform broad assistants in buyer clarity and expansion."
      },
      {
        title: "Trust features matter earlier",
        detail: "Traceability and source attribution show up before broader automation permissions."
      },
      {
        title: "Speed alone is insufficient",
        detail: "Time saved converts best when paired with reusable outputs or decision-ready summaries."
      }
    ]
  };
}

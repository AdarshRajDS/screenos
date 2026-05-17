type KPI = {
  label: string;
  value: string;
  change: string;
};

type Source = {
  title: string;
  type: string;
  confidence: string;
  note: string;
};

type Insight = {
  title: string;
  body: string;
};

const kpis: KPI[] = [
  { label: "Sources Reviewed", value: "24", change: "+6 live" },
  { label: "Signal Score", value: "91%", change: "+12%" },
  { label: "Emerging Themes", value: "5", change: "2 new" },
  { label: "Estimated Time", value: "7 min", change: "fast mode" }
];

const sources: Source[] = [
  {
    title: "Market Pulse Weekly",
    type: "News",
    confidence: "High confidence",
    note: "Recent funding shifts and buyer sentiment changes."
  },
  {
    title: "AI Operator Index",
    type: "Reports",
    confidence: "Validated data",
    note: "Top product categories and spending benchmarks."
  },
  {
    title: "Founder Transcript Set",
    type: "Interviews",
    confidence: "Qualitative",
    note: "Common objections, hiring pressure, and tooling gaps."
  }
];

const insights: Insight[] = [
  {
    title: "Budget pressure is selective",
    body: "Teams are trimming broad software spend while protecting tools tied directly to revenue or velocity."
  },
  {
    title: "Workflow depth beats breadth",
    body: "Buyers increasingly prefer narrow products that remove full task chains rather than generic copilots."
  },
  {
    title: "Trust is still product work",
    body: "Decision-makers want traceability, source quality, and clear limits before they expand automation use."
  }
];

export function ResearchDashboard() {
  return (
    <main className="min-h-screen bg-grid bg-[size:24px_24px]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-panel backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-cyan/25 via-transparent to-lime/20" />
          <div className="relative p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-ocean">
                  ScreenOS Research
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Embedded research cockpit for ChatGPT
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                  Launch a responsive dashboard inside ChatGPT, collect structured findings,
                  and turn raw source signals into clear next actions.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan">Command</p>
                <p className="mt-2 text-sm font-medium">/screen research</p>
              </div>
            </header>

            <section className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl bg-ink p-4 text-white sm:p-5">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <label className="md:col-span-2">
                    <span className="mb-2 block text-sm text-slate-300">Topic</span>
                    <input
                      defaultValue="AI workflow tools for mid-market sales teams"
                      className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-400"
                      placeholder="Enter a topic"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm text-slate-300">Source type</span>
                    <select className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
                      <option>Mixed sources</option>
                      <option>News</option>
                      <option>Reports</option>
                      <option>Interviews</option>
                    </select>
                  </label>
                  <label>
                    <span className="mb-2 block text-sm text-slate-300">Depth</span>
                    <select className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
                      <option>Deep dive</option>
                      <option>Standard</option>
                      <option>Fast scan</option>
                    </select>
                  </label>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-300">
                    Mock-first dashboard wired for Apps SDK iframe delivery.
                  </p>
                  <button className="rounded-2xl bg-lime px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-95">
                    Start Research
                  </button>
                </div>
              </div>

              <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Summary Panel
                </p>
                <h2 className="mt-3 text-xl font-semibold text-ink">Executive readout</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Demand is consolidating around research tools that provide source-level
                  transparency, reusable workflows, and measurable time savings for commercial
                  teams.
                </p>
                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Recommended Angle
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    Position ScreenOS as a control layer for research execution, not just a
                    summarization surface.
                  </p>
                </div>
              </aside>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((item) => (
                <article
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p className="text-3xl font-semibold text-ink">{item.value}</p>
                    <span className="rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold text-ocean">
                      {item.change}
                    </span>
                  </div>
                </article>
              ))}
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Source Cards
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-ink">Top evidence</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Mock data
                  </div>
                </div>
                <div className="mt-4 grid gap-3">
                  {sources.map((source) => (
                    <article
                      key={source.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-base font-semibold text-ink">{source.title}</h3>
                        <div className="flex gap-2 text-xs">
                          <span className="rounded-full bg-cyan/25 px-3 py-1 font-medium text-sky-900">
                            {source.type}
                          </span>
                          <span className="rounded-full bg-slate-200 px-3 py-1 font-medium text-slate-700">
                            {source.confidence}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{source.note}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
                  Insight Cards
                </p>
                <h2 className="mt-2 text-xl font-semibold">Signals worth acting on</h2>
                <div className="mt-4 grid gap-3">
                  {insights.map((insight, index) => (
                    <article
                      key={insight.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-sm font-semibold text-ink">
                          0{index + 1}
                        </div>
                        <h3 className="text-base font-semibold">{insight.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{insight.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <footer className="mt-6">
              <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Command Bar
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Actions surface can be connected to Apps SDK tool invocations.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                    Save brief
                  </button>
                  <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                    Export sources
                  </button>
                  <button className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
                    Share insight
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}

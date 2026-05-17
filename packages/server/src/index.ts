import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { buildMockResearch } from "./mock-data.js";

const WEB_APP_URL =
  process.env.SCREENOS_WEB_URL ??
  "https://screenos-web-9138-ezbxs77bs-adarsh-raj-s-projects2.vercel.app/";
const WEB_APP_ORIGIN = new URL(WEB_APP_URL).origin;
const PORT = Number(process.env.PORT ?? "8787");

const DASHBOARD_RESOURCE_URI = "ui://screenos/research-dashboard.html";

function createScreenOsServer() {
  const server = new McpServer({
    name: "screenos",
    version: "0.1.0"
  });

  server.registerResource(
    "screenos-dashboard",
    DASHBOARD_RESOURCE_URI,
    {
      title: "ScreenOS Research",
      description: "Iframe wrapper for the ScreenOS research dashboard",
      mimeType: "text/html+skybridge"
    },
    async () => ({
      contents: [
        {
          uri: DASHBOARD_RESOURCE_URI,
          mimeType: "text/html+skybridge",
          text: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ScreenOS Research</title>
    <style>
      * {
        box-sizing: border-box;
      }
      html, body {
        margin: 0;
        min-height: 100%;
        color: #08111f;
        background:
          radial-gradient(circle at top left, rgba(125, 211, 252, 0.42), transparent 32%),
          radial-gradient(circle at top right, rgba(184, 243, 75, 0.28), transparent 26%),
          linear-gradient(180deg, #f8fbff 0%, #eef5fb 100%);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      body {
        padding: 20px;
      }
      .screen {
        max-width: 1180px;
        margin: 0 auto;
        border: 1px solid rgba(255, 255, 255, 0.78);
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.84);
        box-shadow: 0 20px 60px rgba(8, 17, 31, 0.16);
        overflow: hidden;
      }
      .inner {
        padding: 28px;
      }
      header {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        border-bottom: 1px solid #dbe3ed;
        padding-bottom: 22px;
      }
      .eyebrow {
        margin: 0 0 8px;
        color: #0f766e;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }
      h1 {
        margin: 0;
        font-size: clamp(28px, 4vw, 44px);
        line-height: 1.05;
      }
      .lede {
        margin: 12px 0 0;
        max-width: 700px;
        color: #536174;
        line-height: 1.6;
      }
      .command {
        align-self: flex-start;
        min-width: 150px;
        border-radius: 18px;
        background: #08111f;
        color: white;
        padding: 14px 16px;
      }
      .command small {
        color: #7dd3fc;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      .command p {
        margin: 8px 0 0;
        font-weight: 700;
      }
      .controls {
        margin-top: 22px;
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(150px, 1fr) minmax(150px, 1fr) auto;
        gap: 12px;
        align-items: end;
        border-radius: 18px;
        background: #08111f;
        padding: 18px;
        color: white;
      }
      label {
        display: grid;
        gap: 8px;
        color: #cbd5e1;
        font-size: 14px;
      }
      input, select {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        padding: 12px;
        font: inherit;
      }
      option {
        color: #08111f;
      }
      button {
        border: 0;
        border-radius: 12px;
        background: #b8f34b;
        color: #08111f;
        padding: 13px 16px;
        font-weight: 800;
        cursor: pointer;
      }
      .kpis, .content {
        display: grid;
        gap: 14px;
      }
      .kpis {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin-top: 18px;
      }
      .card, .panel {
        border: 1px solid #dbe3ed;
        border-radius: 16px;
        background: white;
        padding: 18px;
      }
      .card span, .panel span {
        color: #64748b;
        font-size: 13px;
      }
      .card strong {
        display: block;
        margin-top: 10px;
        font-size: 30px;
      }
      .content {
        grid-template-columns: 1fr 1fr;
        margin-top: 18px;
      }
      .list {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }
      .source, .insight {
        border-radius: 12px;
        background: #f8fafc;
        padding: 14px;
      }
      .source h3, .insight h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }
      .source p, .insight p {
        margin: 0;
        color: #536174;
        line-height: 1.5;
      }
      .dark {
        background: #08111f;
        color: white;
      }
      .dark .insight {
        background: rgba(255, 255, 255, 0.08);
      }
      .dark .insight p {
        color: #cbd5e1;
      }
      footer {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        align-items: center;
        margin-top: 18px;
        border: 1px solid #dbe3ed;
        border-radius: 16px;
        background: white;
        padding: 16px 18px;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .actions button {
        background: #08111f;
        color: white;
        padding: 10px 12px;
      }
      @media (max-width: 860px) {
        body {
          padding: 10px;
        }
        .inner {
          padding: 18px;
        }
        header, footer {
          flex-direction: column;
        }
        .controls, .content, .kpis {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="screen">
      <div class="inner">
        <header>
          <div>
            <p class="eyebrow">ScreenOS Research</p>
            <h1>Embedded research cockpit</h1>
            <p class="lede">Run focused research inside ChatGPT, scan source signals, and move from messy inputs to decision-ready insight.</p>
          </div>
          <div class="command">
            <small>Command</small>
            <p>/screen research</p>
          </div>
        </header>

        <section class="controls">
          <label>Topic
            <input value="AI workflow tools for mid-market sales teams" />
          </label>
          <label>Source type
            <select>
              <option>Mixed sources</option>
              <option>News</option>
              <option>Reports</option>
              <option>Interviews</option>
            </select>
          </label>
          <label>Depth
            <select>
              <option>Deep dive</option>
              <option>Standard</option>
              <option>Fast scan</option>
            </select>
          </label>
          <button>Start Research</button>
        </section>

        <section class="kpis">
          <article class="card"><span>Sources Reviewed</span><strong>24</strong></article>
          <article class="card"><span>Signal Score</span><strong>91%</strong></article>
          <article class="card"><span>Emerging Themes</span><strong>5</strong></article>
          <article class="card"><span>Estimated Time</span><strong>7 min</strong></article>
        </section>

        <section class="content">
          <article class="panel">
            <span>Source Cards</span>
            <div class="list">
              <div class="source">
                <h3>Market Pulse Weekly</h3>
                <p>Recent funding shifts and buyer sentiment changes show budget protection for workflow-critical tools.</p>
              </div>
              <div class="source">
                <h3>AI Operator Index</h3>
                <p>Operators reward products that combine synthesis, traceability, and next-step actionability.</p>
              </div>
              <div class="source">
                <h3>Founder Transcript Set</h3>
                <p>Users want tighter handoff from insight to execution rather than generic summarization.</p>
              </div>
            </div>
          </article>

          <article class="panel dark">
            <span>Insight Cards</span>
            <div class="list">
              <div class="insight">
                <h3>Verticalized workflows are winning</h3>
                <p>Specialized products remain easier for buyers to understand, trust, and expand.</p>
              </div>
              <div class="insight">
                <h3>Trust features matter earlier</h3>
                <p>Source attribution and clear limits show up before broad automation permissions.</p>
              </div>
              <div class="insight">
                <h3>Speed alone is insufficient</h3>
                <p>Time saved converts best when paired with reusable outputs and crisp recommendations.</p>
              </div>
            </div>
          </article>
        </section>

        <footer>
          <div>
            <strong>Command Bar</strong>
            <p class="lede">Ready for tool-backed actions and structured research results.</p>
          </div>
          <div class="actions">
            <button>Save brief</button>
            <button>Export sources</button>
            <button>Share insight</button>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>`,
          _meta: {
            // Apps SDK component metadata is attached to the resource so ChatGPT
            // treats this HTML document as the iframe-rendered dashboard template.
            "openai/widgetDescription": "ScreenOS research dashboard",
            "openai/widgetDomain": WEB_APP_ORIGIN,
            "openai/widgetPrefersBorder": true,
            "openai/widgetCSP": {
              connect_domains: [WEB_APP_ORIGIN],
              resource_domains: [WEB_APP_ORIGIN]
            }
          }
        }
      ]
    })
  );

  server.registerTool(
    "open_screen",
    {
      title: "Open ScreenOS research dashboard",
      description: "Opens the ScreenOS research dashboard",
      inputSchema: {},
      _meta: {
        // Apps SDK renders the component when this metadata is present on the
        // tool descriptor and points at a readable text/html+skybridge resource.
        "openai/outputTemplate": DASHBOARD_RESOURCE_URI,
        "openai/toolInvocation/invoking": "Opening ScreenOS Research",
        "openai/toolInvocation/invoked": "Opened ScreenOS Research"
      }
    },
    async () => ({
      content: [
        {
          type: "text",
          text: "Opening the ScreenOS research dashboard."
        }
      ],
      structuredContent: {
        resource: {
          uri: DASHBOARD_RESOURCE_URI,
          mimeType: "text/html+skybridge",
          title: "ScreenOS Research",
          url: WEB_APP_URL
        }
      },
      _meta: {
        // Apps SDK UI metadata belongs on _meta so ChatGPT knows this tool returns
        // an embeddable component resource for the iframe-based dashboard pattern.
        "openai/outputTemplate": DASHBOARD_RESOURCE_URI
      }
    })
  );

  server.registerTool(
    "run_research",
    {
      title: "Run research",
      description: "Returns mock structured research data for the ScreenOS dashboard",
      inputSchema: {
        topic: z.string().min(2),
        depth: z.enum(["fast", "standard", "deep"]),
        sourceType: z.enum(["mixed", "news", "reports", "interviews"])
      },
      _meta: {
        // The research result hydrates the same dashboard component in ChatGPT.
        "openai/outputTemplate": DASHBOARD_RESOURCE_URI,
        "openai/toolInvocation/invoking": "Running ScreenOS research",
        "openai/toolInvocation/invoked": "ScreenOS research complete"
      }
    },
    async ({ topic, depth, sourceType }) => {
      const result = buildMockResearch({ topic, depth, sourceType });

      return {
        content: [
          {
            type: "text",
            text: `Prepared a mock ${depth} research brief for "${topic}".`
          }
        ],
        structuredContent: result,
        _meta: {
          // Apps SDK UI hydration metadata can also be attached here so the
          // embedded component can receive structured tool results directly.
          "openai/outputTemplate": DASHBOARD_RESOURCE_URI
        }
      };
    }
  );

  return server;
}

function withCorsHeaders(response: import("node:http").ServerResponse) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Mcp-Session-Id");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
}

async function readJsonBody(request: import("node:http").IncomingMessage) {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return undefined;
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function main() {
  const httpServer = createServer(async (request, response) => {
    withCorsHeaders(response);

    if (!request.url) {
      response.writeHead(400).end("Missing request URL");
      return;
    }

    const requestUrl = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

    if (request.method === "OPTIONS") {
      response.writeHead(204).end();
      return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/health") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          ok: true,
          name: "screenos",
          dashboardUrl: WEB_APP_URL,
          mcpEndpoint: "/mcp"
        })
      );
      return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          name: "screenos",
          status: "ready",
          endpoints: {
            health: "/health",
            mcp: "/mcp"
          }
        })
      );
      return;
    }

    if (requestUrl.pathname !== "/mcp") {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    try {
      const mcpServer = createScreenOsServer();
      const transport = new StreamableHTTPServerTransport({
        // Stateless mode is the safest fit for simple cloud deployments because
        // each request can be handled independently without sticky sessions.
        sessionIdGenerator: undefined
      });

      await mcpServer.connect(transport);
      response.on("close", () => {
        void transport.close();
      });

      if (request.method === "POST") {
        const body = await readJsonBody(request);
        await transport.handleRequest(request, response, body);
        return;
      }

      if (request.method === "GET") {
        response.writeHead(405, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            error: "GET is not supported on /mcp for this stateless transport"
          })
        );
        return;
      }

      if (request.method === "DELETE") {
        response.writeHead(405, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            error: "DELETE is not supported on /mcp for this stateless transport"
          })
        );
        return;
      }

      response.writeHead(405, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Method not allowed" }));
    } catch (error) {
      console.error("MCP request failed", error);

      if (!response.headersSent) {
        response.writeHead(500, { "Content-Type": "application/json" });
      }

      response.end(
        JSON.stringify({
          error: "Internal server error"
        })
      );
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`ScreenOS MCP server listening on http://localhost:${PORT}/mcp`);
    console.log(`ScreenOS health check available at http://localhost:${PORT}/health`);
    console.log(`ScreenOS dashboard target: ${WEB_APP_URL}`);
  });
}

main().catch((error) => {
  console.error("ScreenOS MCP server failed to start", error);
  process.exit(1);
});

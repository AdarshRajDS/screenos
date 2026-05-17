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
      html, body {
        margin: 0;
        height: 100%;
        background: #eef5fb;
      }
      iframe {
        border: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <iframe
      src="${WEB_APP_URL}"
      title="ScreenOS Research Dashboard"
      allow="clipboard-read; clipboard-write"
    ></iframe>
  </body>
</html>`,
          _meta: {
            // Apps SDK component metadata is attached to the resource so ChatGPT
            // treats this HTML document as the iframe-rendered dashboard template.
            "openai/widgetDescription": "ScreenOS research dashboard",
            "openai/widgetPrefersBorder": true,
            "openai/widgetCSP": {
              connect_domains: [],
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

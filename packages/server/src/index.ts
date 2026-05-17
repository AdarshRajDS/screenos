import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { buildMockResearch } from "./mock-data.js";

const WEB_APP_URL =
  process.env.SCREENOS_WEB_URL ?? "http://localhost:4173";
const WEB_APP_ORIGIN = new URL(WEB_APP_URL).origin;

const DASHBOARD_RESOURCE_URI = "ui://screenos/research-dashboard.html";

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
    mimeType: "text/html"
  },
  async () => ({
    contents: [
      {
        uri: DASHBOARD_RESOURCE_URI,
        mimeType: "text/html",
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
    inputSchema: {}
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
        mimeType: "text/html",
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("ScreenOS MCP server failed to start", error);
  process.exit(1);
});

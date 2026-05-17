# ScreenOS

ScreenOS is a demo OpenAI Apps SDK + remote MCP project that opens an embedded research dashboard inside ChatGPT when a user triggers `/screen research`.

## Stack

- `pnpm` monorepo
- `React + Vite + TypeScript + Tailwind` frontend
- `Node.js + TypeScript` remote MCP server
- iframe-compatible Apps SDK style UI resource metadata

## Workspace layout

- `apps/web`: ChatGPT-embedded dashboard UI
- `packages/server`: MCP server with `open_screen` and `run_research` tools

## Getting started

1. Install dependencies:

```bash
pnpm.cmd install
```

2. Start the dashboard app:

```bash
pnpm.cmd dev:web
```

3. Start the MCP server in another terminal:

```bash
pnpm.cmd dev:server
```

4. The remote MCP server starts on `http://localhost:8787/mcp`.

5. Optional: point the server at a different hosted dashboard URL:

```bash
$env:SCREENOS_WEB_URL="https://screenos-web-9138.vercel.app/"; pnpm.cmd dev:server
```

## Deploying the dashboard to Vercel

This repo is prepared so Vercel builds the frontend from the monorepo root and publishes `apps/web/dist`.

1. Import the GitHub repo into Vercel
2. Keep the project root as the repository root
3. Vercel will use:

```bash
Install Command: pnpm install
Build Command: pnpm vercel-build
Output Directory: apps/web/dist
```

4. After deploy, set the MCP server environment variable to your deployed app URL:

```bash
SCREENOS_WEB_URL=https://your-vercel-project.vercel.app
```

Note: this Vercel setup publishes the dashboard UI. ChatGPT app embedding still requires the MCP server to be reachable remotely over HTTP, not local stdio.

## Deploying the MCP server

The frontend is already suitable for Vercel. The MCP server should be deployed as a public Node service on a platform such as Railway, Render, Fly.io, or another host that supports long-running HTTP services.

A Docker image is included in [Dockerfile](/C:/Users/Admin/Documents/gptApps/ScreenAp/Dockerfile:1) for hosts that deploy from containers.

Required environment variables:

```bash
PORT=8787
SCREENOS_WEB_URL=https://screenos-web-9138.vercel.app/
```

For local Windows PowerShell use:

```powershell
$env:PORT="8787"
$env:SCREENOS_WEB_URL="https://screenos-web-9138.vercel.app/"
pnpm.cmd dev:server
```

Important URLs after deploy:

- MCP endpoint: `https://your-server-domain.com/mcp`
- Health check: `https://your-server-domain.com/health`

In ChatGPT Developer mode, connect the remote MCP server using the deployed `/mcp` URL.

## Scripts

- `pnpm dev`: run web and server together
- `pnpm dev:web`: run the Vite dashboard
- `pnpm dev:server`: run the MCP server in watch mode
- `pnpm build`: build all packages
- `pnpm check`: type-check all packages

## MCP tools

### `open_screen`

- Description: opens the ScreenOS research dashboard
- Returns Apps SDK style UI resource metadata including the dashboard resource URI and iframe URL

### `run_research`

- Inputs: `topic`, `depth`, `sourceType`
- Returns mock structured research data for dashboard hydration

## Apps SDK notes

The important ChatGPT Apps SDK metadata is attached in [packages/server/src/index.ts](/C:/Users/Admin/Documents/gptApps/ScreenAp/packages/server/src/index.ts):

- `openai/outputTemplate` on `open_screen`
- `openai/outputTemplate` on `run_research`

Those `_meta` fields are where the UI resource attachment happens for the embedded dashboard pattern.

## GitHub and Vercel files

- Root Vercel config: [vercel.json](/C:/Users/Admin/Documents/gptApps/ScreenAp/vercel.json)
- Frontend app: [apps/web](/C:/Users/Admin/Documents/gptApps/ScreenAp/apps/web)
- MCP server: [packages/server](/C:/Users/Admin/Documents/gptApps/ScreenAp/packages/server)

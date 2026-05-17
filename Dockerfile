FROM node:20-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json .npmrc ./
COPY apps/web/package.json ./apps/web/package.json
COPY packages/server/package.json ./packages/server/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

ENV PORT=8787
ENV SCREENOS_WEB_URL=https://screenos-web-9138-ezbxs77bs-adarsh-raj-s-projects2.vercel.app/

EXPOSE 8787

CMD ["pnpm", "--filter", "@screenos/server", "start"]

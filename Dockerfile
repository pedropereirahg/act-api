# syntax=docker/dockerfile:1

FROM node:18.7-alpine AS base
ENV CI=true
RUN apk --no-cache add libc6-compat
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  npm install -g pnpm@7
RUN pnpm config set auto-install-peers true

FROM base as deps
WORKDIR /app
COPY pnpm-lock.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm fetch \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"

FROM deps as build
WORKDIR /app
COPY package.json ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --offline \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
COPY . .
RUN pnpm build

FROM deps
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --prod --offline \
  | grep -v "cross-device link not permitted\|Falling back to copying packages from store"
EXPOSE 3000
CMD ["node", "dist/main"]

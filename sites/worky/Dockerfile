# Worky — Next.js 15 (SSR: API /api/apply + OG dinámico), a diferencia del resto
# del monorepo que es nginx estático. Imagen Node mínima vía build "standalone".
# Cloud Run inyecta PORT (=8080 por --port); server.js de Next lo respeta.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER node
EXPOSE 8080
CMD ["node", "server.js"]

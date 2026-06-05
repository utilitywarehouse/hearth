FROM node:26-alpine AS base
WORKDIR /app

FROM base AS builder-base
ENV PNPM_HOME=/usr/local/pnpm
ENV PATH="${PNPM_HOME}/bin:${PATH}"
RUN apk add --no-cache \
    python3 \
    make \
    && rm -rf /var/cache/apk/* \
    && rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && npm install -g corepack@0.34.5
RUN corepack enable && corepack prepare pnpm@11.0.5 --activate
RUN pnpm install turbo@2.9.12 --global
RUN turbo telemetry disable
RUN --mount=type=secret,id=npm_token,env=NPM_TOKEN \
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > $HOME/.npmrc
COPY . .

FROM builder-base AS builder
RUN pnpm install --prod=false --frozen-lockfile
RUN pnpm run build:storybook

FROM builder-base AS prod-deps
RUN pnpm --filter server-storybook-docs --prod deploy --legacy --frozen-lockfile /out

FROM base AS runner
# Set WORKDIR to /app so everything is relative to the root
WORKDIR /app
ARG APP_PORT=7337
ENV PORT=${APP_PORT}
ENV NODE_ENV=production

# This ensures node_modules is at /app/apps/server-storybook-docs/node_modules
COPY --from=prod-deps /out ./apps/server-storybook-docs

COPY --from=builder /app/packages ./packages

# Copy the compiled JS into its original subdirectory
COPY --from=builder /app/apps/server-storybook-docs/dist ./apps/server-storybook-docs/dist

# Copy static assets
COPY --from=builder /app/apps/storybook-docs/storybook-static ./apps/storybook-docs/storybook-static
COPY --from=builder /app/apps/storybook-assets/storybook-static ./apps/storybook-assets/storybook-static
COPY --from=builder /app/apps/storybook-icons/storybook-static ./apps/storybook-icons/storybook-static
COPY --from=builder /app/packages/react/storybook-static ./packages/react/storybook-static
COPY --from=builder /app/packages/react-native/storybook-static ./packages/react-native/storybook-static

EXPOSE ${APP_PORT}

CMD ["node", "apps/server-storybook-docs/dist/index.js"]

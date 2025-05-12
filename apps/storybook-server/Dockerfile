# ---- Builder Stage ----
FROM node:20-alpine AS builder

# Install git, as turbo can sometimes require it
RUN apk add --no-cache git

# Install and activate pnpm
RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

# Set working directory for the build stage
WORKDIR /src

# Copy monorepo configuration files that define the workspace and dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Install all dependencies (including devDependencies for building)
# This installs based on pnpm-lock.yaml for the entire workspace
RUN pnpm install --frozen-lockfile

# Copy the rest of the monorepo source code
# Adjust these COPY commands if your build needs more or fewer directories
COPY apps ./apps
COPY packages ./packages
COPY patches ./patches
COPY shared ./shared

# Run the main build command from the root package.json ("build": "turbo build")
# This should build all storybook-static outputs and the storybook-server (apps/storybook-server/dist)
RUN pnpm run build

# ---- Final Stage ----
FROM node:20-alpine

# Set Node environment to production
ENV NODE_ENV=production

# Set the port for the application. Default to 7337 as per your recent change.
ARG APP_PORT=7337
ENV PORT=${APP_PORT}

# Set working directory for the final application
WORKDIR /app

# Install and activate pnpm (needed for installing server's production dependencies)
RUN corepack enable && corepack prepare pnpm@9.15.2 --activate

# Copy root configuration files for pnpm workspace context
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the storybook-server's package.json to its workspace location
# This is needed for the filtered pnpm install to work correctly
COPY apps/storybook-server/package.json ./apps/storybook-server/package.json

# Install *only* production dependencies for storybook-server and its workspace dependencies.
# The "..." after the filter is crucial for pnpm to include dependencies of the target package.
RUN pnpm install --prod --frozen-lockfile --filter=storybook-server...

# Copy the built application code for storybook-server from the builder stage
COPY --from=builder /src/apps/storybook-server/dist ./apps/storybook-server/dist

# Copy all the necessary storybook-static directories from the builder stage.
# These paths must match what the server expects relative to the project root (/app in Docker).
COPY --from=builder /src/apps/storybook-docs/storybook-static ./apps/storybook-docs/storybook-static
COPY --from=builder /src/apps/storybook-react/storybook-static ./apps/storybook-react/storybook-static
COPY --from=builder /src/apps/storybook-icons/storybook-static ./apps/storybook-icons/storybook-static
COPY --from=builder /src/apps/storybook-tokens/storybook-static ./apps/storybook-tokens/storybook-static
COPY --from=builder /src/apps/storybook-fonts/storybook-static ./apps/storybook-fonts/storybook-static
COPY --from=builder /src/packages/react-native/storybook-static ./packages/react-native/storybook-static
# Add any other storybook-static locations here if they are served by the app

# Expose the port the app runs on
EXPOSE ${APP_PORT}

# Command to run the server
# The server's main file is apps/storybook-server/dist/index.js
CMD ["node", "apps/storybook-server/dist/index.js"]

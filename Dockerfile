# Multi-stage Docker build for Next.js taskapp with external projects

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory for main app
WORKDIR /app

# Copy package files for main app
COPY package.json yarn.lock* ./

# Install dependencies for main app
RUN yarn install --frozen-lockfile

# Copy main app source code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Production stage
FROM node:18-alpine AS runner

# Install necessary tools
RUN apk add --no-cache bash

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create apps directory for external projects (as root before switching user)
RUN mkdir -p /apps

# Copy external projects from build context (must be done as root)
# fyve-smart-links project
COPY ./apps/fyve-smart-links /apps/fyve-smart-links

# Install dependencies for external projects (as root)
WORKDIR /apps/fyve-smart-links
RUN yarn install --frozen-lockfile --production

# Create necessary directories for external projects
RUN mkdir -p downloads public views

# Set ownership of apps directory to nextjs user
RUN chown -R nextjs:nodejs /apps

# Set working directory for main app
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Create public directory if it doesn't exist
RUN mkdir -p ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
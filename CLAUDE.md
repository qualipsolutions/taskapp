# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaskApp is a Next.js 14 application (App Router) with TypeScript that provides an open-source task automation platform. The application serves as a landing page and includes an API endpoint for executing shell commands asynchronously.

## Architecture

### Core Stack
- **Framework**: Next.js 14.2.14 (App Router, standalone output mode)
- **Language**: TypeScript 5 with strict mode enabled
- **Styling**: Tailwind CSS 3.4.1 with dark mode support
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Runtime**: Node.js 18 (Alpine Linux in containers)

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with Geist fonts
│   ├── page.tsx                # Landing page entry point
│   └── api/run/route.ts        # Shell command execution API
├── components/
│   ├── ui/                     # Reusable UI components (button, card)
│   └── LandingPage.tsx         # Main landing page component
└── lib/
    ├── utils.ts                # Tailwind class merging utilities
    └── exec.ts                 # Command execution helpers

apps/
└── fyve-smart-links/           # External Node.js project with Puppeteer
```

### Path Aliases
- `@/*` resolves to `./src/*` (configured in [tsconfig.json:21](tsconfig.json#L21))

### External Projects
The `apps/` directory contains external projects that are copied during Docker builds:
- **fyve-smart-links**: Node.js API using Puppeteer for web scraping
- Mounted at `/apps/fyve-smart-links` in containers
- Uses system Chromium (`/usr/bin/chromium-browser`) for headless operations

## Development Commands

### Standard Development
```bash
# Start development server on port 8080
npm run dev
# or
yarn dev

# Build production bundle
npm run build
# or
yarn build

# Start production server on port 8080
npm start
# or
yarn start

# Run ESLint
npm run lint
# or
yarn lint
```

## Docker & Deployment

### Multi-Stage Build Strategy
The Dockerfile uses a 3-stage build process:
1. **builder**: Compiles Next.js app in standalone mode
2. **external-deps**: Prepares external projects with Puppeteer support
3. **runner**: Final production image with Chromium dependencies

### Deployment Script
```bash
# Build and push to Docker Hub
./deploy.sh v1.5.0

# Build only (test locally)
./deploy.sh v1.5.0 --dry-run

# Push existing image
./deploy.sh v1.5.0 --push
```

The deploy script:
- Always builds for `linux/amd64` platform (required for cloud deployments)
- Cleans and copies fresh external projects before building
- Requires Docker buildx for multi-platform builds
- Publishes to `qualipsolutions/taskapp` on Docker Hub

### Container Paths
- Main app: `/app`
- External projects: `/apps/`
- fyve-smart-links: `/apps/fyve-smart-links`

Commands must use container paths, e.g.:
```bash
# ❌ Wrong (local path)
cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave

# ✅ Correct (container path)
cd /apps/fyve-smart-links && yarn prod:presave
```

## API Design

### POST /api/run
Executes shell commands asynchronously using in-memory task tracking.

**Request Body**:
```json
{
  "task": "task_name",
  "command": "command_to_run"
}
```

**Behavior**:
- Returns immediately with status while command runs in background
- Prevents duplicate execution of same task using `Map<string, boolean>`
- Uses `shell-exec` package for command execution
- Does NOT wait for command completion before responding

**Responses**:
- `200`: Command execution started
- `400`: Missing command or task
- `409`: Task already running
- `500`: Error processing request

**Important**: The in-memory task store (`runningCommands`) will reset on server restart. Consider implementing persistent storage for production use.

## Styling System

### Tailwind Configuration
- **Dark Mode**: Class-based (`dark` class on `<body>`)
- **Design Tokens**: HSL-based CSS variables for theming
- **Animations**: Powered by `tailwindcss-animate`
- **Global Styles**: Defined in `src/app/globals.css`

### UI Components
Uses shadcn/ui convention with Radix UI primitives:
- Components in `src/components/ui/`
- Styled with `class-variance-authority` for variant management
- Utility function `cn()` in `lib/utils.ts` for conditional classes

## Key Configuration

### Next.js Config
- **Output Mode**: `standalone` for optimized Docker deployments (see [next.config.mjs:3](next.config.mjs#L3))
- **Development Port**: 8080 (configured in package.json scripts)
- **Production Port**: 8080 (set via `PORT` environment variable)

### TypeScript Config
- **Strict Mode**: Enabled
- **Module Resolution**: `bundler`
- **JSX**: `preserve` (handled by Next.js)
- **Incremental Compilation**: Enabled

## Important Development Notes

### Shell Command Execution
When working with the `/api/run` endpoint:
- Commands execute in the container's shell environment
- No validation or sandboxing is implemented
- Be cautious with user input to prevent command injection
- Consider security implications for production deployments

### External Project Integration
The fyve-smart-links app requires:
- Puppeteer with Chromium dependencies
- Production dependencies installed (devDependencies stripped)
- Environment files (`.env`, `.env.prod`) for configuration
- Writable directories: `downloads/`, `public/`, `views/`

### Font Loading
- Uses Next.js `localFont` for Geist Sans and Geist Mono
- Font files located in `src/app/fonts/`
- Applied via CSS variables: `--font-geist-sans`, `--font-geist-mono`

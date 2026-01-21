# Running All Applications

This guide explains how to run all applications in the monorepo.

## Prerequisites

Ensure you have Node.js and npm installed on your system.

```bash
node --version  # v18+
npm --version   # v9+
```

## Installation

First, install all dependencies:

```bash
npm run install:all
```

This will install dependencies for all packages in the monorepo.

## Running Applications

### Option 1: Run All Applications in Parallel (Recommended)

#### On Linux/macOS:
```bash
npm run dev:parallel
```

This will start:
- **Shell Container**: http://localhost:5173
- **App 1**: http://localhost:5174
- **App 2**: http://localhost:5175
- **App 3**: http://localhost:5176

#### On Windows:
```bash
scripts\run-all-windows.bat
```

This will open separate command windows for each application.

### Option 2: Run All Applications with Workspaces

```bash
npm run dev:all
```

This runs all workspaces in dev mode simultaneously.

### Option 3: Run Individual Applications

Run a specific application only:

```bash
# Shell Container
npm run dev:shell

# App 1
npm run dev:app1

# App 2
npm run dev:app2

# App 3
npm run dev:app3
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install all dependencies |
| `npm run dev:parallel` | Run all apps in parallel (Linux/macOS) |
| `npm run dev:all` | Run all workspaces in dev mode |
| `npm run dev:shell` | Run shell container only |
| `npm run dev:app1` | Run app1 only |
| `npm run dev:app2` | Run app2 only |
| `npm run dev:app3` | Run app3 only |
| `npm run build` | Build all packages |
| `npm run build:shell` | Build shell container only |
| `npm run preview` | Preview all built applications |
| `npm run lint` | Run ESLint on all packages |

## Application Architecture

### Shell Container (Port 5173)
- Main entry point for the micro-frontend architecture
- Hosts the dashboard with cards from applications
- Provides left sidebar navigation
- Manages tabbed layout for displaying applications

### Common Library
- Shared Redux store
- Shared hooks (`useCardManager`, `useTabManager`)
- Shared types and utilities
- Shared Redux slices (dashboard, navigation, tabs)

### Sample Applications (Ports 5174-5176)
- App 1, App 2, App 3
- Each exposes a card interface
- Bundled separately for minimal load time
- Can be loaded dynamically into the shell container

## Troubleshooting

### Port Already in Use
If a port is already in use, you can specify a different port:

```bash
PORT=3000 npm run dev:shell
PORT=3001 npm run dev:app1
```

### Dependencies Not Installed
Make sure to run:
```bash
npm install
```

### Clear Cache
If you encounter issues with the build cache:

```bash
npm run clean  # if available
rm -rf node_modules
npm install
npm run dev:parallel
```

### Check Node Version
Ensure you're using Node.js v18 or higher:

```bash
node --version
nvm use 18  # if using nvm
```

## Development Workflow

1. Start all applications:
   ```bash
   npm run dev:parallel
   ```

2. Open shell container in browser:
   ```
   http://localhost:5173
   ```

3. The dashboard will display cards from all applications
4. Click on a card to load the application in a tab
5. Use the left navigation to switch between dashboard and applications

## Building for Production

Build all applications:
```bash
npm run build
```

Build only shell container:
```bash
npm run build:shell
```

## Next Steps

- Check individual package READMEs in `packages/*/`
- Review the architecture documentation
- Start developing your applications

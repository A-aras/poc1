# Webpack Module Federation Migration

## Overview

This project has been migrated from Vite to Webpack with Module Federation support for true micro-frontend architecture.

## Architecture

### Module Federation Structure

```
Shell Container (Host) - Port 5173
├── app1 (Remote) - Port 5174
├── app2 (Remote) - Port 5175
└── app3 (Remote) - Port 5176
```

**Host (Shell Container)**:
- Runs on port 5173
- Exposes: None (acts as a host container)
- Consumes: app1, app2, app3 remote modules
- Shares: react, react-dom, @reduxjs/toolkit, react-redux, @mui/material, @monorepo/common

**Remotes (App1, App2, App3)**:
- App1: Port 5174
- App2: Port 5175  
- App3: Port 5176
- Each exposes:
  - `./App`: React component for detailed app view
  - `./cards`: Cards interface module (getAppXCards() function)
- Shares: Same dependencies as host

## Key Changes

### 1. Webpack Configuration

Each package now has a `webpack.config.js`:

- **Shell**: Configured as Module Federation host
  - Declares remotes pointing to app servers
  - Sets up CORS headers for cross-origin loading
  
- **Apps (app1, app2, app3)**: Configured as Module Federation remotes
  - Each exposes `./App` and `./cards` modules
  - Enables dynamic loading at runtime
  - Supports independent deployment

### 2. Entry Point Pattern

Module Federation requires a two-stage bootstrap:

```
index.tsx → Dynamic Import → bootstrap.tsx → React App
```

- `index.tsx`: Imports bootstrap asynchronously (enables Module Federation sharing)
- `bootstrap.tsx`: Actual React entry point with Provider and App component

This allows proper initialization of shared scopes.

### 3. Dynamic Module Loading

Dashboard now uses Module Federation's dynamic loading instead of direct imports:

```typescript
// Old approach (Vite direct imports)
const app1Module = await import('../../../app1/src/app1.ts');
const app1Cards = app1Module.getApp1Cards();

// New approach (Module Federation runtime loading)
await new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = 'http://localhost:5174/remoteEntry.js';
  script.onload = resolve;
  script.onerror = reject;
  document.body.appendChild(script);
});

const module = await loadRemoteModule('app1', './cards');
const cardFn = module.default || module.getApp1Cards;
const remoteCards = cardFn();
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm 8+

### Installation

```bash
npm install
```

### Running Applications

**Individual apps:**
```bash
npm run dev:shell     # Shell on port 5173
npm run dev:app1      # App 1 on port 5174
npm run dev:app2      # App 2 on port 5175
npm run dev:app3      # App 3 on port 5176
```

**All apps in parallel:**
```bash
npm run dev:parallel
```

This will start all 4 servers simultaneously with proper initialization sequence.

### Building

```bash
npm run build         # Build all packages
npm run build:shell   # Build shell only
```

## File Structure

```
packages/
├── common/           # Shared library (no changes needed for MF)
├── shell/
│   ├── webpack.config.js      # Host configuration
│   ├── src/
│   │   ├── index.tsx          # Module Federation entry
│   │   ├── bootstrap.tsx       # React entry point
│   │   ├── App.tsx            # Main layout
│   │   └── pages/Dashboard.tsx # Updated for remote loading
│   └── index.html
├── app1/
│   ├── webpack.config.js      # Remote configuration
│   ├── src/
│   │   ├── index.tsx          # Bootstrap entry
│   │   ├── bootstrap.tsx       # React entry point
│   │   ├── App.tsx            # Detailed view component
│   │   ├── app1.ts            # Card definitions
│   │   └── index.ts           # Exports
│   └── package.json
├── app2/               # Same structure as app1
└── app3/               # Same structure as app1
```

## Key Configuration Details

### Shared Dependencies

All packages share core dependencies to ensure single instance:

```javascript
shared: {
  react: { singleton: true, requiredVersion: '^18.2.0' },
  'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  '@reduxjs/toolkit': { singleton: true },
  'react-redux': { singleton: true },
  '@mui/material': { singleton: true },
  '@monorepo/common': { singleton: true },  // Shell only
}
```

**singleton: true** ensures only one version of each package is loaded, even if multiple versions are available.

### RemoteEntry Loading

Each remote app generates a `remoteEntry.js` at build/dev time:

```
http://localhost:5174/remoteEntry.js  → app1
http://localhost:5175/remoteEntry.js  → app2
http://localhost:5176/remoteEntry.js  → app3
```

These expose the federated modules and must be loaded before accessing remote code.

## Benefits of Module Federation

1. **Independent Deployment**: Each app can be deployed separately
2. **Runtime Module Loading**: Apps can be updated without rebuilding host
3. **Shared Dependencies**: Reduces bundle size through shared libraries
4. **True Micro-frontend**: Apps are truly isolated with clear interfaces
5. **Scalability**: Easy to add new remote applications

## Troubleshooting

### Remote modules not loading

1. Ensure all 4 servers are running on correct ports (5173-5176)
2. Check browser console for CORS errors
3. Verify remoteEntry.js is accessible at `http://localhost:PORT/remoteEntry.js`

### Shared dependencies conflicts

- Check `singleton: true` in webpack configs
- Verify version compatibility in package.json files
- Clear `node_modules` and reinstall if issues persist

### Port conflicts

- Change ports in individual `webpack.config.js` files
- Update port references in shell's webpack.config.js remotes section
- Update `run-all.sh` with new port numbers

## Further Enhancements

Potential improvements:

1. Add service worker for offline support
2. Implement lazy-loaded remote container
3. Add monitoring/analytics for remote module loading
4. Setup CDN delivery for remote apps
5. Add authentication layer for remote modules
6. Implement fallback/error boundaries for failed remote loads

## References

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)
- [Best Practices](https://webpack.js.org/concepts/module-federation/#troubleshooting)

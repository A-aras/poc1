# Webpack Module Federation - Quick Reference

## Changed Files

### Webpack Configurations Added
- `packages/shell/webpack.config.js` - Host configuration
- `packages/app1/webpack.config.js` - Remote configuration
- `packages/app2/webpack.config.js` - Remote configuration
- `packages/app3/webpack.config.js` - Remote configuration

### Package.json Updates
All packages updated to:
- Remove Vite dependencies (`vite`, `@vitejs/plugin-react`)
- Add Webpack dependencies (`webpack`, `webpack-cli`, `webpack-dev-server`)
- Add Babel loaders for TypeScript/JSX compilation
- Update scripts: `dev` now runs `webpack serve` instead of `vite`

### Bootstrap Pattern
Each app now requires two-stage bootstrap:

**New File**: `packages/[package]/src/bootstrap.tsx`
- Contains actual React entry point
- Imported dynamically by `index.tsx`

**Updated File**: `packages/[package]/src/index.tsx` (shell only)
- Asynchronously imports `./bootstrap`
- Enables Module Federation scope initialization

### App Components
**New File**: `packages/app1/src/App.tsx` (and app2, app3)
- Detailed view component for when app is opened in tab
- Displays all cards for that app
- Material-UI Grid layout

### Dashboard Updates
**Modified**: `packages/shell/src/pages/Dashboard.tsx`
- Replaced direct imports with Module Federation runtime loading
- Uses remoteEntry.js for dynamic module loading
- Shares dependencies via webpack config

## Commands

### Development
```bash
npm run dev:parallel    # All 4 apps (shell + 3 remotes)
npm run dev:shell       # Shell only
npm run dev:app1        # App 1 only
```

### Building
```bash
npm run build           # All packages
```

## Architecture

```
SHELL (5173) [Host]
  │
  ├─→ APP1 (5174) [Remote]
  │   - Exposes: ./App, ./cards
  │
  ├─→ APP2 (5175) [Remote]
  │   - Exposes: ./App, ./cards
  │
  └─→ APP3 (5176) [Remote]
      - Exposes: ./App, ./cards

Shared: react, react-dom, @reduxjs/toolkit, @mui/material, etc.
```

## Key Differences from Vite

| Aspect | Vite | Webpack MF |
|--------|------|-----------|
| Build Tool | Vite | Webpack 5 |
| Module Resolution | Direct imports | RemoteEntry.js |
| Shared Deps | Path aliases | Module Federation shared |
| Deployment | Single bundle | Independent deployment |
| Entry Point | Direct React | Two-stage bootstrap |
| Cards Loading | Static imports | Dynamic runtime loading |

## Next Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start all apps:
   ```bash
   npm run dev:parallel
   ```

3. Open shell: `http://localhost:5173`

4. Dashboard should load cards from all 3 remote apps

5. Click cards to open apps in tabs

## Shared Dependencies

Configured with `singleton: true` to ensure single instance:
- react
- react-dom
- @reduxjs/toolkit
- react-redux
- @mui/material
- @emotion/react
- @emotion/styled
- @monorepo/common (shell only)

This reduces bundle size and ensures state consistency across remotes.

## Module Federation Flow

1. Shell loads (5173)
2. Dashboard mounts
3. For each remote (app1, app2, app3):
   - Load remoteEntry.js from `http://localhost:PORT/remoteEntry.js`
   - Initialize shared scope
   - Get ./cards module
   - Call getAppXCards() function
   - Display cards in dashboard

4. On card click:
   - Open app in new tab
   - Load ./App module from remote
   - Render detailed view
   - Can access Redux store (shared dependency)

## Important Notes

- All webpack configs use `publicPath: 'auto'` for automatic path resolution
- CORS headers enabled for cross-origin module loading
- Source maps enabled for debugging (`devtool: 'source-map'`)
- Hot module replacement enabled on webpack-dev-server
- Babel configured for React 18 with automatic JSX transform

# React Vite Micro-frontend Monorepo

A comprehensive micro-frontend architecture built with React, TypeScript, Vite, Redux, and Material-UI. This project demonstrates a scalable approach to building large applications using independent, bundled micro-applications.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Shell Container (Main App)          │
├─────────────────────────────────────────────┤
│  ┌──────────────────┐   ┌────────────────┐  │
│  │  Left Navigation │   │  Tab Container │  │
│  │   - Dashboard    │   │ - Dashboard Tab│  │
│  │   - Apps         │   │ - App Tabs     │  │
│  │   - Settings     │   │                │  │
│  └──────────────────┘   └────────────────┘  │
└─────────────────────────────────────────────┘
           ▼               ▼               ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │  App 1   │  │  App 2   │  │  App 3   │
     │ (Cards)  │  │ (Cards)  │  │ (Cards)  │
     └──────────┘  └──────────┘  └──────────┘
           ▼               ▼               ▼
     ┌──────────────────────────────────────┐
     │       Common Library (Shared)        │
     │ - Redux Store & Slices               │
     │ - Types & Interfaces                 │
     │ - Custom Hooks (useCardManager, ...) │
     │ - Utilities                          │
     └──────────────────────────────────────┘
```

## 📦 Project Structure

```
poc1/
├── packages/
│   ├── common/                 # Shared library
│   │   ├── src/
│   │   │   ├── types/         # TypeScript types and Zod schemas
│   │   │   ├── store/         # Redux store configuration
│   │   │   │   ├── dashboardSlice.ts
│   │   │   │   ├── tabsSlice.ts
│   │   │   │   ├── navigationSlice.ts
│   │   │   │   └── hooks.ts
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   │   ├── useCardManager.ts
│   │   │   │   └── useTabManager.ts
│   │   │   └── index.ts       # Main export
│   │   └── package.json
│   │
│   ├── shell/                  # Main shell container
│   │   ├── src/
│   │   │   ├── App.tsx         # Main layout with tabs and navigation
│   │   │   ├── pages/
│   │   │   │   └── Dashboard.tsx
│   │   │   ├── components/
│   │   │   │   └── AppContainer.tsx
│   │   │   ├── main.tsx
│   │   │   └── main.css
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── app1/                   # Sample Application 1
│   │   ├── src/
│   │   │   ├── app1.ts        # App implementation & card export
│   │   │   └── index.ts
│   │   ├── vite.config.ts     # Builds as library
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── app2/                   # Sample Application 2
│   │   └── ...
│   │
│   └── app3/                   # Sample Application 3
│       └── ...
│
└── package.json               # Root monorepo package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm 8+

### Installation

```bash
# Install dependencies for all packages
npm install
```

### Development

```bash
# Start shell container dev server
npm run dev --workspace=@monorepo/shell
```

The shell container will be available at `http://localhost:5173`

### Production Build

```bash
# Build all packages
npm run build --workspaces

# Build specific package
npm run build --workspace=@monorepo/shell
```

## 📋 Key Features

### 1. **Shell Container** (`packages/shell`)
- Main entry point for the micro-frontend application
- **Left Sidebar Navigation** - Navigate between dashboard and applications
- **Tabbed Interface** - Open multiple applications simultaneously
- **Dashboard Tab** - Always available to return to card view
- Redux state management for tabs and navigation
- Material-UI based responsive layout

### 2. **Common Library** (`packages/common`)
Provides shared functionality across all applications:

#### Types & Interfaces
- `Card` - Interface that all applications must expose
- `TabItem` - Tab configuration
- `NavigationItem` - Navigation menu items
- `RootState` - Global Redux state shape

#### Redux Store
- **dashboardSlice** - Cards state management
- **tabsSlice** - Tab state management
- **navigationSlice** - Navigation state management

#### Custom Hooks
- `useCardManager()` - Manage cards
- `useTabManager()` - Manage tabs
- `useAppDispatch()` - Typed dispatch hook
- `useAppSelector()` - Typed selector hook

### 3. **Micro-applications** (`packages/app1`, `app2`, `app3`)
Each application:
- Exposes a `getCards()` function that returns an array of `Card` objects
- Implements a `bootstrap(element)` function to render in container
- Bundled separately for independent deployment
- Shared access to Redux store via common library

#### Example Card Structure
```typescript
{
  id: 'app1-card-1',
  title: 'User Management',
  description: 'Manage users and their permissions',
  icon: 'People',
  appName: 'Application 1',
  order: 1,
  metadata: { feature: 'users' }
}
```

## 🔄 User Flow

1. **User opens the shell** → Dashboard displayed with navigation sidebar
2. **Dashboard shows cards** → Aggregated from all three applications
3. **User clicks a card** → 
   - New tab opens with application name
   - Application rendered in tab
   - Dashboard remains available as separate tab
4. **User navigates via sidebar** → 
   - Navigation selection updates
   - Can switch between open tabs
5. **User closes tab** → 
   - Tab closes, dashboard becomes active (if not already)
   - Application state can be maintained via Redux

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Redux Toolkit** | State management |
| **React Redux** | Redux bindings for React |
| **Material-UI (MUI)** | Component library |
| **React Hook Form** | Form state management |
| **Zod** | Runtime type validation |
| **Axios** | HTTP client |
| **npm workspaces** | Monorepo management |

## 📝 Redux State Structure

```typescript
{
  dashboard: {
    cards: Card[],
    isLoading: boolean,
    error: string | null,
    selectedCard: Card | null
  },
  tabs: {
    tabs: TabItem[],
    activeTabId: string
  },
  navigation: {
    items: NavigationItem[],
    selectedItemId: string | null
  }
}
```

## 🎯 Extending the Architecture

### Adding a New Application

1. Create package: `packages/app4`
2. Implement `getCards()` export
3. Implement `bootstrap()` function
4. Add to root `package.json` workspaces
5. Update navigation in `navigationSlice.ts`

### Adding New Redux Slices

1. Create new file in `packages/common/src/store/newFeatureSlice.ts`
2. Export in `packages/common/src/store/index.ts`
3. Use `useAppSelector` and `useAppDispatch` in components

### Creating Custom Hooks

Add to `packages/common/src/hooks/` and export in `packages/common/src/hooks/index.ts`

## 🔐 Type Safety

All applications and the shell use TypeScript with strict mode enabled. The common library exports all necessary types for consistency.

## 📊 Loading Strategy

- **Cards are bundled separately** from application logic
- Dashboard loads all cards upfront for quick preview
- Applications are loaded on-demand when selected
- Redux state is shared across all open applications

## 🚀 Deployment

### Shell Container
```bash
npm run build --workspace=@monorepo/shell
# Deploy dist/ folder to web server
```

### Micro-applications
```bash
npm run build --workspace=@monorepo/app1
npm run build --workspace=@monorepo/app2
npm run build --workspace=@monorepo/app3
# Deploy each app1.umd.js, app2.umd.js, app3.umd.js to CDN or server
```

## 📚 Documentation

- [Redux Documentation](https://redux.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## 📄 License

MIT

---

**Built with ❤️ using modern React architecture patterns**

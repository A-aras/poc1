# Quick Start Guide ⚡

## 1️⃣ Start All Applications

### Option A: Linux/macOS
```bash
npm run dev:parallel
```

### Option B: Windows
```bash
scripts\run-all-windows.bat
```

### Option C: Individual Terminals
```bash
# Terminal 1 - Shell Container
npm run dev:shell

# Terminal 2 - App 1
npm run dev:app1

# Terminal 3 - App 2
npm run dev:app2

# Terminal 4 - App 3
npm run dev:app3
```

## 2️⃣ Open in Browser

**Shell Container (Main App):**
```
http://localhost:5173
```

All applications will be accessible through the shell container.

## 3️⃣ Test the Application

1. Open http://localhost:5173
2. You should see a dashboard with:
   - **Left Sidebar** - Navigation menu
   - **Main Area** - Dashboard tab with cards (currently empty as demo)
   - **Top Bar** - Application title

3. Click on navigation items to switch views
4. Open application cards to display them in tabs

## 📋 Available Ports

| Service | Port |
|---------|------|
| Shell Container | 5173 |
| App 1 | 5174 |
| App 2 | 5175 |
| App 3 | 5176 |

## 🛠️ Development

### Edit Shell Container
- File: `packages/shell/src/App.tsx`
- Changes auto-reload at http://localhost:5173

### Edit Common Library
- Files: `packages/common/src/**`
- Used by all applications

### Edit Applications
- App 1: `packages/app1/src/`
- App 2: `packages/app2/src/`
- App 3: `packages/app3/src/`

### Add Cards to Applications

Edit the card export in each app:

**App 1:** `packages/app1/src/app1.ts` → `getApp1Cards()`

```typescript
export const getApp1Cards = (): Card[] => {
  return [
    {
      id: 'app1-card-1',
      title: 'Your Feature',
      description: 'Feature description',
      icon: 'Settings',
      appName: 'Application 1',
      order: 1,
    },
    // Add more cards...
  ];
};
```

## 🏗️ Project Structure

```
common/       → Shared Redux store, hooks, types
shell/        → Main container app
app1-3/       → Micro-applications
scripts/      → Startup scripts
```

## 📚 Documentation

- **Full Documentation:** [README.md](README.md)
- **Running Apps Guide:** [RUNNING_APPS.md](RUNNING_APPS.md)
- **Setup Details:** [SETUP_COMPLETE.md](SETUP_COMPLETE.md)

## ⚠️ Troubleshooting

### Port Already in Use
```bash
PORT=3000 npm run dev:shell
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev:parallel
```

### Module Resolution Error
Make sure all workspaces are properly linked. Run:
```bash
npm install
```

## 🚀 Building for Production

```bash
# Build all packages
npm run build

# Build only shell
npm run build:shell
```

Built files will be in `packages/*/dist/`

## 💡 Next Steps

1. ✅ Verify everything starts correctly
2. 📝 Add your custom cards in each app
3. 🎨 Customize Material-UI components
4. 🔄 Create Redux slices for your state
5. 📦 Deploy individual apps separately

---

**Happy coding! 🎉**

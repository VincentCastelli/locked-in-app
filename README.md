# LockedIn

**Build your game. Showcase the journey.**

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Setup Guide](#-setup-guide)
- [Development](#-development)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Expo CLI (optional)
- [`just`](https://github.com/casey/just) task runner (optional but recommended)
- A [Convex](https://convex.dev/) account

### Option A: `just` workflow (recommended)

```bash
# 1. Install dependencies
just install

# 2. Set up Convex (login, create project, get deployment URL)
npx convex dev

# 3. Add your Convex URL to .env.local
# EXPO_PUBLIC_CONVEX_URL is set automatically by `npx convex dev`

# 4. Start Convex dev server (new terminal)
just convex-dev

# 5. Start mobile app (new terminal)
just app || just app-tunnel
```

Mobile app: Scan QR code or press `a` for Android, `i` for iOS

### Option B: Manual commands

```bash
# 1. Install dependencies
npm install

# 2. Set up Convex
npx convex dev

# 3. Start mobile app (in another terminal)
npm start
```

### Handy `just` recipes

Run `just --list` anytime to see every available task:

| Command              | Purpose                               |
| -------------------- | ------------------------------------- |
| `just install`       | Install dependencies                  |
| `just convex-dev`    | Start Convex dev server               |
| `just convex-deploy` | Deploy Convex functions to production |
| `just app`           | Launch the dev server over wifi       |
| `just app-tunnel`    | Launch the dev server via expo server |

---

## 🏗️ Project Structure

```
locked-in-app/
├── src/                    # React Native mobile app
│   ├── api/               # Convex client & API helpers
│   ├── screens/           # App screens
│   ├── store/             # Zustand state management
│   └── navigation/        # React Navigation setup
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema (tables & types)
│   ├── auth.ts            # Auth actions (signup, signin, reset)
│   └── users.ts           # User queries & mutations
└── package.json
```

## 📖 Setup Guide

### 1. Environment Configuration

When you run `npx convex dev`, it will create a `.env.local` file with your deployment URL:

```env
EXPO_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

### 2. Database

Convex manages your database automatically. The schema is defined in `convex/schema.ts`. When you run `npx convex dev`, it syncs your schema and functions to your Convex deployment.

---

## 🛠️ Development

### Convex Development

```bash
npx convex dev          # Start dev server (syncs functions & schema)
npx convex dashboard    # Open Convex dashboard in browser
npx convex deploy       # Deploy to production
```

### Frontend Development

```bash
npm start            # Start Expo dev server
npm run android      # Run on Android emulator
npm run ios          # Run on iOS simulator
```

---

## 🚨 Troubleshooting

### Mobile app can't connect to Convex

- ✅ Check `EXPO_PUBLIC_CONVEX_URL` is set (run `npx convex dev` to generate)
- ✅ Ensure Convex dev server is running
- ✅ Restart Expo dev server after changing env vars

### TypeScript errors

- ✅ Ensure `npx convex dev` is running (it generates types)
- ✅ Restart TypeScript server in VS Code
- ✅ Delete `node_modules` and reinstall

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Convex Documentation](https://docs.convex.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 📄 License

Private - All rights reserved

---

Need help? Check the troubleshooting section or create an issue.

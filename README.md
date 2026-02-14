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
just app
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
| `just app`           | Launch the Expo dev server            |

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

## 🔐 Authentication Flow

### Sign Up

1. User enters email/password → `SignUpScreen`
2. Frontend calls Convex `auth.signUp` action
3. Backend hashes password with bcrypt (Node.js action)
4. User created in Convex database
5. Response returned to frontend
6. Frontend stores in Zustand state
7. User redirected to main app

### Sign In

1. User enters credentials → `SignInScreen`
2. Frontend calls Convex `auth.signIn` action
3. Backend verifies password via bcrypt
4. User data returned to frontend
5. Frontend stores in Zustand
6. User redirected to main app

### Reset Password

1. User enters email + new password → `ForgotPasswordScreen`
2. Frontend calls Convex `auth.resetPassword` action
3. Backend verifies user exists, hashes new password
4. Password updated in database

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

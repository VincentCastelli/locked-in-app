# LockedIn

**Build your game. Showcase the journey.**

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Setup Guide](#-setup-guide)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Prisma Postgres)
- Expo CLI (optional)
- [`just`](https://github.com/casey/just) task runner (optional but recommended)

### Option A: `just` workflow (recommended)

```bash
# 0. Install just
#   Windows (PowerShell): winget install --id=casey.Just
#   macOS (Homebrew):    brew install just

# 1. Install dependencies
just install

# 2. Configure environment (single .env in project root)
cp .env.example .env
# Edit .env with your DATABASE_URL and other settings

# 3. Prepare database
just db-migrate

# 4. Start backend server (new terminal)
just server

# 5. Start mobile app (new terminal)
just app
```

Backend runs at `http://localhost:3000`  
Mobile app: Scan QR code or press `a` for Android, `i` for iOS

### Option B: Manual commands

```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and other settings

# 3. Set up database
cd server
npm run prisma:generate
npm run prisma:migrate

# 4. Start backend server
npm run dev

# 5. In another terminal, start mobile app
cd ..
npm start
```

### Handy `just` recipes

Run `just --list` anytime to see every available task. The most useful recipes are:

| Command           | Purpose                                                                            |
| ----------------- | ---------------------------------------------------------------------------------- |
| `just install`    | Install root + server dependencies                                                 |
| `just db-migrate` | Generate Prisma client (if needed) and apply migrations via server package scripts |
| `just db-studio`  | Open Prisma Studio against the configured `DATABASE_URL`                           |
| `just server`     | Start the Express API with hot reload                                              |
| `just app`        | Launch the Expo dev server                                                         |
| `just tunnel`     | Spin up the Prisma Data Proxy tunnel (port overrides via `just tunnel 4000`)       |

---

## 🏗️ Project Structure

```
locked-in-app/
├── src/                    # React Native mobile app
│   ├── api/               # API client functions
│   ├── components/        # Reusable components
│   ├── screens/           # App screens
│   ├── store/             # Zustand state management
│   ├── middleware/        # Auth middleware
│   └── navigation/        # React Navigation setup
├── server/                # Express backend
│   ├── src/
│   |   ├── routes/        # API endpoints
│   |   ├── middleware/    # JWT authentication
│   |   ├── utils/         # JWT, password hashing, email
│   |   ├── lib/           # Prisma client
│   |   └── index.ts       # Server entry point
│   ├── prisma/            # Database schema & migrations
│   |   ├── schema.prisma  # Database models
│   |   └── migrations/    # Migration history
│   └── package.json
└── package.json
```

## 📖 Setup Guide

### 1. Environment Configuration

All environment variables are in one `.env` file at the project root:

```env
# Mobile App
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Backend Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lockedin

# JWT (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your-generated-secret-here
JWT_EXPIRES_IN=7d

# Email (optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@lockedin.app

# Frontend URL (for reset links)
FRONTEND_URL=http://localhost:8081
```

**For physical devices**: Use your computer's local IP instead of localhost:

```env
EXPO_PUBLIC_API_URL=http://192.168.1.XXX:3000/api
```

### 2. Database Setup

```bash
cd server

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) View database
npm run prisma:studio
```

### 3. Email Configuration (Optional)

For Gmail:

1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
```

---

## 🔐 Authentication Flow

### Sign Up

1. User enters email/password → `SignUpScreen`
2. Frontend calls `signUpApi(email, password)`
3. Backend hashes password with bcrypt
4. User created in database
5. Backend returns `{ user, token }`
6. Frontend stores in Zustand state
7. User redirected to main app

### Sign In

1. User enters credentials → `SignInScreen`
2. Frontend calls `signInApi(email, password)`
3. Backend verifies password
4. Backend returns `{ user, token }`
5. Frontend stores in Zustand
6. User redirected to main app

### Forgot Password

1. User enters email → `ForgotPasswordScreen`
2. Backend generates reset token (1hr expiry)
3. Email sent with reset link
4. User clicks link → Reset password form
5. Backend verifies token & updates password

### Protected Routes

Wrap any screen to require authentication:

```typescript
import { withAuth } from "../middleware/withAuth";

const MyProtectedScreen = () => {
  // Your component
};

export default withAuth(MyProtectedScreen);
```

---

## 🛠️ Development

### Backend Development

```bash
cd server
npm run dev          # Start with auto-reload (tsx watch)
npm run build        # Build TypeScript to JavaScript
npm start            # Run production build
npm run prisma:studio # View database in browser
```

### Frontend Development

```bash
npm start            # Start Expo dev server
npm run android      # Run on Android emulator
npm run ios          # Run on iOS simulator
npm run web          # Run in web browser
```

### Project Commands

```bash
# Mobile app
npm install          # Install dependencies
npm start            # Start Expo

# Backend
cd server
npm install          # Install backend dependencies
npm run dev          # Start development server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
```

### Database Commands

```bash
cd server

# Connect via tunnel locally
npx @prisma/ppg-tunnel --port <any num>

# View database in browser
npm run prisma:studio

# Create new migration after schema changes
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npm run prisma:migrate -- reset
```

---

## 🚨 Troubleshooting

### Backend won't start

- ✅ Check `DATABASE_URL` is set in `.env`
- ✅ Run `npm run prisma:generate` in server directory
- ✅ Verify PostgreSQL is running
- ✅ Check port 3000 is not in use

### Mobile app can't connect to backend

- ✅ Check `EXPO_PUBLIC_API_URL` in `.env`
- ✅ Use computer's IP address (not localhost) for physical devices
- ✅ Ensure backend server is running
- ✅ Check firewall/network settings
- ✅ Restart Expo dev server after changing `.env`

### Email not sending

- ✅ Check SMTP credentials in `.env`
- ✅ Use Gmail App Password (not regular password)
- ✅ Check server logs for detailed errors
- ✅ Server works without email - password reset just won't send

### TypeScript errors

- ✅ Restart TypeScript server in VS Code (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
- ✅ Run `npm install` in both root and server directories
- ✅ Delete `node_modules` and reinstall

### Database migration errors

- ✅ Ensure DATABASE_URL is correct
- ✅ Check database is accessible
- ✅ Try `npx prisma migrate reset` (WARNING: deletes data)

---

## 🔒 Security Best Practices

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Express.js](https://expressjs.com/)
- [JWT.io](https://jwt.io/)

---

## 📄 License

Private - All rights reserved

---

Need help? Check the troubleshooting section or create an issue.

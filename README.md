# LockedIn

**Build your game. Showcase the journey.**

Full-stack authentication system with React Native mobile app and Express backend.

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

### Install & Run

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

Backend runs at `http://localhost:3000`  
Mobile app: Scan QR code or press `a` for Android, `i` for iOS

---

## 🏗️ Project Structure

```
locked-in-app/
├── src/                    # React Native mobile app
│   ├── api/               # API client functions
│   ├── components/        # Reusable components
│   ├── screens/           # Auth screens (SignIn, SignUp, ForgotPassword)
│   ├── store/             # Zustand state management
│   ├── middleware/        # Auth middleware (withAuth HOC)
│   └── navigation/        # React Navigation setup
├── server/                # Express backend
│   └── src/
│       ├── routes/        # API endpoints (auth.ts)
│       ├── middleware/    # JWT authentication
│       ├── utils/         # JWT, password hashing, email
│       ├── lib/           # Prisma client
│       └── index.ts       # Server entry point
├── prisma/                # Database schema & migrations
│   ├── schema.prisma     # Database models
│   └── migrations/       # Migration history
├── .env                  # Environment variables (git-ignored)
├── package.json          # Mobile app dependencies
└── server/package.json   # Backend dependencies
```

---

## ✨ Features

### Frontend (React Native + Expo)

- ✅ **Sign In Screen** - Email/password authentication
- ✅ **Sign Up Screen** - User registration with social auth placeholders
- ✅ **Forgot Password Screen** - Password reset flow
- ✅ **Protected Routes** - HOC wrapper for authenticated screens
- ✅ **Zustand State Management** - Global auth state
- ✅ **JWT Token Handling** - Automatic token management
- ✅ **Type-Safe API Client** - TypeScript API functions
- ✅ **React Navigation** - Conditional auth/main stack

### Backend (Express + TypeScript)

- ✅ **POST /api/auth/signup** - User registration
- ✅ **POST /api/auth/signin** - User authentication
- ✅ **POST /api/auth/forgot-password** - Send reset email
- ✅ **POST /api/auth/reset-password** - Reset password with token
- ✅ **GET /api/auth/verify** - Verify JWT token
- ✅ **JWT Authentication Middleware** - Protected routes
- ✅ **Password Hashing** - bcrypt (10 rounds)
- ✅ **Email Service** - Nodemailer integration
- ✅ **PostgreSQL + Prisma ORM** - Type-safe database access

---

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

## 📡 API Documentation

### Base URL

`http://localhost:3000/api`

### Endpoints

#### **POST /api/auth/signup**

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "2025-11-22T...",
    "updatedAt": "2025-11-22T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### **POST /api/auth/signin**

Authenticate a user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as signup

#### **POST /api/auth/forgot-password**

Send password reset email.

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "If an account exists with this email, a password reset link has been sent"
}
```

#### **POST /api/auth/reset-password**

Reset password with token.

**Request:**

```json
{
  "token": "reset-token-from-email",
  "newPassword": "newpassword123"
}
```

**Response:**

```json
{
  "message": "Password reset successful"
}
```

#### **GET /api/auth/verify**

Verify JWT token.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Testing APIs with curl

```bash
# Health check
curl http://localhost:3000/health

# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Verify token (replace YOUR_TOKEN)
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN"
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

---

## 🧪 Testing

### Test Backend

1. **Start server**: `cd server && npm run dev`
2. **Test health**: `curl http://localhost:3000/health`
3. **Sign up user**: Use curl command above
4. **Verify token**: Copy token from response and test verify endpoint

### Test Mobile App

1. **Start backend**: `cd server && npm run dev`
2. **Start app**: `npm start`
3. **Try flows**:
   - Sign up with new email
   - Sign out
   - Sign in again
   - Test forgot password
   - Verify protected screens require auth

---

## 🗄️ Database

### User Model

```prisma
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  password     String
  phone_number String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Database Commands

```bash
cd server

# View database in browser
npm run prisma:studio

# Create new migration after schema changes
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset --schema=../prisma/schema.prisma
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

### Production Checklist

- [ ] Generate strong `JWT_SECRET` (64+ random bytes)
- [ ] Use HTTPS only
- [ ] Set `NODE_ENV=production`
- [ ] Enable rate limiting
- [ ] Add input sanitization
- [ ] Implement refresh tokens
- [ ] Add password complexity requirements
- [ ] Enable CORS only for your domain
- [ ] Store tokens securely (AsyncStorage + encryption)
- [ ] Add biometric authentication (optional)
- [ ] Enable 2FA (optional)

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📦 Dependencies

### Mobile App

- `react-native` - Mobile framework
- `expo` - Development platform
- `@react-navigation` - Navigation
- `zustand` - State management
- `@prisma/client` - Database (generated)

### Backend

- `express` - Web framework
- `typescript` - Type safety
- `@prisma/client` - Database ORM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `nodemailer` - Email service
- `cors` - CORS middleware
- `dotenv` - Environment variables

---

## 🎯 Next Steps

- [ ] Add token persistence (AsyncStorage)
- [ ] Implement social authentication (Google, Apple, Facebook)
- [ ] Add profile management endpoints
- [ ] Implement refresh tokens
- [ ] Add user profile screens
- [ ] Deploy backend (Railway, Render, AWS)
- [ ] Deploy mobile app (App Store, Play Store)
- [ ] Add analytics
- [ ] Implement push notifications

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

**Built with ❤️ for the LockedIn community**

Need help? Check the troubleshooting section or create an issue.

#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

console.log("🚀 Setting up LockedIn Backend Server...\n");

// Check if we're in the server directory
const serverDir = path.join(__dirname);
process.chdir(serverDir);

// Step 1: Check for .env file
console.log("📝 Step 1: Checking environment configuration...");
const envPath = path.join(serverDir, ".env");
const envExamplePath = path.join(serverDir, ".env.example");

if (!fs.existsSync(envPath)) {
  console.log("   Creating .env file from .env.example...");

  // Copy example file
  let envContent = fs.readFileSync(envExamplePath, "utf8");

  // Generate JWT secret
  const jwtSecret = crypto.randomBytes(64).toString("hex");
  envContent = envContent.replace(
    "your-super-secret-jwt-key-change-this-in-production",
    jwtSecret
  );

  fs.writeFileSync(envPath, envContent);
  console.log("   ✅ .env file created with random JWT_SECRET");
  console.log("   ⚠️  Please update DATABASE_URL and SMTP settings in .env\n");
} else {
  console.log("   ✅ .env file exists\n");
}

// Step 2: Install dependencies
console.log("📦 Step 2: Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("   ✅ Dependencies installed\n");
} catch (error) {
  console.error("   ❌ Failed to install dependencies");
  process.exit(1);
}

// Step 3: Generate Prisma Client
console.log("🔨 Step 3: Generating Prisma Client...");
try {
  execSync("npm run prisma:generate", { stdio: "inherit" });
  console.log("   ✅ Prisma Client generated\n");
} catch (error) {
  console.error("   ⚠️  Warning: Failed to generate Prisma Client");
  console.error("   Make sure DATABASE_URL is set in .env\n");
}

console.log("✨ Setup complete!\n");
console.log("📋 Next steps:");
console.log("   1. Edit server/.env and configure:");
console.log("      - DATABASE_URL (PostgreSQL connection string)");
console.log("      - SMTP settings for email (optional for now)");
console.log("   2. Run migrations: npm run prisma:migrate");
console.log("   3. Start development server: npm run dev");
console.log("\n🎯 Server will run at http://localhost:3000\n");

"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Sign up a new user
 */
export const signUp = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ userId: string; email: string }> => {
    const { email, password } = args;

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    // Check if user already exists
    const existingUser = await ctx.runQuery(internal.users.getUserByEmail, {
      email,
    });

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const userId = await ctx.runMutation(internal.users.createUser, {
      email,
      password: hashedPassword,
    });

    return { userId, email };
  },
});

/**
 * Sign in an existing user
 */
export const signIn = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (
    ctx,
    args
  ): Promise<{ userId: string; email: string; createdAt: number }> => {
    const { email, password } = args;

    // Find user
    const user = await ctx.runQuery(internal.users.getUserByEmail, { email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    return {
      userId: user._id,
      email: user.email,
      createdAt: user._creationTime,
    };
  },
});

/**
 * Reset a user's password
 */
export const resetPassword = action({
  args: {
    email: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args): Promise<{ message: string }> => {
    const { email, newPassword } = args;

    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const user = await ctx.runQuery(internal.users.getUserByEmail, { email });

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await ctx.runMutation(internal.users.updatePassword, {
      userId: user._id,
      password: hashedPassword,
    });

    return { message: "Password reset successful" };
  },
});

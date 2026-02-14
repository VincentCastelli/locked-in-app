import { v } from "convex/values";
import { query, internalQuery, internalMutation } from "./_generated/server";

/**
 * Get a user by email (internal - used by auth actions)
 */
export const getUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

/**
 * Create a new user (internal - used by auth actions)
 */
export const createUser = internalMutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      password: args.password,
    });
  },
});

/**
 * Update a user's password (internal - used by auth actions)
 */
export const updatePassword = internalMutation({
  args: {
    userId: v.id("users"),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      password: args.password,
    });
  },
});

/**
 * Get a user by ID (public query for client use)
 */
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    // Don't return the password hash to the client
    return {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      _creationTime: user._creationTime,
    };
  },
});

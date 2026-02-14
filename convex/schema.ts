import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    password: v.string(),
    phoneNumber: v.optional(v.string()),
  }).index("by_email", ["email"]),
});

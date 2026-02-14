import { ConvexError } from "convex/values";

/**
 * Extract a user-friendly error message from Convex errors.
 *
 * ConvexError wraps application-level errors thrown with `new ConvexError(...)`.
 * The message is stored in `.data` rather than `.message`.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ConvexError) {
    return typeof error.data === "string" ? error.data : fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

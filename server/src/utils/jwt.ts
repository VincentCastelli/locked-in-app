import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

interface TokenPayload {
  userId: string;
  email: string;
}

/**
 * Generate a JWT token
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

/**
 * Generate a password reset token (short-lived)
 */
export function generateResetToken(email: string): string {
  return jwt.sign({ email, type: "reset" }, JWT_SECRET, {
    expiresIn: "1h", // Reset tokens expire in 1 hour
  });
}

/**
 * Verify a password reset token
 */
export function verifyResetToken(token: string): { email: string } {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    if (payload.type !== "reset") {
      throw new Error("Invalid token type");
    }
    return { email: payload.email };
  } catch (error) {
    throw new Error("Invalid or expired reset token");
  }
}

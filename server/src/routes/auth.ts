import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import {
  generateToken,
  generateResetToken,
  verifyResetToken,
} from "../utils/jwt";
import { sendPasswordResetEmail } from "../utils/email";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * POST /api/auth/signup
 * Register a new user
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

/**
 * POST /api/auth/signin
 * Authenticate a user
 */
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Failed to sign in" });
  }
});

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({
        message:
          "If an account exists with this email, a password reset link has been sent",
      });
    }

    // Generate reset token
    const resetToken = generateResetToken(email);

    // Send email
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (emailError) {
      console.error("Failed to send reset email:", emailError);
      return res.status(500).json({ message: "Failed to send reset email" });
    }

    res.json({
      message:
        "If an account exists with this email, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to process request" });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Verify reset token
    let email: string;
    try {
      const payload = verifyResetToken(token);
      email = payload.email;
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

/**
 * GET /api/auth/verify
 * Verify token and get user info
 */
router.get(
  "/verify",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user });
    } catch (error) {
      console.error("Verify error:", error);
      res.status(500).json({ message: "Failed to verify token" });
    }
  }
);

export default router;

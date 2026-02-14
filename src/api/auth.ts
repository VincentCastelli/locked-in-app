import { convex } from "./convex";
import { api } from "../../convex/_generated/api";

export interface User {
  _id: string;
  email: string;
  phoneNumber?: string;
  _creationTime: number;
}

export interface AuthResponse {
  userId: string;
  email: string;
  createdAt?: number;
}

// Sign In via Convex action
export async function signInApi(
  email: string,
  password: string
): Promise<AuthResponse> {
  return await convex.action(api.auth.signIn, { email, password });
}

// Sign Up via Convex action
export async function signUpApi(
  email: string,
  password: string
): Promise<AuthResponse> {
  return await convex.action(api.auth.signUp, { email, password });
}

// Reset Password via Convex action
export async function resetPasswordApi(
  email: string,
  newPassword: string
): Promise<{ message: string }> {
  return await convex.action(api.auth.resetPassword, { email, newPassword });
}

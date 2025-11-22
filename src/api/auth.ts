// API Configuration
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api";

interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Helper function for API calls
async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Sign In API
export async function signInApi(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/signin", "POST", {
    email,
    password,
  });
}

// Sign Up API
export async function signUpApi(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/signup", "POST", {
    email,
    password,
  });
}

// Forgot Password API
export async function forgotPasswordApi(
  email: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/auth/forgot-password", "POST", {
    email,
  });
}

// Verify Token API
export async function verifyTokenApi(token: string): Promise<{ user: User }> {
  return apiRequest<{ user: User }>("/auth/verify", "GET");
}

// Reset Password API (for when user clicks reset link)
export async function resetPasswordApi(
  token: string,
  newPassword: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>("/auth/reset-password", "POST", {
    token,
    newPassword,
  });
}

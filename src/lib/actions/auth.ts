"use server"

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false, // We handle redirection on the client or via standard flow
    });
    
    return { success: true, message: "Logged in successfully", errors: {} };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: "Invalid email or password.", errors: {} };
        default:
          return { success: false, message: "Something went wrong.", errors: {} };
      }
    }
    // Auth.js redirects throw an error to navigate, we must re-throw it if redirecting inside action
    throw error; 
  }
}

export async function registerAction(prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  const { name, email, password } = parsed.data;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "A user with this email already exists.",
        errors: { email: ["Email already exists"] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER", // Default role
      },
    });

    return {
      success: true,
      message: "Account created successfully! You can now log in.",
      errors: {},
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
      errors: {},
    };
  }
}

export async function logoutAction() {
  await signOut({ redirect: true, redirectTo: "/" });
}

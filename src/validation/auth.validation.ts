import { UserRole } from "@/types/user.types";
import z from "zod";

export const loginValidationZodSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Provide a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const createUserZodSchema = z
  .object({
    firstName: z
      .string({ message: "First Name is required" })
      .min(2, "First Name must be at least 2 characters long")
      .max(50, "First Name cannot exceed 50 characters"),

    lastName: z
      .string({ message: "Last Name is required" })
      .min(2, "Last Name must be at least 2 characters long")
      .max(50, "Last Name cannot exceed 50 characters"),

    email: z
      .string({ message: "Email is required" })
      .email("Invalid email address"),

    password: z
      .string({ message: "Password is required" })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string({ message: "Confirm Password is required" }),

    bio: z.string().max(500).optional(),
    interests: z.array(z.string()).optional(),
    location: z.string().optional(),
    role: z.nativeEnum(UserRole).optional(),
    profileImg: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

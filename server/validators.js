import { z } from "zod";

export const signupSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const jobSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  link: z.string().optional(),
  status: z.enum(["Applied", "Interview", "Rejected", "Offer"]).optional(),
});
export const updateJobSchema = jobSchema.partial();
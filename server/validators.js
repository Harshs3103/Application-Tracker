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
  location: z.string().max(100, "Location is too long").optional(),
  salary: z.string().max(50, "Salary is too long").optional(),
  notes: z.string().max(1000, "Notes are too long").optional(),
interviewDate: z
    .union([z.string(), z.null()])
    .refine(
      (v) => v === null || v === "" || !Number.isNaN(Date.parse(v)),
      "Enter a valid interview date"
    )
    .transform((v) => (v === "" ? null : v ? new Date(v) : v))
    .optional(),});
    
export const updateJobSchema = jobSchema.partial();
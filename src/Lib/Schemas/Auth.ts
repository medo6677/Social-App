import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name must not exceed 50 characters"),

        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must not exceed 20 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            ),

        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),

        dateOfBirth: z
            .string()
            .min(1, "Date of birth is required")
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),



        gender: z.string().min(1, "Gender is required").nonempty("Pls Select your gender"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        rePassword: z
            .string()
            .min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });



export const loginSchema = z
    .object({
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),



        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)."),


    })

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
    password: z
        .string()
        .min(1, "Current password is required"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (#?!@$%^&*-)."
        ),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
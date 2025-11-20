/**
 * Authentication Validation Schemas
 * 
 * Zod schemas for auth forms with client-side validation.
 */

import { z } from 'zod';

/**
 * Login schema
 */
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register schema
 */
export const registerSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['BUYER', 'SELLER'], {
        required_error: 'Please select a role',
    }),
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().optional(),
    agreedToTerms: z
        .boolean()
        .refine((val) => val === true, {
            message: 'You must agree to the terms and conditions',
        }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

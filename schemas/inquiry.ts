import { z } from 'zod'

// Shared schema used for both client-side and server-side validation.
// Client validation is for UX; server validation is authoritative.
export const inquiryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name must be 100 characters or fewer.'),

  email: z
    .string()
    .min(1, 'Email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Please enter a valid email address.'),

  phone: z
    .string()
    .max(30, 'Phone must be 30 characters or fewer.')
    .optional()
    .or(z.literal('')),

  company: z
    .string()
    .max(150, 'Company must be 150 characters or fewer.')
    .optional()
    .or(z.literal('')),

  projectType: z
    .string()
    .max(100, 'Project type must be 100 characters or fewer.')
    .optional()
    .or(z.literal('')),

  budget: z
    .string()
    .max(50, 'Budget must be 50 characters or fewer.')
    .optional()
    .or(z.literal('')),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),

  // Cloudflare Turnstile token — required on the client form, verified server-side.
  turnstileToken: z
    .string()
    .min(1, 'Please complete the captcha.'),
})

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>

// The payload forwarded to the freelance API (excludes the Turnstile token).
export const inquiryPayloadSchema = inquiryFormSchema.omit({ turnstileToken: true })
export type InquiryPayload = z.infer<typeof inquiryPayloadSchema>

import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "Minimum of 2 characters"}),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8, { message: "Minimum of 8 characters"})
})
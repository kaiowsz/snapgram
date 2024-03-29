import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2, { message: "Minimum of 2 characters"}),
    username: z.string().min(2, "Minimum of 2 characteres").max(50),
    email: z.string().email(),
    password: z.string().min(8, { message: "Minimum of 8 characters"})
})

export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Minimum of 8 characters"})
})

export const PostValidation = z.object({
    caption: z.string().max(2200),
    file: z.custom<File[]>(),
    location: z.string().max(100),
    tags: z.string()
})

export const ProfileValidation = z.object({
    name: z.string().min(2, { message: "Minimum of 2 characteres"}),
    username: z.string().min(2).max(50),
    email: z.string().email(),
    bio: z.string().max(2200),
    file: z.custom<File[]>()
})

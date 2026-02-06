import { z } from "zod";

export const UserRequestSchema = z.object({
    username: z.string().min(3).max(255),
    password: z.string().min(6).max(255),
    role: z.enum(["ADMIN", "USER", "AUTHOR"]),
    email: z.email(),
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
})
export type UserRequestType = z.infer<typeof UserRequestSchema>
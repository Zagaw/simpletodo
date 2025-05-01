import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().min(6, {message: "Password must contain at least 6 character(s)"}),
}); 
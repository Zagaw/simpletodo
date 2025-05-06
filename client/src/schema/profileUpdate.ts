import * as z from "zod";

export const profileUpdateSchema = z.object({
    name: z.string().min(3, {message: "Name must contain at least 3 character(s)"}).max(8, {message: "Name can conatin at most 8 character(s)"}).trim(),
    email: z.string().email().nonempty(),
    password: z.string().optional().refine((val) => !val || val.length >=6 ,{
        message: "Password must contain at least 6 character(s)",
    }),
});
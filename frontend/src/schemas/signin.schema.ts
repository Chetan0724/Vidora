import * as z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Enter Valid Password"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

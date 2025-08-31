import { z } from "zod";

export const PostInputSchema = z.object({
    title: z.string().trim().min(1, "タイトルは必須").max(50, "50文字以内"),
    body:  z.string().trim().min(1, "本文は必須").max(500, "500文字以内"),
});

export type PostInput = z.infer<typeof PostInputSchema>;

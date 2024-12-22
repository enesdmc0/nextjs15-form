import { z } from "zod";

export const NewTodoSchema = z.object({
    title: z
        .string()
        .min(1, "Task title is required")
        .max(100, "Task title is too long"),
})
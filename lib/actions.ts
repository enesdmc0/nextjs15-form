"use server"
import { revalidatePath } from "next/cache"
import arcjet, { shield, detectBot, fixedWindow, request } from '@arcjet/next'

import { NewTodoSchema } from "./schema";
import { createTodo, updateTodo } from "./todos";

interface TodoActionState {
    success?: string;
    error?: string;
}

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE"
        }),
        detectBot({
            mode: "LIVE",
            allow: []
        }),
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 5
        })
    ]
})

export async function createTodoAction(state: TodoActionState, formData: FormData) {
    try {
        const req = await request();
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return {
                    error: 'Too many registration attempts. Please try again later.'
                }
            }
            if (decision.reason.isBot()) {
                return {
                    error: 'You are a bot. Please go away.'
                }
            }
            return {
                error: 'An error occurred during registration.'
            }
        }

        const data = Object.fromEntries(formData.entries());
        const result = NewTodoSchema.safeParse(data);

        if (!result.success) {
            return { error: result.error.errors[0].message }
        }

        const title = data.title as string;
        await createTodo(title);
        return { success: "Todo created successfully" }

    }
    catch (error: unknown) {
        return { error: (error as Error)?.message || "An error occurred" }
    } finally {
        revalidatePath("/")
    }
}


export const updateTodoAction = async (id: string, isCompleted: boolean) => {
    try {
        const result = await updateTodo(id, isCompleted);
        if (result.error) {
            return { error: "An error occurred while updating the todo" }
        }

        return { success: "Todo updated successfully" }


    }
    catch (error) {
        return { error: (error as Error)?.message || "An error occurred" }
    }
    finally {
        revalidatePath("/")
    }
}
"use client";
import { toast } from "sonner";
import { useActionState, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { NewTodoSchema } from "@/lib/schema";
import { createTodoAction } from "@/lib/actions";

export const NewTodoForm = () => {
  const [validationError, setValidationError] = useState({ title: "" });
  const [state, dispatch, isPending] = useActionState(createTodoAction, {
    success: "",
    error: undefined,
  });

  const formAction = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const result = NewTodoSchema.safeParse(data);

    if (!result.success) {
      setValidationError({ title: result.error.errors[0].message });
      return;
    }

    dispatch(formData);
  };

  
  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }
  }, [state.success]);

  
  function validate(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "title") {
      const data = { title: value };
      const result = NewTodoSchema.safeParse(data);
      if (result.success) {
        setValidationError({ title: "" });
      } else {
        setValidationError({ title: result.error.errors[0].message });
      }
    }
  }

  return (
    <form action={formAction}>
      <div className="mt-12 flex gap-3">
        <div className="w-full">
          <Input
            type="text"
            name="title"
            placeholder="Enter a task"
            onChange={validate}
          />
          {validationError.title && (
            <p className="ml-1 mt-2 text-sm text-red-500">
              {validationError.title}
            </p>
          )}
        </div>

        <Button type="submit">{isPending ? "Adding..." : "Add Task"}</Button>
      </div>
    </form>
  );
};

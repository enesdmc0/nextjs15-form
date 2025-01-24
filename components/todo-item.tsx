"use client";
import { toast } from "sonner";
import { Todo } from "@prisma/client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { formatDate } from "@/lib/utils";
import { updateTodoAction } from "@/lib/actions";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const handleChange = async (isCompleted: boolean) => {
    const result = await updateTodoAction(todo.id, isCompleted);
    
    if (result.error) {
      toast.error("An error occurred while updating the todo");
    }
    toast.success("Todo updated successfully");
  };

  return (
    <li className="flex items-center gap-3">
      <Checkbox
        id={todo.id}
        className="peer"
        defaultChecked={todo.isCompleted}
        checked={todo.isCompleted}
        onCheckedChange={(checked) => handleChange(checked as boolean)}
      />
      <Label
        htmlFor={todo.id}
        className="cursor-pointer peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through"
      >
        {todo.title}
      </Label>
      <span className="ml-auto text-sm text-gray-500 peer-data-[state=checked]:text-gray-500 peer-data-[state=checked]:line-through">
        {formatDate(todo.updatedAt)}
      </span>
    </li>
  );
};

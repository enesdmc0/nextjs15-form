import { getTodos } from "@/lib/todos";
import { TodoItem } from "./todo-item";

export const TodoList = async () => {
  const { todos } = await getTodos();
  return (
    <div className="mt-12">
      <h2 className="text-xl font-medium">Todo list</h2>
      <ul className="mt-4 flex flex-col gap-1">
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

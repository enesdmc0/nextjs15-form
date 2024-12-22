import { TodoList } from "@/components/todo-list";
import { NewTodoForm } from "@/components/new-todo-form";

const Home = () => {
  return (
    <section className="flex items-center justify-center flex-col min-h-screen ">
      <div className="container max-w-2xl">
        <h1 className="font-serif text-3xl font-medium">
          Keep track of your tasks
        </h1>
        <NewTodoForm />
        <TodoList />
      </div>
    </section>
  );
};

export default Home;

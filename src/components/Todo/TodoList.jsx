import { useState } from "react";
import { useTodos, useTodosActions } from "../Provider/TodosProvider";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();
  const [edit, setEdit] = useState({ id: null, text: "", isComplete: false });

  const updateHandler = (todo) => {
    dispatch({ type: "update", id: edit.id, todo: todo });
    setEdit({ id: null, text: "", isComplete: false });
  };

  const renderTodos = () => {
    if (todos.length == 0) return <p>add some todos</p>;

    return todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          onComplete={() => dispatch({ type: "complete", id: todo.id })}
          onDelete={() => dispatch({ type: "delete", id: todo.id })}
          onUpdate={() => setEdit(todo)}
        />
      );
    });
  };

  return (
    <>
      {edit.id ? (
        <TodoForm onSubmit={updateHandler} edit={edit} />
      ) : (
        renderTodos()
      )}
    </>
  );
};
export default TodoList;

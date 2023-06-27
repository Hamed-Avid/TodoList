import { createContext, useContext, useReducer } from "react";
import {
  loadFromLocal,
  saveToLocal,
} from "../../services/localStorageServices";

const TodoContext = createContext();
const TodoContextDispatcher = createContext();

const initialState = loadFromLocal();
const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        text: action.value,
        isCompleted: false,
      };
      saveToLocal([...state, newTodo]);
      return [...state, newTodo];
    }
    case "complete": {
      const index = state.findIndex((todo) => todo.id == action.id);
      const todo = { ...state[index] };
      todo.isCompleted = !todo.isCompleted;
      const Todos = [...state];
      Todos[index] = todo;
      saveToLocal(Todos);
      return Todos;
    }
    case "delete": {
      const newTodos = state.filter((todo) => todo.id != action.id);
      saveToLocal(newTodos);
      return newTodos;
    }
    case "update": {
      console.log(action);
      const index = state.findIndex((todo) => todo.id == action.id);
      const todo = { ...state[index] };
      todo.text = action.todo;
      const Todos = [...state];
      Todos[index] = todo;
      saveToLocal(Todos);
    }
    case "filter": {
      const value = action.value;
      const updatedTodo = initialState;
      switch (value) {
        case "Completed":
          return updatedTodo.filter((todo) => todo.isCompleted);
        case "UnCompleted":
          return updatedTodo.filter((todo) => !todo.isCompleted);
        default:
          return updatedTodo;
      }
    }
    default:
      return state;
  }
};

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={todos}>
      <TodoContextDispatcher.Provider value={dispatch}>
        {children}
      </TodoContextDispatcher.Provider>
    </TodoContext.Provider>
  );
};

export default TodosProvider;

export const useTodos = () => useContext(TodoContext);
export const useTodosActions = () => useContext(TodoContextDispatcher);

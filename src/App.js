import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import TodosProvider from "./components/Provider/TodosProvider";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";

function App() {
  return (
    <div className="App">
      <h1>TodoList App</h1>
      <div className="container">
        <TodosProvider>
          <NavBar />
          <TodoForm />
          <TodoList />
        </TodosProvider>
      </div>
    </div>
  );
}

export default App;

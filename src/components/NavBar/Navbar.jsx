import styles from "./navbar.module.css";
import { FaPencilAlt } from "react-icons/fa";
import Select from "react-select";
import { useTodos, useTodosActions } from "../Provider/TodosProvider";
import { useState } from "react";
import { loadFromLocal } from "../../services/localStorageServices";

const options = [
  { value: "All", label: "All" },
  { value: "Completed", label: "Completed" },
  { value: "UnCompleted", label: "UnCompleted" },
];

const NavBar = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();
  const [filter, setFilter] = useState("");
  const unCompleted = loadFromLocal().filter(
    (todo) => !todo.isCompleted
  ).length;

  const filterHandler = (selectedOption) => {
    dispatch({ type: "filter", value: selectedOption.value });
    setFilter(selectedOption);
  };

  return (
    <header className={styles.navBar}>
      <span className={styles.label}>
        <FaPencilAlt />
        {unCompleted}
      </span>
      <h2>are not completed</h2>
      <Select
        className={styles.select}
        value={filter}
        defaultValue={options[0]}
        onChange={filterHandler}
        options={options}
      />
    </header>
  );
};

export default NavBar;

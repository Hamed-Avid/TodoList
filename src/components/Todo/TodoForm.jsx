import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styles from "./todo.module.css";
import { useTodosActions } from "../Provider/TodosProvider";

const TodoForm = ({ onSubmit, edit }) => {
  const dispatch = useTodosActions();
  const [input, setInput] = useState(edit ? edit.text : "");
  const inputRef = useRef("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      if (!input) {
        alert("enter input !!");
      }
      onSubmit(input);
      setInput("");
    } else {
      !input
        ? alert("enter input !!!")
        : dispatch({ type: "add", value: input });
      setInput("");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.formControl}>
      <input
        type="text"
        value={input}
        onChange={changeHandler}
        placeholder={edit ? "update ..." : "add new todo"}
        ref={inputRef}
      />
      <button
        className={`${styles.btn} ${edit ? styles.edit : styles.add}`}
        type="submit"
      >
        {edit ? "Edit" : "ADD"}
      </button>
    </form>
  );
};

export default TodoForm;

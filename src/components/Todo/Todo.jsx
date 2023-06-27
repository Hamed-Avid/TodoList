import styles from "./todo.module.css";
import { FaTimes, FaCheck, FaTrashAlt, FaPencilAlt } from "react-icons/fa";

const Todo = ({ todo, onComplete, onDelete, onUpdate }) => {
  return (
    <div className={styles.todo}>
      <div className={todo.isCompleted ? styles.completed : ""}>
        {todo.text}
      </div>
      <div className={styles.actions}>
        <button onClick={onUpdate} className={styles.btn}>
          <FaPencilAlt />
        </button>
        <button onClick={onComplete} className={styles.btn}>
          {todo.isCompleted ? (
            <FaTimes className={styles.times} />
          ) : (
            <FaCheck className={styles.tick} />
          )}
        </button>
        <button onClick={onDelete} className={styles.btn}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default Todo;

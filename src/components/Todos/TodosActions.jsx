import {
  MdOutlineChecklistRtl,
  MdOutlineClearAll,
  MdSync,
} from "react-icons/md"
import Button from "../UI/Button"

import styles from "./TodosActions.module.css"

function TodosActions({
  resetTodos,
  clearCompletedTodos,
  markAsCompleted,
  completedTodosExist,
  checkIfAllCompletedTodos,
}) {
  return (
    <div className={styles.todosActionContainer}>
      <Button
        title="Mark all as Completed"
        onClick={markAsCompleted}
        disabled={!checkIfAllCompletedTodos}
      >
        <MdOutlineChecklistRtl />
      </Button>
      <Button
        title="Clear Completed tasks"
        onClick={clearCompletedTodos}
        disabled={!completedTodosExist}
      >
        <MdOutlineClearAll />
      </Button>
      <Button title="Reset tasks" onClick={resetTodos}>
        <MdSync />
      </Button>
    </div>
  )
}

export default TodosActions

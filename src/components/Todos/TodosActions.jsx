import {
  MdOutlineChecklistRtl,
  MdOutlineClearAll,
  MdSync,
} from "react-icons/md"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
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
    <>
      <div className={styles.todosActionContainer}>
        <Button
          /* title="Mark all as Completed" */
          id="mark-all"
          onClick={markAsCompleted}
          disabled={!checkIfAllCompletedTodos}
        >
          <MdOutlineChecklistRtl />
        </Button>
        <Button
          /*           title="Clear Completed tasks" */
          id="clear-completed"
          onClick={clearCompletedTodos}
          disabled={!completedTodosExist}
        >
          <MdOutlineClearAll />
        </Button>
        <Button /* title="Reset tasks" */ id="reset" onClick={resetTodos}>
          <MdSync />
        </Button>
      </div>
      <Tooltip
        className="tooltip"
        anchorId="mark-all"
        content="Mark all as Completed"
        place="top"
      />
      <Tooltip
        className="tooltip"
        anchorId="clear-completed"
        content="Clear Completed tasks"
        place="bottom"
      />
      <Tooltip
        className="tooltip"
        anchorId="reset"
        content="Reset tasks"
        place="top"
      />
    </>
  )
}

export default TodosActions

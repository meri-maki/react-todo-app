import { useState } from "react"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import Button from "../UI/Button"

import styles from "./TodoForm.module.css"

function TodoForm({ addTodo }) {
  const [newTodo, setnewTodo] = useState("")

  function onSubmitHandler(e) {
    e.preventDefault()
    addTodo(newTodo)
    setnewTodo("")
  }

  return (
    <>
      <div className={styles.todoFormContainer}>
        <form onSubmit={onSubmitHandler}>
          <input
            autoFocus
            type="text"
            value={newTodo}
            onChange={(event) => setnewTodo(event.target.value)}
            placeholder="Let's plan your day"
          ></input>
          <Button
            id="add-task"
            type="submit"
            title="Submit task"
            onSubmit={addTodo}
          >
            Add
          </Button>
        </form>
      </div>
      <Tooltip
        className="tooltip"
        anchorId="add-task"
        content="Add Todo"
        place="bottom"
      />
    </>
  )
}

export default TodoForm

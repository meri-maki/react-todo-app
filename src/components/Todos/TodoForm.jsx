import React, { useState/* , useEffect, useRef */ } from "react"
import Button from "../UI/Button"

import styles from "./TodoForm.module.css"

function TodoForm({ addTodo }) {
  const [newTodo, setnewTodo] = useState("")
  /* const inputRef = useRef(null)
  useEffect(() => inputRef.current.focus()) */
  
  function onSubmitHandler(e) {
    e.preventDefault()
    addTodo(newTodo)
    setnewTodo("")
  }

  return (
    <div className={styles.todoFormContainer}>
      <form onSubmit={onSubmitHandler}>
        <input
          autoFocus
          type="text"
          value={newTodo}
          onChange={(event) => setnewTodo(event.target.value)}
          placeholder="Let's plan your day"
          /* ref={inputRef} */
        ></input>
        <Button type="submit" title="Submit task" onSubmit={addTodo}>
          Add
        </Button>
      </form>
    </div>
  )
}

export default TodoForm

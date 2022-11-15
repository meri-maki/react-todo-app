import React, { useRef, useEffect, useState, useCallback } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { MdDoneOutline } from "react-icons/md"

import styles from "./TodoEditInput.module.css"

function TodoEditInput({
  setEditedTodo,
  editedTodo,
  editTodo,
  todo,
}) {
  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      editTodo(todo.id)
    }
  }

  /* const inputEditRef = useRef(null)
  useEffect(() => inputEditRef.current.focus()) */


  const [type, setType] = useState("text")
  const inputRef = useRef(null)
  const onToggle = useCallback(() => {
    setType((current) => (type === "text" ? "password" : "text"))
    // Setting focus here
    inputRef.current.focus()
  }, [])
  useEffect(() => {
    // Moving cursor to the end
    inputRef.current.selectionStart = inputRef.current.value.length
    inputRef.current.selectionEnd = inputRef.current.value.length
  }, [type])

  return (
    <form className={`${styles.editForm} editFormInput`}>
      <TextareaAutosize
        autoFocus
        spellCheck={false}
        className={styles.editInput}
        type="type"
        placeholder={todo.text}
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
        onKeyDown={onKeyDownHandler}
        ref={inputRef}
      />
      <div className={styles.editIconContainer}>
        <MdDoneOutline
          className={styles.editIcon}
          onClick={() => {
            onToggle()
            if (!editedTodo || /^\s*$/.test(editedTodo)) {
              //prevents only spaces to be count as input
              return
            }
            editTodo(todo.id)
          }}
        />

      </div>
    </form>
  )
}

export default TodoEditInput

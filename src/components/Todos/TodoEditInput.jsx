/* import React /* ,{ useRef, useEffect, useState, useCallback } from "react" */
import TextareaAutosize from "react-textarea-autosize"
import { MdDoneOutline } from "react-icons/md"

import styles from "./TodoEditInput.module.css"

function TodoEditInput({ setEditedTodo, editedTodo, editTodo, todo }) {
  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      editTodo(todo.id)
    }
  }

  return (
    <form className={`${styles.editForm} editFormInput`}>
      <TextareaAutosize
        autoFocus
        spellCheck={false}
        className={styles.editInput}
        placeholder={todo.text}
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
        onKeyDown={onKeyDownHandler}
      />
      <div className={styles.editIconContainer}>
        <MdDoneOutline
          className={styles.editIcon}
          onClick={() => editTodo(todo.id)}
        />
      </div>
    </form>
  )
}

export default TodoEditInput

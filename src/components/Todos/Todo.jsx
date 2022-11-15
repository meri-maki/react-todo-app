import React from "react"
import { Reorder, useDragControls } from "framer-motion"
import {
  MdDragIndicator,
  MdOutlineModeEditOutline,
  MdDone,
} from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"

import TodoEditInput from "./TodoEditInput"

import styles from "./Todo.module.css"

function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  setEditID,
  setEditedTodo,
  editedTodo,
  editID,
  editTodo,
}) {
  const controls = useDragControls()
  return (
    <Reorder.Item
      value={todo}
      dragListener={false}
      dragControls={controls}
      className={styles.todoContainer}
    >
      {editID !== todo.id && (
        <MdDragIndicator
          onPointerDown={(e) => controls.start(e)}
          className={styles.dragIcon}
        />
      )}
      {editID === todo.id ? (
        <TodoEditInput
          editTodo={editTodo}
          setEditedTodo={setEditedTodo}
          editedTodo={editedTodo}
          setEditID={setEditID}
          editID={editID}
          todo={todo}
        />
      ) : (
        <div
          className={styles.todoOutlined}
          onClick={() => toggleTodo(todo.id)}
        >
          <div
            className={`${styles.todo} ${
              todo.isCompleted ? styles.completedTodo : ""
            }`}
          >
            {todo.isCompleted && <MdDone className={styles.completedIcon} />}
            <div className={styles.todoText}>{todo.text}</div>
            <div className={styles.iconsContainer}>
              {!todo.isCompleted && (
                <MdOutlineModeEditOutline
                  className={styles.editIcon}
                  onClick={(e) => {
                    e.stopPropagation()
                    setEditID(todo.id)
                    setEditedTodo(todo.text)
                  }}
                />
              )}
              <RiDeleteBin6Line
                className={styles.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTodo(todo.id)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Reorder.Item>
  )
}

export default Todo

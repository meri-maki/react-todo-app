import React, {forwardRef} from 'react';
import { MdDragIndicator, MdOutlineModeEditOutline } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri/"
import { useSortable } from "@dnd-kit/sortable"
import {
  restrictToParentElement
} from "@dnd-kit/modifiers";
import {CSS} from "@dnd-kit/utilities"
import TodoEditInput from "./TodoEditInput"
import CompletedIcon from "../UI/СompletedIcon"
import styles from "./Todo.module.css"


const Todo = forwardRef(({
  todo,
  toggleTodo,
  deleteTodo,
  setEditID,
  setEditedTodo,
  editedTodo,
  editID,
  editTodo
}, ref) => {

  const {attributes, listeners, setNodeRef,setActivatorNodeRef, transform, transition } = useSortable({id: todo.id})

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }



  return (
    <div  ref={setNodeRef} style={style} {...attributes} modifiers={[restrictToParentElement]} className={styles.todoContainer}>
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
        <>
          <MdDragIndicator className={styles.dragIcon} {...listeners} ref={setActivatorNodeRef}/>
          <div
            className={`${styles.todoOutlined} ${
              todo.isCompleted ? styles.completedTodo : ""
            }`}
            onClick={() => toggleTodo(todo.id)}
          >
            <div className={styles.todo}>
              {todo.isCompleted && (
                <div className={styles.completedIconContainer}>
                  <CompletedIcon />
                  <div className={styles.completedCircle}></div>
                </div>
              )}

              <div className={styles.todoText}>{todo.text}</div>

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
        </>
      )}
    </div>
  )
})

export default Todo

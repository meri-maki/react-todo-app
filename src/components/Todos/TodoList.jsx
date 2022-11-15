import React from "react"
import { Reorder } from "framer-motion"
import Todo from "./Todo"
import styles from "./TodoList.module.css"

function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  setEditedTodo,
  setEditID,
  editedTodo,
  editID,
  editTodo,
  setTodos,
}) {
  return (
    <Reorder.Group
      as="ol"
      axys="y"
      values={todos}
      onReorder={setTodos}
      className={styles.todoListContainer}
      onClick={(e) => e.stopPropagation()}

    >
      {!todos.length && <h2>The list is empty</h2>}

      {todos.map((todo) => (
        <Todo
          /* classname={todo.isCompleted ? 'completedTodo' : ''} */
          todo={todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          setEditedTodo={setEditedTodo}
          setEditID={setEditID}
          editedTodo={editedTodo}
          editID={editID}
        />
      ))}
    </Reorder.Group>
  )
}

export default TodoList

import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid" // helps generate random id

import "./App.css"
import TodoForm from "./components/Todos/TodoForm"
import TodoList from "./components/Todos/TodoList"
import TodosActions from "./components/Todos/TodosActions"

function App() {
  const [todos, setTodos] = useState([])
  const [editID, setEditID] = useState(null)
  const [editedTodo, setEditedTodo] = useState("")

  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  const addTodoHandler = (text) => {
    const newTodo = {
      /* id: Math.floor(Math.random * 100),  better not to use Math.random*/
      id: uuidv4(),
      text,
      isCompleted: false,
    }
    if (!text || /^\s*$/.test(text)) {
      //prevents only spaces to be count as input
      return
    }
    setTodos([...todos, newTodo])
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.text = editedTodo
        }
        return todo
      })
    )
    setEditID(null)
    setEditedTodo("")
  }

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodoHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      )
    )
  }

  const resetTodosHandler = () => setTodos([])
  const clearCompltedTodosHandler = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted))
  }
  const markAsCompletedHandler = () =>
    setTodos(
      todos.map((todo) =>
        todo.isCompleted === false
          ? { ...todo, isCompleted: true }
          : { ...todo }
      )
    )

  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  const checkIfAllCompletedTodos = todos.filter(
    (todo) => !todo.isCompleted
  ).length

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="app-container">
        <TodoForm addTodo={addTodoHandler} />
        {!!todos.length && (
          <TodosActions
            completedTodosExist={!!completedTodosCount}
            checkIfAllCompletedTodos={!!checkIfAllCompletedTodos}
            resetTodos={resetTodosHandler}
            clearCompletedTodos={clearCompltedTodosHandler}
            markAsCompleted={markAsCompletedHandler}
          />
        )}

        <TodoList
          setTodos={setTodos}
          toggleTodo={toggleTodoHandler}
          deleteTodo={deleteTodoHandler}
          editTodo={editTodo}
          setEditID={setEditID}
          editID={editID}
          setEditedTodo={setEditedTodo}
          editedTodo={editedTodo}
          todos={todos}
        />
        {completedTodosCount > 0 && completedTodosCount !== todos.length && (
          <h2 className="completed-count-text">
            {`You have completed `}
            <span className="completed-count-text-number">
              {completedTodosCount}
            </span>
            {completedTodosCount > 1 ? " tasks." : " task."}
          </h2>
        )}

        {completedTodosCount !== 0 && completedTodosCount === todos.length && (
          <h2 className="completed-count-text">{`Congratulations! You have completed all your tasks for today!`}</h2>
        )}
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { arrayMove } from "@dnd-kit/sortable"
import { v4 as uuidv4 } from "uuid" // helps generate random id
import "./App.css"
import TodoForm from "./components/Todos/TodoForm"
import TodoList from "./components/Todos/TodoList"
import TodosActions from "./components/Todos/TodosActions"

function App() {
  const { width, height } = useWindowSize()
  const [todos, setTodos] = useState([])
  const [editID, setEditID] = useState(null)

  const [editedTodo, setEditedTodo] = useState("")

  // ------- LOCAL STORAGE -------
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

  // ------- TODO FUNCTIONS -------
  const addTodoHandler = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      isCompleted: false,
    }
    if (!text || /^\s*$/.test(text)) {
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

  // ------- TODOS ACTIONS FUNCTIONS -------
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

  // ------- TODO LIST STATISTICS FUNCTION -------
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length
  const checkIfAllCompletedTodos = todos.filter(
    (todo) => !todo.isCompleted
  ).length

  // ------- TODO DRAG AND DROP FUNCTIONS -------
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setTodos((todos) => {
        const activeIndex = todos.findIndex((todo) => todo.id === active.id)
        const overIndex = todos.findIndex((todo) => todo.id === over.id)

        return arrayMove(todos, activeIndex, overIndex)
      })
    }
  }

  // ------- MAIN RETURN -------
  return (
    <div className="App">
      {completedTodosCount !== 0 && completedTodosCount === todos.length && (
        <Confetti
          numberOfPieces={800}
          width={width}
          height={height}
          run={true}
          recycle={false}
        />
      )}
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
          toggleTodo={toggleTodoHandler}
          deleteTodo={deleteTodoHandler}
          editTodo={editTodo}
          setEditID={setEditID}
          editID={editID}
          setEditedTodo={setEditedTodo}
          editedTodo={editedTodo}
          handleDragEnd={handleDragEnd}
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

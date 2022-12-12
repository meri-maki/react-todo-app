import { useEffect, useState } from "react"

const BoredTask = () => {
  const API_URL = "https://www.boredapi.com/api/activity"
  const [boredTodo, setBoredTodo] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL)
          const boredTodo = await response.json()
          setBoredTodo(boredTodo)
        } catch (error) {
          setError(error.message)
        }
        setIsLoading(false)
      }
      fetchData()
    }, 7000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className={
        isLoading
          ? "bored-todo-loading bored-todo-container"
          : "bored-todo-animated bored-todo-container"
      }
    >
      {isLoading ? (
        <h3>
          <span>Planning...</span>
        </h3>
      ) : (
        <h3>
          Tip: <span>{boredTodo.activity}</span>
        </h3>
      )}
    </div>
  )
}

export default BoredTask

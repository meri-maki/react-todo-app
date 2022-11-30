import React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers"
import styles from "./TodoList.module.css"
import Todo from "./Todo"


function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  setEditedTodo,
  setEditID,
  editedTodo,
  editID,
  editTodo,
  handleDragEnd,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className={styles.todoListContainer}>
      {!todos.length && <h2>The list is empty</h2>}
      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[
          restrictToVerticalAxis,
          restrictToWindowEdges,
          restrictToVerticalAxis,
          restrictToFirstScrollableAncestor,
        ]}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <Todo
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
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default TodoList

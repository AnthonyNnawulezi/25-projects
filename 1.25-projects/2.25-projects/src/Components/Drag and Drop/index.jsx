import { useCallback, useState } from "react";
import "./style.css";
import { useEffect } from "react";

function DragAndDrop() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedTodoId, setDraggedTodoId] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://dummyjson.com/todos");

      if (!response.ok) throw new Error("Error fetching todo");

      const data = await response.json();

      setTodos(data.todos);
      console.log(data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data, Check your network", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  //   const inProgressTodos = todos.filter(
  //     (todo) => todo.completed === false,
  //   );
  //   const completedTodos = todos.filter((todo) => todo.completed === true);

  const inProgressTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  function handleDragStart(todoId) {
    setDraggedTodoId(todoId);
  }

  function handleDrop(completedStatus) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === draggedTodoId) {
        return {
          ...todo,
          completed: completedStatus,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setDraggedTodoId(null);
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag And Drop</h1>
      <div className="drag-and-drop-wrapper">
        <div
          className="todo-wrapper-"
          onDrop={() => handleDrop(false)}
          onDragOver={(event) => event.preventDefault()}
        >
          <p>In Progress</p>
          {inProgressTodos &&
            inProgressTodos.map((todo) => (
              <ul onDragStart={() => handleDragStart(todo.id)} draggable>
                <li key={todo.id}>{todo.todo}</li>
              </ul>
            ))}
        </div>
        <div
          className="todo-wrapper"
          onDrop={() => handleDrop(true)}
          onDragOver={(event) => event.preventDefault()}
        >
          <p>Completed</p>
          {completedTodos &&
            completedTodos.map((todo) => (
              <ul onDragStart={() => handleDragStart(todo.id)} draggable>
                <li key={todo.id} draggable>
                  {todo.todo}
                </li>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;

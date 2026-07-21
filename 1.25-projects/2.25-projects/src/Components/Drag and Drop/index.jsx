import { useCallback, useState } from "react";
import "./style.css";
import { useEffect } from "react";

function DragAndDrop() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const inProgressTodos = todos.filter(
    (todo) => todo.completed === false,
    // (todo) => !todo.completed,
  );
  const completedTodos = todos.filter((todo) => todo.completed === true);

  function onDrag(event) {
    event.preventDefault();
    setTodos(inProgressTodos);
  }
  function onDrop(event) {
    event.preventDefault();

    setTodos(completedTodos);
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag And Drop</h1>
      <div className="drag-and-drop-wrapper">
        <div className="todo-wrapper-">
          <p>In Progress</p>
          {inProgressTodos &&
            inProgressTodos.map((todo) => (
              <ul
                onDragStart={(event) => onDrag(event.dataTransfer)}
                onDrop={(event) => onDrop(event.dataTransfer.setData())}
              >
                <li key={todo.id} draggable>
                  {todo.todo}
                </li>
              </ul>
            ))}
        </div>
        <div className="todo-wrapper">
          <p>Completed</p>
          {completedTodos &&
            completedTodos.map((todo) => (
              <ul
                onDragStart={(event) => onDrag(event.dataTransfer)}
                onDrop={(event) => onDrop(event.dataTransfer.setData())}
              >
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

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

  //   function completedTodo() {
  //     for (let i = 0; i < todos.length; i++) {
  //       const listOfTodos = todos[i].completed.true;

  //       return listOfTodos;
  //     }
  //   }
  //   function inProgressTodo() {
  //     for (let i = 0; i < todos.length; i++) {
  //       const listOfTodos = todos[i].completed.false;

  //       return listOfTodos;
  //     }
  //   }

  function onMouseOver(todo) {
    const listOfTodos = [...todos, todos.push()];
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag And Drop</h1>
      <div className="drag-and-drop-wrapper">
        <div className="todo-wrapper-">
          <p>In Progress</p>
          {todos &&
            todos.map((todo) => (
              <ul onMouseOver={(todo) => onMouseOver(todo)} onDrop={onDrop}>
                <li key={todo.id} draggable>
                  {todo.todo}
                </li>
              </ul>
            ))}
        </div>
        <div className="todo-wrapper">Completed</div>
      </div>
    </div>
  );
}

export default DragAndDrop;

import { useCallback, useState } from "react";
import "./style.css";

function DragAndDrop() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  try {
    const fetchTodos = useCallback(async () => {
      setIsLoading(true);

      const response = await fetch("https://dummyjson.com/todos");

      if (!response.ok) throw new Error("Error fetching todo");

      const data = await response.json();
      console.log(data);

      //   setTodos(data.todos);
      setIsLoading(false);
    }, []);

    fetchTodos();
  } catch (error) {
    console.error("Error fetching data, Check your network", error);
    setIsLoading(false);
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag And Drop</h1>
      <div className="drag-and-drop-wrapper">
        <div className="todo-wrapper-">In Progress</div>
        <div className="todo-wrapper">Completed</div>
      </div>
    </div>
  );
}

export default DragAndDrop;

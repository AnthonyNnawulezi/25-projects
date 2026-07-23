import { useCallback, useMemo, useState } from "react";
import "./style.css";
import { useEffect } from "react";

// function DragAndDrop() {
//   const [todos, setTodos] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [draggedTodoId, setDraggedTodoId] = useState(null);
//   const [error, setError] = useState("");

//   const fetchTodos = useCallback(async () => {
//     try {
//       setIsLoading(true);

//       const response = await fetch("https://dummyjson.com/todos");

//       if (!response.ok) throw new Error("Error fetching todo");

//       const data = await response.json();

//       setTodos(data.todos);
//       console.log(data);

//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data, Check your network", error);
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const inProgressTodos = todos.filter((todo) => !todo.completed);
//   const completedTodos = todos.filter((todo) => todo.completed);

//   function handleDragStart(todoId) {
//     setDraggedTodoId(todoId);
//   }

//   function handleDrop(completedStatus) {
//     const updatedTodos = todos.map((todo) => {
//       if (todo.id === draggedTodoId) {
//         return {
//           ...todo,
//           completed: completedStatus,
//         };
//       }
//       return todo;
//     });
//     setTodos(updatedTodos);
//     setDraggedTodoId(null);
//   }

//   return (
//     <div className="drag-and-drop-container">
//       <h1>Drag And Drop</h1>
//       <div className="drag-and-drop-wrapper">
//         <div
//           className="todo-wrapper-"
//           onDrop={() => handleDrop(false)}
//           onDragOver={(event) => event.preventDefault()}
//         >
//           <p>In Progress</p>
//           {inProgressTodos &&
//             inProgressTodos.map((todo) => (
//               <li onDragStart={() => handleDragStart(todo.id)}>
//                 <ul key={todo.id} draggable>
//                   {todo.todo}
//                 </ul>
//               </li>
//             ))}
//         </div>
//         <div
//           className="todo-wrapper"
//           onDrop={() => handleDrop(true)}
//           onDragOver={(event) => event.preventDefault()}
//         >
//           <p>Completed</p>
//           {completedTodos &&
//             completedTodos.map((todo) => (
//               <li onDragStart={() => handleDragStart(todo.id)}>
//                 <ul key={todo.id} draggable>
//                   {todo.todo}
//                 </ul>
//               </li>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

const TODOS_API_URL = "https://dummyjson.com/todos";

const STATUS = {
  IN_PROGRESS: false,
  COMPLETED: true,
};

function DragAndDrop() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTodos = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(TODOS_API_URL, {
        signal,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch todos. HTTP status: ${response.status}`,
        );
      }

      const data = await response.json();

      setTodos(data.todos);
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      console.error("Failed to fetch todos:", error);
      setError("Unable to load todos. Please try again.");
    } finally {
      setIsLoading(false);
    }

    // return () => {
    //   abortController.abort();
    // };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    loadTodos(abortController.signal);
    return () => abortController.abort();
  }, [loadTodos]);

  const handleDragStart = (event, todoId) => {
    // Store the todo id as text data on the drag
    event.dataTransfer.setData("id", todoId.toString());
    // Tells the browser this is a "move" action, which changes the mouse cursor visually
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = useCallback((e) => {
    e.currentTarget.classList.remove("dragging");
  }, []);

  const handleDrop = useCallback((e, completedStatus) => {
    e.preventDefault(); // Good practice to ensure the drop is allowed
    // Retrieve the id from the drag data store
    const id = Number(e.dataTransfer.getData("id"));
    if (!id) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: completedStatus } : todo,
      ),
    );
    e.currentTarget.classList.remove("drag-over");
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.currentTarget.classList.add("drag-over");
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.currentTarget.classList.remove("drag-over");
  }, []);

  const inProgressTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos],
  );

  if (isLoading) {
    return <div className="drag-and-drop-container">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="drag-and-drop-container">
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
        <button onClick={() => loadTodos()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="drag-and-drop-container">
      <h1>Drag And Drop</h1>
      <div className="drag-and-drop-wrapper">
        <div
          className="todo-wrapper"
          onDrop={(e) => handleDrop(e, STATUS.IN_PROGRESS)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
        >
          <p>In Progress</p>
          <ul>
            {inProgressTodos.map((todo) => (
              <li
                key={todo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, todo.id)}
              >
                {todo.todo}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="todo-wrapper"
          onDrop={(e) => handleDrop(e, STATUS.COMPLETED)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
        >
          <p>Completed</p>
          <ul>
            {completedTodos.map((todo) => (
              <li
                key={todo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, todo.id)}
              >
                {todo.todo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DragAndDrop;

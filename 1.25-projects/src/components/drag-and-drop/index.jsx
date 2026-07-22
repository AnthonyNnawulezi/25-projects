import { useEffect, useState } from "react";
import "./style.css";

// function DragAndDrop() {
//   const [loading, setLoading] = useState(false);
//   const [todos, setTodos] = useState([]);

//   async function fetchTodos() {
//     try {
//       setLoading(true);
//       const response = await fetch("https://dummyjson.com/todos");
//       const result = await response.json();

//       if (result && result.todos && result.todos.length > 0) {
//         const updatedTodos = result.todos.map((todo) => ({
//           ...todo,
//           status: "inProgress",
//         }));
//         setTodos(updatedTodos);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchTodos();
//     console.log(todos);
//   }, []);

//   function onDragStart(e, id) {
//     e.dataTransfer.setData("id", id);
//   }
//   function onDrop(e, status) {
//     const id = e.dataTransfer.getData("id");
//     console.log(e.dataTransfer.getData("id"));
//     const updatedTodos = todos.map((todo) =>
//       todo.id.toString() === id ? { ...todo, status } : todo
//     );
//     setTodos(updatedTodos);
//   }

//   function renderTodos() {
//     const todosToRender = {
//       inProgress: [],
//       completed: [],
//     };
//     if (!Array.isArray(todos)) return todosToRender;
//     todos.forEach((todo) => {
//       todosToRender[todo.status].push(
//         <div
//           onDragStart={(e) => onDragStart(e, todo.id)}
//           draggable
//           key={todo.id}
//           className="todo-card"
//         >
//           {todo.todo}
//         </div>
//       );
//     });
//     return todosToRender;
//   }
//   if (loading) return <h1>Loading! Please wait</h1>;

//   return (
//     <div className="drag-and-drop-container">
//       <h1>Drag And Drop</h1>
//       <div className="drag-and-drop-board">
//         <div
//           onDrop={(e) => onDrop(e, "inProgress")}
//           onDragOver={(e) => e.preventDefault()}
//           className="in-progress"
//         >
//           <h3>In Progress</h3>
//           {renderTodos().inProgress}
//         </div>

//         <div
//           onDrop={(e) => onDrop(e, "completed")}
//           onDragOver={(e) => e.preventDefault()}
//           className="completed"
//         >
//           <h3>Completed</h3>
//           {renderTodos().completed}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DragAndDrop;

const TODOS_API_URL = "https://dummyjson.com/todos";

const STATUS = {
  IN_PROGRESS: false,
  COMPLETED: true,
};

function DragAndDrop() {
  useEffect(() => {
    const abortController = new AbortController();

    async function loadTodos() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(TODOS_API_URL, {
          signal: abortController.signal,
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
    }

    loadTodos();

    return () => {
      abortController.abort();
    };
  }, []);

  const inProgressTodos = useMemo(
    () => todos.filter((todo) => !todo.completed),
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed),
    [todos],
  );

  if (error) {
    return (
      <div className="drag-and-drop-container">
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
        <button onClick={() => fetchTodos()}>Retry</button>
      </div>
    );
  }
}

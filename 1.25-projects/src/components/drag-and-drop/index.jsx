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
  const fetchTodos = useCallback(async () => {
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

    // return () => {
    //   abortController.abort();
    // };
  }, []);

  useEffect(() => {
    loadTodos();
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

    const handleDragOver = useCallback((e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      e.currentTarget.classList.add("drag-over");
    }, []);

    const handleDragLeave = useCallback((e) => {
      e.currentTarget.classList.remove("drag-over");
    }, []);

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: completedStatus } : todo,
      ),
    );
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
          onDrop={(e) => handleDrop(e, false)}
          onDragOver={(e) => e.preventDefault()}
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
          onDrop={(e) => handleDrop(e, true)}
          onDragOver={(e) => e.preventDefault()}
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

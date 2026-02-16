import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config/";
import Todos from "./todo";
import "./style.css";

const todoQuery = query(collection(db, "todos"), orderBy("timestamp", "desc"));

function Todo({ authInfo = null }) {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    if (!authInfo?.user) return; // Don't attach listener if user not authenticated

    const unsubscribe = onSnapshot(
      todoQuery,
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data(),
          }))
        );
        console.log(todos, "snapshot");
      },
      (error) => {
        console.error("Snapshot error:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [authInfo?.user]);

  const addOrEditTodo = (e) => {
    e.preventDefault();
    currentTodo
      ? updateDoc(doc(db, "todos", currentTodo), {
          todo: input,
          timestamp: serverTimestamp(),
        })
      : addDoc(collection(db, "todos"), {
          todo: input,
          timestamp: serverTimestamp(),
        });
    setInput("");
    setCurrentTodo(null);
  };

  return (
    <div className="todo-wrapper">
      <h1>Todo App</h1>
      <form onSubmit={addOrEditTodo} action="">
        <TextField
          id="todo"
          label="Create Todo"
          variant="outlined"
          type="text"
          value={input}
          size="small"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" color="primary" variant="contained">
          {currentTodo ? "Edit Todo" : "Add Todo"}
        </Button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <Todos
            setInput={setInput}
            key={todo.id}
            setCurrentTodo={setCurrentTodo}
            todo={todo}
            authInfo={authInfo}
          />
        ))}
      </ul>
    </div>
  );
}

export default Todo;

import { Button, List, ListItem, ListItemText } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

function Todos({ todo, setCurrentTodo, setInput }) {
  function deleteTodo(id) {
    deleteDoc(doc(db, "todos", id));
  }

  return (
    <List>
      <ListItem>
        <ListItemText primary={todo?.todo?.todo} />
      </ListItem>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          setCurrentTodo(todo.id);
          setInput(todo.todo.todo);
        }}
      >
        Edit
      </Button>
    </List>
  );
}

export default Todos;

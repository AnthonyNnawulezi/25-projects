import { Button, List, ListItem, ListItemText } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config";

function Todos({ todo, setCurrentTodo, setInput, authInfo }) {
  function deleteTodo(id) {
    deleteDoc(doc(db, "todos", id));
  }

  return (
    <List>
      <ListItem>
        <ListItemText primary={todo?.todo?.todo} />
      </ListItem>
      {authInfo !== null ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
      ) : null}
      {authInfo !== null ? (
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
      ) : null}
    </List>
  );
}

export default Todos;

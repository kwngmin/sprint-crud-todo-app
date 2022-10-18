import "./App.css";
// import Todos from "./Todos";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleDeleteClick = (e) => {
    /* delete 버튼을 누르면 다시 home으로 리다이렉트 되어야 합니다. */
    /* useNavigate()를 이용하여 로직을 작성해주세요. */
    console.log(e);
    fetch(`http://localhost:3001/todos/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // navigate("/");
        // window.location.reload();
      })
      .catch((err) => {
        setError(err.message);
      });
    console.log("delete!");
  };

  return (
    <div className="App">
      {todos.length}
      {todos.map((todo) => (
        <div className="todo-preview" key={todo.id}>
          <span>{todo.todo}</span>
          <span onClick={handleDeleteClick()}>delete</span>
        </div>
      ))}
    </div>
  );
}

export default App;

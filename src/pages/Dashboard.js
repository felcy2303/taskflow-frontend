import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");

  const getTodos = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://taskflow-backend-7xaw.onrender.com/api/todos",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setTodos(res.data);

    } catch (error) {
      alert("Failed to load tasks");
    }
  }, [token]);

  const addTodo = async () => {
    if (!text) return;

    await axios.post(
      "http://taskflow-backend-7xaw.onrender.com/api/todos",
      { text },
      {
        headers: {
          Authorization: token
        }
      }
    );

    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(
      `http://taskflow-backend-7xaw.onrender.com/api/todos/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );

    getTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
useEffect(() => {
  getTodos();
}, [getTodos]);

  return (
    <div className="dashboard">
      <h1>TaskFlow Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTodo}>Add Task</button>

      {todos.map((todo) => (
        <div className="todo" key={todo._id}>
          <span>{todo.text}</span>

          <button
            style={{
              width: "90px",
              marginTop: "0"
            }}
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

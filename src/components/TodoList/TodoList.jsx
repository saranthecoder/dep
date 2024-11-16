import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch username from localStorage
    const username = localStorage.getItem("username");

    // If no username found in localStorage, show an error
    if (!username) {
      setError("Username not found in localStorage.");
      setLoading(false);
      return;
    }

    // Fetch todos from the backend using the username
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://api.example.com/todos/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos.");
        }
        const data = await response.json();
        setTodos(data); // Set the todos data into the state
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTodos(); // Call the function to fetch todos
  }, []); // Empty dependency array to run once on component mount

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask(""); // Clear input field
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      {loading && <p>Loading...</p>} {/* Show loading state */}
      {error && <p className="error">{error}</p>} {/* Show error message if any */}
      
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      
      {!loading && !error && todos.length === 0 && <p>No tasks found.</p>} {/* No tasks available */}
      
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            {editId === todo.id ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
              </div>
            ) : (
              <span onClick={() => toggleComplete(todo.id)} className="todo-text">
                {todo.text}
              </span>
            )}
            <button onClick={() => deleteTask(todo.id)} className="delete-btn">
              Delete
            </button>
            {editId !== todo.id && (
              <button
                onClick={() => startEditing(todo.id, todo.text)}
                className="edit-btn"
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

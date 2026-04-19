import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import TaskList from "./TaskList";

// ✅ YOUR LIVE BACKEND URL
const API_URL = "https://fullstack-todo-app-l0rz.onrender.com";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 LOAD TASKS
  function loadTasks() {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }

  // 🔹 ADD TASK
  function addTask() {
    if (task.trim() === "") return;

    fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: task, done: false })
    })
      .then(() => {
        setTask("");
        loadTasks();
      })
      .catch((err) => console.error(err));
  }

  // 🔹 DELETE TASK
  function deleteTask(id) {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE"
    })
      .then(() => loadTasks())
      .catch((err) => console.error(err));
  }

  // 🔹 TOGGLE TASK
  function toggleTask(id) {
    const task = tasks.find((t) => t._id === id);

    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...task, done: !task.done })
    })
      .then(() => loadTasks())
      .catch((err) => console.error(err));
  }

  // 🔹 START EDIT
  function startEdit(id) {
    const task = tasks.find((t) => t._id === id);
    setEditId(id);
    setEditText(task.text);
  }

  // 🔹 SAVE EDIT
  function saveEdit(id) {
    const task = tasks.find((t) => t._id === id);

    fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...task, text: editText })
    })
      .then(() => {
        setEditId(null);
        setEditText("");
        loadTasks();
      })
      .catch((err) => console.error(err));
  }

  // 🔹 INITIAL LOAD
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          width: "380px",
          textAlign: "center"
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#333" }}>
          ✨ To-Do App
        </h1>

        <InputBox task={task} setTask={setTask} addTask={addTask} />

        {tasks.length === 0 && (
          <p style={{ color: "gray", marginTop: "10px" }}>
            No tasks yet. Add one 👇
          </p>
        )}

        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
        />
      </div>
    </div>
  );
}

export default App;
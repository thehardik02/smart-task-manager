import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const getSuggestions = async (id) => {
    const res = await axios.post(
      `http://localhost:5000/tasks/${id}/ai-suggest`
    );
    setSuggestions(res.data.suggestions);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Smart Task Manager</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
        />
        <button style={styles.addButton} onClick={addTask}>
          Add Task
        </button>
      </div>

      <div style={styles.taskList}>
        {tasks.map((t) => (
          <div key={t.id} style={styles.card}>
            <span>{t.title}</span>

            <div>
              <button
                style={styles.aiButton}
                onClick={() => getSuggestions(t.id)}
              >
                🤖 AI
              </button>
              <button
                style={styles.deleteButton}
                onClick={() => deleteTask(t.id)}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div style={styles.suggestionBox}>
          <h3>💡 Suggestions</h3>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  addButton: {
    padding: "10px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    marginLeft: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  aiButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  suggestionBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#eef",
    borderRadius: "8px",
  },
};

export default App;
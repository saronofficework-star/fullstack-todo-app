function InputBox({ task, setTask, addTask }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{
          padding: "10px",
          width: "70%",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={addTask}
        style={{
          padding: "10px",
          marginLeft: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add
      </button>
    </div>
  );
}

export default InputBox;
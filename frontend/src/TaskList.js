function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  startEdit,
  saveEdit,
  editId,
  editText,
  setEditText
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((t) => (
        <li
          key={t._id}
          style={{
            background: "#f5f7fa",
            margin: "10px 0",
            padding: "12px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "0.2s"
          }}
        >
          {editId === t._id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  padding: "6px",
                  borderRadius: "5px",
                  border: "1px solid #ccc"
                }}
              />
              <button onClick={() => saveEdit(t._id)}>Save</button>
            </>
          ) : (
            <>
              <span style={{
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "gray" : "black"
              }}>
                {t.text}
              </span>

              <div>
                <button
                  onClick={() => toggleTask(t._id)}
                  style={{ marginRight: "5px" }}
                >
                  ✔
                </button>

                <button
                  onClick={() => startEdit(t._id)}
                  style={{ marginRight: "5px" }}
                >
                  ✏️
                </button>

                <button onClick={() => deleteTask(t._id)}>❌</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
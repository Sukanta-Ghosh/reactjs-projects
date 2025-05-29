import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  addTask,
  deleteTask,
  fetchTasks,
  setFilter,
  toggleTask,
} from "./taskSlice";
import type { Task } from "./types";

export default function TaskManager() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, filter, loading } = useSelector(
    (state: RootState) => state.task
  );
  const [title, setTitle] = React.useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle("");
    }
  };

  return (
    <div className="task-manager-container">
      <h1 className="task-manager-title">Task Manager</h1>

      <div className="task-input-section">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-input"
          placeholder="Add new task"
        />
        <button onClick={handleAddTask} className="add-task-button">
          Add
        </button>
      </div>

      <div className="task-filter-buttons">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className="filter-button"
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className="filter-button"
        >
          Completed
        </button>
        <button
          onClick={() => dispatch(setFilter("pending"))}
          className="filter-button"
        >
          Pending
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task: Task) => (
            <li key={task.id} className="task-item">
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <span
                  className={
                    task.completed ? "task-title-completed" : "task-title"
                  }
                >
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="delete-task-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

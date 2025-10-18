import React, { useEffect, useState } from "react";
import { getAllTasks, addTask, deleteTask, updateTask } from "../api.js";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      console.log("-----------------------");

      console.log("tasks from server:", data);
      setTasks(data);
    } catch (error) {
      console.log("Error fetching tasks (before)", error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() === "") {
      alert("Please enter the task");
      return;
    }
    try {
      const newTask = await addTask(task);
      setTasks([...tasks, newTask]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const updated = await updateTask(id, { completed: !completed });

      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (error) {
      console.log("Error updating Task", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-950 flex items-center justify-center p-6">
      <div className="bg-purple-700 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          TaskTango✨📝
        </h1>
        <h3 className="flex items-center justify-center text-white">
          "Get It Done, One Task at a Time"⏱️
        </h3>

        <br></br>
        <div className="flex gap-2 mb-6">
          <input
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Add a new task..."
            value={task}
            className="flex-1 px-4 py-2 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-purple-800 text-white"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-yellow-300 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
          >
            Add
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3 text-white">Your Tasks :</h3>
        <ul className="space-y-2">
          {tasks.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center bg-purple-500 px-4 py-2 rounded-lg shadow-sm"
            >
              {/* Task Text */}
              <span
                className={`${
                  todo.completed ? "line-through text-black" : "text-white"
                }`}
              >
                {todo.title}
              </span>

              {/* Buttons wrapper */}
              <div className="flex gap-2">
                {/* Toggle Complete Button */}
                <button
                  onClick={() => toggleComplete(todo._id)}
                  className={`px-3 py-1 text-sm rounded-lg font-medium transition ${
                    todo.completed
                      ? "bg-green-400 text-black hover:bg-green-500"
                      : "bg-yellow-400 text-black hover:bg-yellow-500"
                  }`}
                >
                  {todo.completed ? "Undo" : "Mark Done"}
                </button>

                {/* Remove Button */}
                <button
                  onClick={() => removeTask(todo._id)}
                  className="px-3 py-1 text-sm rounded-lg font-medium bg-red-600 text-black hover:bg-red-700 transition"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

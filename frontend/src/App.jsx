import { useState, useEffect } from "react";
import {
  FaTrash,
  FaEdit,
  FaMoon,
  FaSun,
  FaCheck,
} from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH TASKS FROM BACKEND
  // =========================
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5001/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTasks();
      setLoading(false);
    };
    load();
  }, []);

  // =========================
  // ADD / UPDATE TASK
  // =========================
  const addTask = async () => {
  if (!taskData.title) {
    toast.error("Task title required");
    return;
  }

  try {
    if (editingId) {
      // REAL UPDATE
      await fetch(`http://localhost:5001/tesks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            due_date: taskData.dueDate,
          }),
      });

      toast.success("Task Updated");
      setEditingId(null);
    } else {
      // CREATE
      await fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            due_date: taskData.dueDate,
          }),
      });

      toast.success("Task Added");
    }

    setTaskData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });

    fetchTasks();
  } catch (err) {
    console.log(err);
    toast.error("Operation failed");
  }
};

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5001/tasks/${id}`, {
        method: "DELETE",
      });

      toast.success("Task Deleted");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // COMPLETE TASK
  // =========================
  const completeTask = async (id) => {
    const task = tasks.find((t) => t.id === id);

    try {
      await fetch(`http://localhost:5001/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT TASK (UI ONLY)
  // =========================
  const editTask = (task) => {
    setTaskData({
      title: task.title || "",
      description: task.description || "",
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
    });

    setEditingId(task.id);
  };

  // =========================
  // FILTERS
  // =========================
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <Toaster />

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow-lg bg-indigo-600 text-white">
        <h1 className="text-3xl font-bold">Advanced Todo App</h1>

        <button onClick={() => setDarkMode(!darkMode)} className="text-2xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Dashboard */}
      <div className="grid md:grid-cols-3 gap-5 p-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-blue-500 text-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-4xl mt-3">{tasks.length}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-green-500 text-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-4xl mt-3">{completedTasks}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-red-500 text-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold">Pending</h2>
          <p className="text-4xl mt-3">{tasks.length - completedTasks}</p>
        </motion.div>
      </div>

      {/* Form */}
      <div className={`max-w-3xl mx-auto p-6 rounded-2xl shadow-xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className="text-2xl font-bold mb-5">Add New Task</h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            className="p-3 rounded-lg border text-black"
          />

          <textarea
            placeholder="Description"
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="p-3 rounded-lg border text-black"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={taskData.priority}
              onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
              className="p-3 rounded-lg border text-black"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              value={taskData.dueDate}
              onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
              className="p-3 rounded-lg border text-black"
            />
          </div>

          <button
            onClick={addTask}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white p-3 rounded-xl font-bold"
          >
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto mt-6 px-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border text-black"
        />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-6 grid gap-5">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl shadow-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-2xl font-bold ${task.completed ? "line-through text-gray-500" : ""}`}>
                    {task.title}
                  </h2>

                  <p className="mt-2 text-gray-500">{task.description}</p>

                  <div className="flex gap-4 mt-4 flex-wrap">
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full">
                      {task.priority}
                    </span>

                    <span className="bg-gray-300 text-black px-3 py-1 rounded-full">
                      {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 text-xl">
                  <button onClick={() => completeTask(task.id)} className="text-green-500">
                    <FaCheck />
                  </button>

                  <button onClick={() => editTask(task)} className="text-blue-500">
                    <FaEdit />
                  </button>

                  <button onClick={() => deleteTask(task.id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
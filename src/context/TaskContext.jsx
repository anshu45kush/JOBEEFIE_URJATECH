import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();
const API_URL = "http://localhost:5000/api/tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD
  const addTask = async (task) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks((prev) => [...prev, data]);
  };

  // UPDATE
  const updateTask = async (id, updatedFields) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    const updated = await res.json();

    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updated : task))
    );
  };

  // DELETE
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );
  };

  // FILTER
  const getTasksByUser = (email) => {
    return tasks.filter(
      (task) =>
        task.assignedTo?.toLowerCase() === email.toLowerCase()
    );
  };

  // ✅ FIXED STATS (NO BUG)
  const getStats = (email) => {
    const userTasks = getTasksByUser(email);

    return {
      total: userTasks.length,
      completed: userTasks.filter(t => t.status === "completed").length,
      pending: userTasks.filter(t => t.status === "pending").length,
      inProgress: userTasks.filter(t => t.status === "in-progress").length,
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        getTasksByUser,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
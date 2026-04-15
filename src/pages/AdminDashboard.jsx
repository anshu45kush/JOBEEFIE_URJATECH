import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTasks } from "@/context/TaskContext";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const map = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs ${map[priority]}`}>
      {priority}
    </span>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");

  const handleAddTask = () => {
    if (!title || !email) return;

    addTask({
      title,
      description,
      assignedTo: email,
      priority,
      deadline,
    });

    setTitle("");
    setDescription("");
    setEmail("");
    setPriority("medium");
    setDeadline("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f172a] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">⚡ Admin</h2>

        <div className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold">
          TASKS
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="mt-auto bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        {/* TOPBAR */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Jobeefie Admin Panel
          </h1>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
              {user.email[0].toUpperCase()}
            </div>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 hover:shadow-lg transition">
          <h2 className="text-lg font-bold mb-4">Assign Task</h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              placeholder="Employee Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded col-span-2 focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border p-2 rounded"
            />

          </div>

          <button
            onClick={handleAddTask}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Assign Task
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Task</th>
                <th>Email</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No tasks yet 🚀
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b hover:bg-blue-50 transition duration-200"
                  >

                    <td className="py-3">
                      <div className="font-semibold text-gray-800">
                        {task.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {task.description}
                      </div>
                    </td>

                    <td>{task.assignedTo}</td>

                    <td>
                      <PriorityBadge priority={task.priority} />
                    </td>

                    <td>
                      {task.deadline ? (
                        <div>
                          {new Date(task.deadline).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                          {new Date(task.deadline) < new Date() && (
                            <span className="text-red-500 text-xs ml-2">
                              ⚠ Overdue
                            </span>
                          )}
                        </div>
                      ) : "-"}
                    </td>

                    <td>
                      <StatusBadge status={task.status} />
                    </td>

                    <td className="flex gap-2 py-2">

                      <select
                        value={task.status}
                        onChange={(e) =>
                          updateTask(task._id, {
                            status: e.target.value,
                          })
                        }
                        className="border p-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
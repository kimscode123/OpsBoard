import React, { useEffect, useState } from "react";
import {
  listTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskCompleted,
} from "../types/tasks";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ status: "", priority: "" });

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    priority: "medium",
    status: "open",
    assigned_to: null,
    due_date: "",
  });

  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 2500);
  }

  async function load() {
    try {
      setLoading(true);
      const data = await listTasks(filters);
      setTasks(data);
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [filters]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editing) {
        await updateTask(editing.id, form);
        showToast("success", "Task updated.");
      } else {
        await createNewTask(form);
        showToast("success", "Task created.");
      }
      setEditing(null);
      resetForm();
      load();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to save task.");
    }
  }

  function resetForm() {
    setForm({
      title: "",
      priority: "medium",
      status: "open",
      assigned_to: null,
      due_date: "",
    });
  }

  function startEdit(task) {
    setEditing(task);
    setForm({
      title: task.title,
      priority: task.priority,
      status: task.status,
      assigned_to: task.assigned_to,
      due_date: task.due_date || "",
    });
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      showToast("success", "Task deleted.");
      setConfirmDelete(null)
      load();
    } catch (err) {
      console.error(err);
      setConfirmDelete(null)
      showToast("error", "Failed to delete task.");
    }
  }

  async function handleComplete(task) {
    try {
      await markTaskCompleted(task.id);
      showToast("success", "Marked as completed.");
      load();
    } catch (err) {
      console.error(err);
      showToast("error", "Failed to update status.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`px-4 py-2 rounded-md text-sm ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 text-sm">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border border-slate-200 rounded-md px-2 py-1"
        >
          <option value="">All statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="border border-slate-200 rounded-md px-2 py-1"
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Create / Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 text-sm">
        <h3 className="font-semibold">{editing ? "Edit Task" : "Create Task"}</h3>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-slate-200 rounded-md px-2 py-1"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border border-slate-200 rounded-md px-2 py-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border border-slate-200 rounded-md px-2 py-1"
          >
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
          className="border border-slate-200 rounded-md px-2 py-1"
        />

        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          {editing ? "Save changes" : "Create task"}
        </button>
      </form>

      {/* Task Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold mb-3 text-sm">Tasks</h3>

        {loading ? (
          <div className="text-center py-6 text-slate-500 text-sm">Loading…</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-sm">No tasks found.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Priority</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Due</th>
                <th className="px-3 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b border-slate-100">
                  <td className="px-3 py-2">{t.title}</td>
                  <td className="px-3 py-2 capitalize">{t.priority}</td>
                  <td className="px-3 py-2 capitalize">{t.status}</td>
                  <td className="px-3 py-2">{t.due_date || "—"}</td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      className="px-2 py-1 border border-slate-200 rounded hover:bg-slate-50"
                      onClick={() => startEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border border-red-200 text-red-700 rounded hover:bg-red-50"
                      onClick={() => setConfirmDelete(t.id)}
                    >
                      Delete
                    </button>
                    {t.status !== "done" && (
                      <button
                        className="px-2 py-1 border border-emerald-200 text-emerald-700 rounded hover:bg-emerald-50"
                        onClick={() => handleComplete(t)}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-4 rounded-lg border border-slate-200 max-w-sm w-full">
            <p className="text-sm mb-4">Delete this task?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1.5 border border-slate-200 rounded hover:bg-slate-50"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleDelete(confirmDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

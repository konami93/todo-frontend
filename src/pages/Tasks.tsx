import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { taskService } from "../services/api";
import type { Task } from "../types";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskSkeleton from "../components/TaskSkeleton";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETED">("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { user, logout } = useAuth();

  const isFirstLoad = useRef(true);

  const fetchTasks = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setInitialLoading(true);
      } else {
        setFilterLoading(true);
      }
      const status = filter === "ALL" ? undefined : filter;

      const [data] = await Promise.all([
        taskService.getTasks(status),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);

      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      if (isInitialLoad) {
        setInitialLoading(false);
      } else {
        setFilterLoading(false);
      }
    }
  };

  // Carga inicial
  useEffect(() => {
    if (isFirstLoad.current) {
      fetchTasks(true);
      isFirstLoad.current = false;
    }
  }, []);

  // Cuando cambia el filtro (después de la carga inicial)
  useEffect(() => {
    if (!isFirstLoad.current) {
      fetchTasks(false);
    }
  }, [filter]);

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      await taskService.createTask(taskData);
      fetchTasks(false);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (id: string, taskData: Partial<Task>) => {
    try {
      await taskService.updateTask(id, taskData);
      fetchTasks(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskService.deleteTask(id);
      fetchTasks(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus: "PENDING" | "COMPLETED" =
      task.status === "PENDING" ? "COMPLETED" : "PENDING";
    try {
      // Actualizar el estado local inmediatamente para mejor UX
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: newStatus } : t
        );
        // Si hay un filtro activo y la tarea ya no coincide, removerla del listado
        if (filter !== "ALL" && newStatus !== filter) {
          return updatedTasks.filter((t) => t.id !== task.id);
        }
        return updatedTasks;
      });
      // Enviar la actualización al servidor
      await taskService.updateTask(task.id, { status: newStatus });
    } catch (error) {
      // Si hay error, revertir el cambio local
      console.error("Error updating task status:", error);
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: task.status } : t
        )
      );
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Hello, {user?.name || user?.email}
                </span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <div className="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <TaskSkeleton key={index} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">My Tasks</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hello, {user?.name || user?.email}
              </span>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("ALL")}
                className={`px-4 py-2 rounded ${
                  filter === "ALL"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("PENDING")}
                className={`px-4 py-2 rounded ${
                  filter === "PENDING"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("COMPLETED")}
                className={`px-4 py-2 rounded ${
                  filter === "COMPLETED"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Completed
              </button>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + New Task
            </button>
          </div>

          {showForm && (
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
            />
          )}

          {editingTask && (
            <TaskForm
              task={editingTask}
              onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
              onCancel={() => setEditingTask(null)}
            />
          )}

          {filterLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <TaskSkeleton key={index} />
              ))}
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </div>
      </main>
    </div>
  );
}

import type { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: Task) => void;
}

function TaskItem({ task, onEdit, onDelete, onToggleStatus }: TaskItemProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status === "PENDING";

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 border-l-4 ${
        task.status === "COMPLETED"
          ? "border-green-500"
          : isOverdue
          ? "border-red-500"
          : "border-blue-500"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.status === "COMPLETED"}
            onChange={() => onToggleStatus(task)}
            className="mt-1 h-5 w-5 text-blue-600 rounded"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                task.status === "COMPLETED"
                  ? "line-through text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="flex items-center mt-2 space-x-4 text-sm">
              <span
                className={`${
                  isOverdue ? "text-red-600 font-medium" : "text-gray-500"
                }`}
              >
                📅 {formatDate(task.dueDate)}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  task.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;

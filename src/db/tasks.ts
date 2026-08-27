import { db } from "@/db/db"
import { Task } from "@/helpers/types"

// ------------------------- Create Task -------------------------------
function createTask({ userId, taskData }: { userId: string; taskData: Task }) {
  const now = new Date().toISOString()

  return db.tasks.add({
    id: crypto.randomUUID(),
    userId: userId,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    tagIds: [],
    completed: false,
    createdAt: now,
    updatedAt: now,
  })
}

// ------------------------- Fetch Tasks -------------------------------
function getTasksForUser({ userId }: { userId: string }) {
  return db.tasks.where("userId").equals(userId).toArray()
}

// ------------------------- Update Task -------------------------------
function updateTask({ taskId, taskData }: { taskId: string; taskData: Task }) {
  const now = new Date().toISOString()

  return db.tasks.update(taskId, {
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    priority: taskData.priority,
    tagIds: taskData.tagIds,
    updatedAt: now,
  })
}

// ------------------------- Toggle Task Completion -------------------------------
function toggleTaskCompleted({
  id,
  isCompleted,
}: {
  id: string
  isCompleted: boolean
}) {
  return db.tasks.update(id, { completed: isCompleted })
}

// ------------------------- Delete Task -------------------------------
function deleteTask({ id }: { id: string }) {
  return db.tasks.delete(id)
}

export {
  createTask,
  getTasksForUser,
  updateTask,
  toggleTaskCompleted,
  deleteTask,
}

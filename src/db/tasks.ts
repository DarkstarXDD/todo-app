import { db } from "@/db/db"
import { CreateTask, UpdateTask } from "@/helpers/types"

// ------------------------- Create Task -------------------------------
function createTask({
  userId,
  taskData,
}: {
  userId: string
  taskData: CreateTask
}) {
  const now = new Date().toISOString()

  return db.tasks.add({
    id: crypto.randomUUID(),
    userId,
    ...taskData,
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
function updateTask({
  taskId,
  taskData,
}: {
  taskId: string
  taskData: UpdateTask
}) {
  const now = new Date().toISOString()

  return db.tasks.update(taskId, { ...taskData, updatedAt: now })
}

// ------------------------- Toggle Task Completion -------------------------------
function toggleTaskCompleted({
  taskId,
  isCompleted,
}: {
  taskId: string
  isCompleted: boolean
}) {
  const now = new Date().toISOString()

  return db.tasks.update(taskId, { completed: isCompleted, updatedAt: now })
}

// ------------------------- Delete Task -------------------------------
function deleteTask({ taskId }: { taskId: string }) {
  return db.tasks.delete(taskId)
}

export {
  createTask,
  getTasksForUser,
  updateTask,
  toggleTaskCompleted,
  deleteTask,
}

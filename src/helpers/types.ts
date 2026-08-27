export type Priority = "none" | "low" | "medium" | "high"

export type Todo = {
  id: string
  taskTitle: string
  taskDescription?: string
  dueDate?: string
  priority?: Priority
}

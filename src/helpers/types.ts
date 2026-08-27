export const SORT_KEYS = [
  "createdDate",
  "priority",
  "dueDate",
  "title",
] as const
export const PRIORITY_KEYS = ["all", "low", "medium", "high"] as const

export type Priority = "low" | "medium" | "high"

export type Todo = {
  id: string
  taskTitle: string
  taskDescription?: string
  dueDate?: string
  priority?: Priority
}

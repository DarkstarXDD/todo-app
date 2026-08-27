export const SORT_KEYS = [
  "createdDate",
  "priority",
  "dueDate",
  "title",
] as const
export const PRIORITY_KEYS = ["all", "low", "medium", "high"] as const

export type Priority = "low" | "medium" | "high"

// We'll remove later when DB is finalized. Will be replaced by the Task interface below.
export type Todo = {
  id: string
  taskTitle: string
  taskDescription?: string
  dueDate?: string
  priority?: Priority
}

export interface User {
  id: string
  username: string
  passwordHash: string
  salt: string
  createdAt: string // ISO 8601 string
  updatedAt: string
}

// Fields provided when creating a user.
export type CreateUser = Pick<User, "username" | "passwordHash" | "salt">

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  dueDate?: string // ISO 8601 string
  priority?: Priority // omitted when nothing is selected
  tagIds: string[] // [] when none
  completed: boolean
  createdAt: string
  updatedAt: string
}

// Fields the user provides when creating a task.
export type CreateTask = Pick<
  Task,
  "title" | "description" | "dueDate" | "priority"
>

// Fields that can change on an existing task (all optional).
export type UpdateTask = Partial<
  Pick<Task, "title" | "description" | "dueDate" | "priority" | "tagIds">
>

export interface Tag {
  id: string
  userId: string
  name: string
  createdAt: string
}

// Fields the user provides when creating a tag.
export type CreateTag = Pick<Tag, "name">

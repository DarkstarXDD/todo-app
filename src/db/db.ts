import { Dexie, type EntityTable } from "dexie"

import type { User, Task, Tag } from "@/helpers/types"

export const db = new Dexie("TasksDB") as Dexie & {
  users: EntityTable<User, "id">
  tasks: EntityTable<Task, "id">
  tags: EntityTable<Tag, "id">
}

db.version(1).stores({
  users: "id, &username",
  tasks: "id, userId, *tagIds",
  tags: "id, userId, &[userId+name]",
})

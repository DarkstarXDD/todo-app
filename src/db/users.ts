import { db } from "@/db/db"
import { CreateUser } from "@/helpers/types"

// ------------------------- Create User -------------------------------
function createUser({ userData }: { userData: CreateUser }) {
  const now = new Date().toISOString()

  return db.users.add({
    id: crypto.randomUUID(),
    ...userData,
    createdAt: now,
    updatedAt: now,
  })
}

// ------------------------- Get User By Username -------------------------------
// Used for login and to check whether a username is already taken.
// Returns the user, or undefined if no match.
function getUserByUsername({ username }: { username: string }) {
  return db.users.where("username").equals(username).first()
}

// ------------------------- Get User By Id -------------------------------
function getUserById({ userId }: { userId: string }) {
  return db.users.get(userId)
}

export { createUser, getUserByUsername, getUserById }

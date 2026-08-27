import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

import type { User } from "@/helpers/types"

import { createUser, getUserById, getUserByUsername } from "@/db/users"
import { hashPassword, verifyPassword } from "@/lib/auth"

const CURRENT_USER_KEY = "currentUserId"

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  signUp: (username: string, password: string) => Promise<void>
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  // Only "loading" when there's actually a stored session to restore.
  const [isLoading, setIsLoading] = useState(
    () => localStorage.getItem(CURRENT_USER_KEY) !== null
  )

  // Restore the session from localStorage on first load.
  useEffect(() => {
    const storedId = localStorage.getItem(CURRENT_USER_KEY)
    if (!storedId) return // isLoading already false from the initializer

    getUserById({ userId: storedId })
      .then((found) => {
        if (found) setUser(found)
        else localStorage.removeItem(CURRENT_USER_KEY) // stale id
      })
      .finally(() => setIsLoading(false))
  }, [])

  async function signUp(username: string, password: string) {
    const trimmed = username.trim()

    const existing = await getUserByUsername({ username: trimmed })
    if (existing) throw new Error("That username is already taken.")

    const passwordHash = await hashPassword(password)
    const id = await createUser({
      userData: { username: trimmed, passwordHash },
    })

    const created = await getUserById({ userId: id })
    if (!created) throw new Error("Could not create your account.")

    localStorage.setItem(CURRENT_USER_KEY, created.id)
    setUser(created)
  }

  async function signIn(username: string, password: string) {
    const found = await getUserByUsername({ username: username.trim() })
    if (!found || !(await verifyPassword(password, found.passwordHash))) {
      throw new Error("Invalid username or password.")
    }

    localStorage.setItem(CURRENT_USER_KEY, found.id)
    setUser(found)
  }

  function signOut() {
    localStorage.removeItem(CURRENT_USER_KEY)
    setUser(null)
  }

  return (
    <AuthContext value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

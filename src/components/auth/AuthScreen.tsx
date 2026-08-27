import { useState, type SubmitEvent } from "react"

import { Button } from "@/components/base/Button"
import { TextField } from "@/components/base/TextField"
import { useAuth } from "@/context/AuthContext"

function AuthScreen() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isSignUp = mode === "signup"

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const username = String(formData.get("username") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try {
      if (isSignUp) await signUp(username, password)
      else await signIn(username, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-dvh place-items-center p-4">
      <div className="border-secondary w-full max-w-sm rounded-2xl border p-6 shadow-xs">
        <h1 className="text-primary text-xl font-semibold">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h1>
        <p className="text-tertiary mt-1 text-sm">
          {isSignUp
            ? "Sign up to start managing your tasks."
            : "Sign in to your tasks."}
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            placeholder="john"
            isRequired
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            isRequired
          />

          {error && <p className="text-error text-sm font-medium">{error}</p>}

          <Button
            variant="brand"
            type="submit"
            isDisabled={isSubmitting}
            className="mt-2"
          >
            {isSubmitting
              ? "Please wait…"
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </Button>
        </form>

        <p className="text-tertiary mt-4 text-center text-sm">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            className="text-brand font-medium"
            onClick={() => {
              setMode(isSignUp ? "signin" : "signup")
              setError(null)
            }}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthScreen

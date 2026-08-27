import { useLiveQuery } from "dexie-react-hooks"
import { Plus, CalendarCheck, LogOut } from "lucide-react"

import AuthScreen from "@/components/auth/AuthScreen"
import { Button } from "@/components/base/Button"
import {
  Dialog,
  DialogDescription,
  DialogIcon,
  DialogTitle,
  Modal,
  ModalTrigger,
} from "@/components/base/Modal"
import TodoForm from "@/components/todos/TaskForm"
import TodoItem from "@/components/todos/TaskItem"
import ToolBar from "@/components/todos/ToolBar"
import { useAuth } from "@/context/AuthContext"
import { getTasksForUser } from "@/db/tasks"
import { applyTaskFilters } from "@/helpers/tasks"
import { useTaskFilters } from "@/hooks/useTaskFilters"

export default function App() {
  const { user, isLoading, signOut } = useAuth()

  const tasks =
    useLiveQuery(
      () => (user ? getTasksForUser({ userId: user.id }) : []),
      [user?.id]
    ) ?? []

  const { search, sort, priority, hideCompleted } = useTaskFilters()

  const visibleTasks = applyTaskFilters(tasks, {
    search,
    sort,
    priority,
    hideCompleted,
  })
  const remainingTaskCount = tasks.filter((task) => !task.completed).length

  if (isLoading) {
    return (
      <div className="text-tertiary grid min-h-dvh place-items-center text-sm">
        Loading…
      </div>
    )
  }

  if (!user) return <AuthScreen />

  return (
    <div>
      <header className="mx-auto flex max-w-2xl items-center justify-between py-4">
        <span className="text-tertiary text-sm">
          Signed in as{" "}
          <span className="text-secondary font-medium">{user.username}</span>
        </span>
        <Button variant="ghost" onPress={signOut}>
          <LogOut />
          Sign out
        </Button>
      </header>

      <main className="mx-auto grid max-w-2xl gap-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-primary text-2xl font-semibold">My Tasks</h1>
            <p className="flex gap-1 text-sm font-medium">
              {remainingTaskCount > 0 ? (
                <>
                  <span className="tabular-nums"> {remainingTaskCount}</span>
                  remaining
                </>
              ) : (
                <>All done! No remaning tasks.</>
              )}
            </p>
          </div>

          <ModalTrigger>
            <Button variant="brand">
              <Plus />
              New Todo
            </Button>
            <Modal className="max-w-120">
              <Dialog>
                {({ close }) => (
                  <>
                    <DialogIcon>
                      <CalendarCheck />
                    </DialogIcon>
                    <DialogTitle>New todo</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a task.
                    </DialogDescription>
                    <TodoForm userId={user.id} onClose={close} />
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalTrigger>
        </div>

        <ToolBar />

        <div className="grid gap-2">
          {visibleTasks.length > 0 ? (
            visibleTasks.map((task) => <TodoItem key={task.id} task={task} />)
          ) : (
            <p className="text-tertiary py-8 text-center text-sm">
              No tasks to show.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

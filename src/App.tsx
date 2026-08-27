import { useLiveQuery } from "dexie-react-hooks"
import { Plus, CalendarCheck } from "lucide-react"

import { Button } from "@/components/base/Button"
import {
  Dialog,
  DialogDescription,
  DialogIcon,
  DialogTitle,
  Modal,
  ModalTrigger,
} from "@/components/base/Modal"
import TodoForm from "@/components/Tasks/TodoForm"
import TodoItem from "@/components/Tasks/TodoItem"
import ToolBar from "@/components/Tasks/ToolBar"
import { getTasksForUser } from "@/db/tasks"
import { applyTaskFilters } from "@/helpers/tasks"
import { useTaskFilters } from "@/hooks/useTaskFilters"
import { DEV_USER_ID } from "@/lib/currentUser"

export default function App() {
  const tasks = useLiveQuery(() => getTasksForUser({ userId: DEV_USER_ID })) ?? []
  const { search, sort, priority } = useTaskFilters()

  const visibleTasks = applyTaskFilters(tasks, { search, sort, priority })
  const remainingTaskCount = tasks.filter((task) => !task.completed).length

  return (
    <div>
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
                    <TodoForm userId={DEV_USER_ID} onClose={close} />
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

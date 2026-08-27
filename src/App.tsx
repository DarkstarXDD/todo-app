import { Search, Plus, CalendarCheck } from "lucide-react"

import { Button } from "@/components/base/Button"
import {
  Dialog,
  DialogDescription,
  DialogIcon,
  DialogTitle,
  Modal,
  ModalTrigger,
} from "@/components/base/Modal"
import { SearchField } from "@/components/base/SearchField"
import { Select, SelectItem } from "@/components/base/Select"
import { ToggleButton, ToggleButtonGroup } from "@/components/base/ToggleButton"
import TodoForm from "@/components/Tasks/TodoForm"
import TodoItem from "@/components/Tasks/TodoItem"
import { initialTodos } from "@/helpers/data"

function handleAddTodo() {
  console.log("Todo Handled!")
}

export default function App() {
  const remainingTaskCount = 4

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
                    <TodoForm onAddTodo={handleAddTodo} onClose={close} />
                  </>
                )}
              </Dialog>
            </Modal>
          </ModalTrigger>
        </div>

        <div className="@container flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="grid gap-4 @md:grid-cols-2 @md:items-start">
            <SearchField
              label="Search Tasks"
              placeholder="Buy groceries"
              leadingIcon={<Search />}
              className="max-w-xs"
            />

            <Select
              label="Sort"
              defaultValue="createdDate"
              className="max-w-xs"
            >
              <SelectItem id="createdDate">Created Date</SelectItem>
              <SelectItem id="priority">Priority</SelectItem>
              <SelectItem id="dueDate">Due date</SelectItem>
              <SelectItem id="title">Title</SelectItem>
            </Select>
          </div>

          <ToggleButtonGroup
            defaultSelectedKeys={["all"]}
            disallowEmptySelection
          >
            <ToggleButton id="all">All</ToggleButton>
            <ToggleButton id="low">Low</ToggleButton>
            <ToggleButton id="medium">Medium</ToggleButton>
            <ToggleButton id="high">High</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="grid gap-2">
          {initialTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              taskTitle={todo.taskTitle}
              taskDescription={todo.taskDescription}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

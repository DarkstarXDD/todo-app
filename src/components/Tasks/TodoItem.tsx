import { EllipsisVertical, Trash, Pencil } from "lucide-react"
import { useState } from "react"

import type { Task } from "@/helpers/types"

import { Button } from "@/components/base/Button"
import { Checkbox } from "@/components/base/Checkbox"
import { MenuTrigger, Menu, MenuItem } from "@/components/base/Menu"
import {
  Modal,
  Dialog,
  DialogTitle,
  DialogDescription,
} from "@/components/base/Modal"
import TodoForm from "@/components/Tasks/TodoForm"
import { toggleTaskCompleted, deleteTask } from "@/db/tasks"

export default function TodoItem({ task }: { task: Task }) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  return (
    <div className="border-secondary rounded-lg border p-4 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <Checkbox
          description={task.description}
          isSelected={task.completed}
          onChange={(isCompleted) =>
            toggleTaskCompleted({ taskId: task.id, isCompleted })
          }
        >
          {({ isSelected }) =>
            isSelected ? (
              <span className="line-through">{task.title}</span>
            ) : (
              <>{task.title}</>
            )
          }
        </Checkbox>

        <MenuTrigger>
          <Button aria-label="edit" variant="ghost">
            <EllipsisVertical className="size-4" />
          </Button>

          <Menu className="min-w-30">
            <MenuItem onAction={() => setIsEditOpen(true)}>
              <Pencil />
              Edit
            </MenuItem>
            <MenuItem
              className="text-error"
              onAction={() => deleteTask({ taskId: task.id })}
            >
              <Trash className="text-error" />
              Delete
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </div>

      <Modal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        className="max-w-120"
      >
        <Dialog>
          {({ close }) => (
            <>
              <DialogTitle>Edit todo</DialogTitle>
              <DialogDescription>Update the task details.</DialogDescription>
              <TodoForm userId={task.userId} task={task} onClose={close} />
            </>
          )}
        </Dialog>
      </Modal>
    </div>
  )
}

import React from "react"

import type { Task, Priority } from "@/helpers/types"

import { Button } from "@/components/base/Button"
import { RadioGroup, Radio } from "@/components/base/RadioGroup"
import { TextAreaField } from "@/components/base/TextArea"
import { TextField } from "@/components/base/TextField"
import { createTask, updateTask } from "@/db/tasks"

interface TodoFormProps {
  userId: string
  /** When present, the form edits this task instead of creating one */
  task?: Task
  onClose?: () => void
}

function TodoForm({ userId, task, onClose }: TodoFormProps) {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = String(formData.get("title") ?? "").trim()
    const description = String(formData.get("description") ?? "").trim()
    const priority = formData.get("priority") as Priority | null

    const taskData = {
      title,
      description: description || undefined,
      priority: priority || undefined,
    }

    if (task) {
      await updateTask({ taskId: task.id, taskData })
    } else {
      await createTask({ userId, taskData })
    }

    onClose?.()
  }

  return (
    <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        placeholder="Book dentist appointment"
        defaultValue={task?.title}
        isRequired
      />
      <TextAreaField
        name="description"
        label="Description (Optional)"
        placeholder="Call Dr. John's office to schedule. Ask if Thursday afternoons are open."
        defaultValue={task?.description}
      />

      <RadioGroup
        name="priority"
        label="Priority"
        orientation="horizontal"
        defaultValue={task?.priority}
      >
        <Radio value="low">Low</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="high">High</Radio>
      </RadioGroup>

      <div className="mt-8 flex gap-2 justify-self-end">
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="brand" type="submit">
          {task ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  )
}

export default TodoForm

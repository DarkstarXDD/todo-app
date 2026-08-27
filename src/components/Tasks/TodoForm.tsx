import React from "react"

import type { Todo } from "@/helpers/types"

// import { todoSchema } from "@/app/examples/todo/helpers/schemas"
import { Button } from "@/components/base/Button"
// import { DatePicker } from "@/components/base/DatePicker"
import { RadioGroup, Radio } from "@/components/base/RadioGroup"
import { TextAreaField } from "@/components/base/TextArea"
import { TextField } from "@/components/base/TextField"

interface TodoFormProps {
  onAddTodo?: (todo: Todo) => void
  onClose?: () => void
}

function TodoForm({ onClose }: TodoFormProps) {
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log(data)
    // const parsed = todoSchema.safeParse(data)

    // if (parsed.success) {
    //   console.log(parsed.data)
    // } else {
    //   console.log(parsed.error)
    // }
    onClose?.()
  }

  return (
    <form
      className="mt-5 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)
      }}
    >
      <TextField
        name="title"
        label="Title"
        placeholder="Book dentist appointment"
        isRequired
      />
      <TextAreaField
        name="description"
        label="Description (Optional)"
        placeholder="Call Dr. John's office to schedule. Ask if Thursday afternoons are open."
      />

      {/* <DatePicker name="dueDate" label="Due date" className="max-w-xs" /> */}

      <RadioGroup name="priority" label="Priority" orientation="horizontal">
        <Radio value="low">Low</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="high">High</Radio>
      </RadioGroup>

      <div className="mt-8 flex gap-2 justify-self-end">
        <Button variant="ghost" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="brand" type="submit">
          Create Task
        </Button>
      </div>
    </form>
  )
}

export default TodoForm

"use client"

import { EllipsisVertical, Trash, Pencil } from "lucide-react"

import { Button } from "@/components/base/Button"
import { Checkbox } from "@/components/base/Checkbox"
import { MenuTrigger, Menu, MenuItem } from "@/components/base/Menu"

export default function TodoItem(props: {
  taskTitle: string
  taskDescription?: string
}) {
  return (
    <div className="ring-secondary rounded-lg p-4 ring">
      <div className="flex items-start justify-between gap-4">
        <Checkbox description={props.taskDescription}>
          {({ isSelected }) =>
            isSelected ? (
              <span className="line-through">{props.taskTitle}</span>
            ) : (
              <>{props.taskTitle}</>
            )
          }
        </Checkbox>

        <MenuTrigger>
          <Button aria-label="edit" variant="ghost">
            <EllipsisVertical className="size-4" />
          </Button>

          <Menu className="min-w-30">
            <MenuItem>
              <Pencil />
              Edit
            </MenuItem>
            <MenuItem className="text-error">
              <Trash className="text-error" />
              Delete
            </MenuItem>
          </Menu>
        </MenuTrigger>
      </div>
    </div>
  )
}

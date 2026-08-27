import { tv } from "tailwind-variants"

import type { Priority } from "@/helpers/types"

const priorityChipStyles = tv({
  base: "inline-flex w-min items-center rounded-md border px-2 text-xs font-medium capitalize",
  variants: {
    priority: {
      low: "border-priority-low/30 bg-priority-low/5 text-priority-low",
      medium:
        "border-priority-medium/30 bg-priority-medium/5 text-priority-medium",
      high: "border-priority-high/30 text-priority-high",
    },
  },
})

function PriorityChip({
  priority,
  className,
}: {
  priority: Priority
  className?: string
}) {
  return (
    <span className={priorityChipStyles({ priority, className })}>
      {priority}
    </span>
  )
}

export { PriorityChip }

import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ToggleButton as AriaToggleButton,
  type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components/ToggleButton"
import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
} from "react-aria-components/ToggleButtonGroup"
import { tv } from "tailwind-variants"

import { buttonStyles } from "@/components/base/Button"
import { cn } from "@/lib/utils"

// ------------------------- Toggle Button Group ----------------------------
function ToggleButtonGroup(props: AriaToggleButtonGroupProps) {
  return (
    <AriaToggleButtonGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group flex w-min", "orientation-vertical:flex-col", className)
      )}
    />
  )
}

// ---------------------------- Toggle Button -------------------------------
const toggleButtonStyles = tv({
  extend: buttonStyles,
  base: [
    "selected:bg-brand selected:text-white selected:border-primary/30",
    "focus-visible:z-10",
    "group-orientation-horizontal:not-first:rounded-l-none group-orientation-horizontal:not-first:border-l-none group-orientation-horizontal:not-last:rounded-r-none group-orientation-horizontal:not-last:border-r-none",
  ],
})

function ToggleButton(props: AriaToggleButtonProps) {
  return (
    <AriaToggleButton
      {...props}
      className={composeRenderProps(props.className, (className) =>
        toggleButtonStyles({ className })
      )}
    />
  )
}

export { ToggleButtonGroup, ToggleButton }

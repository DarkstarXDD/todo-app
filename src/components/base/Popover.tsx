import { createContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Popover as AriaPopover,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components/Popover"

import { cn } from "@/lib/utils"

/** Returns true if the current element is nested within a Popover. */
const WithinPopoverContext = createContext(false)

// ------------------------- Popover -------------------------------
interface PopoverProps extends AriaPopoverProps {
  isMatchingTriggerWidth?: boolean
  /** How the popover animates in: `slide` from the placement side, or `scale` from the trigger anchor
  point. */
  animationStyle?: "slide" | "scale"
  // hasOverlayArrow?: boolean
}

function Popover({
  isMatchingTriggerWidth = false,
  animationStyle = "scale",
  ...props
}: PopoverProps) {
  return (
    <WithinPopoverContext value={true}>
      <AriaPopover
        {...props}
        className={composeRenderProps(props.className, (className, rp) =>
          cn(
            "border-secondary bg-primary overflow-auto rounded-lg border px-1 py-1.5 shadow-sm outline-none",

            "transition duration-200 ease-out will-change-transform",

            isMatchingTriggerWidth && "w-(--trigger-width)",

            // If "slide" (Select, ComboBox etc.), slide out from main 4 directions only. No sclaing.
            animationStyle === "slide" &&
              "placement-top:origin-bottom placement-bottom:origin-top placement-left:origin-right placement-right:origin-left",

            // If "scale" (Icon only Popover, Menu etc.), animate from exact origin points with scaling.
            animationStyle === "scale" && "origin-(--trigger-anchor-point)",

            (rp.isEntering || rp.isExiting) &&
              "placement-top:translate-y-1 placement-bottom:-translate-y-3 placement-left:translate-x-1 placement-right:-translate-x-1 opacity-40",

            rp.isExiting && "duration-100 ease-in",

            // If "scale" (Icon only Popover, Menu etc.), scales as well.
            animationStyle === "scale" &&
              (rp.isEntering || rp.isExiting) &&
              "scale-50",

            className
          )
        )}
      >
        {composeRenderProps(props.children, (resolved) => (
          <>{resolved}</>
        ))}
      </AriaPopover>
    </WithinPopoverContext>
  )
}

export { Popover, type PopoverProps, WithinPopoverContext }
export { DialogTrigger as PopoverTrigger } from "react-aria-components/Popover"

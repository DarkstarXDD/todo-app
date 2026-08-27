"use client"

import { ChevronRight, ChevronLeft } from "lucide-react"
import { useContext, type ComponentProps } from "react"
import { composeRenderProps } from "react-aria-components"
import {
  Calendar as AriaCalendar,
  CalendarGrid as AriaCalendarGrid,
  CalendarGridHeader as AriaCalendarGridHeader,
  CalendarGridBody as AriaCalendarGridBody,
  CalendarHeading as AriaCalendarHeading,
  CalendarHeaderCell as AriaCalendarHeaderCell,
  CalendarCell as AriaCalendarCell,
  type CalendarProps as AriaCalendarProps,
  type CalendarHeadingProps as AriaCalendarHeadingProps,
  type CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
  type CalendarCellProps as AriaCalendarCellProps,
  type DateValue as AriaDateValue,
} from "react-aria-components/Calendar"

import { Button, type ButtonProps } from "@/components/base/Button"
import { WithinPopoverContext } from "@/components/base/Popover"
import { cn } from "@/lib/utils"

// ------------------------- Calendar -------------------------------
function Calendar<T extends AriaDateValue>(props: AriaCalendarProps<T>) {
  const isWithinPopover = useContext(WithinPopoverContext)

  return (
    <AriaCalendar
      {...props}
      // Keep the below styles in sync with RangeCalendar.
      className={composeRenderProps(props.className, (className) =>
        cn(
          "group flex h-90 w-min max-w-2xl flex-col gap-3 overflow-x-auto px-4 py-3.5",
          !isWithinPopover &&
            "border-secondary rounded-2xl border p-5 shadow-sm",
          className
        )
      )}
    >
      <CalendarHeader>
        <Previous />
        <CalendarHeading />
        <Next />
      </CalendarHeader>

      <AriaCalendarGrid>
        <AriaCalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </AriaCalendarGridHeader>
        <AriaCalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </AriaCalendarGridBody>
      </AriaCalendarGrid>
    </AriaCalendar>
  )
}

// ------------------------- Calendar Header -------------------------------
type CalendarHeaderProps = ComponentProps<"header">

function CalendarHeader(props: CalendarHeaderProps) {
  return (
    <header
      {...props}
      className={cn("flex items-center justify-between gap-2", props.className)}
    />
  )
}

// ------------------------- Previous -------------------------------
// Remove the padding overrides once the global Button styles are migrated to new paddings.
function Previous(props: ButtonProps) {
  return (
    <Button
      slot="previous"
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("px-3 py-1.5", className)
      )}
    >
      <ChevronLeft />
    </Button>
  )
}

// ------------------------- Next -------------------------------
// Remove the padding overrides once the global Button styles are migrated to new paddings.
function Next(props: ButtonProps) {
  return (
    <Button
      slot="next"
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("px-3 py-1.5", className)
      )}
    >
      <ChevronRight />
    </Button>
  )
}

// ------------------------- Calendar Heading -------------------------------
function CalendarHeading(props: AriaCalendarHeadingProps) {
  return (
    <AriaCalendarHeading
      {...props}
      className={cn(
        "text-secondary flex-1 text-center text-sm font-semibold",
        "group-disabled:text-disabled",
        "py-1.5",
        props.className
      )}
    />
  )
}

// ------------------------- Calendar Header Cell -------------------------------
function CalendarHeaderCell(props: AriaCalendarHeaderCellProps) {
  return (
    <AriaCalendarHeaderCell
      {...props}
      className={cn(
        "text-secondary text-sm font-medium",
        "size-9",
        "group-disabled:text-disabled"
      )}
    />
  )
}

// ------------------------- Calendar Cell -------------------------------
function CalendarCell(props: AriaCalendarCellProps) {
  return (
    <AriaCalendarCell
      {...props}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          "text-secondary text-sm font-normal",
          "relative m-0.5 flex items-center justify-center",
          "size-9 rounded-full",
          "outline-brand outline-2 outline-offset-4 outline-none",

          rp.isFocusVisible && "z-2 outline-solid",

          rp.isToday &&
            "after:bg-brand after:absolute after:bottom-0.5 after:size-2 after:rounded-full",
          rp.isToday && rp.isSelected && "after:bg-white",

          (rp.isFocused || rp.isFocusVisible || rp.isHovered || rp.isPressed) &&
            "bg-focused",

          rp.isSelected && "bg-brand text-white",

          (rp.isDisabled || rp.isOutsideMonth) && "text-disabled",
          className
        )
      )}
    >
      {composeRenderProps(props.children, (resolved, rp) => (
        <>{resolved || rp.defaultChildren}</>
      ))}
    </AriaCalendarCell>
  )
}

export { Calendar, type AriaCalendarProps as CalendarProps }

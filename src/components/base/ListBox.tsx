import { Check } from "lucide-react"
import { useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxProps as AriaListBoxProps,
  type ListBoxItemProps as AriaListBoxItemProps,
} from "react-aria-components/ListBox"

import { WithinPopoverContext } from "@/components/base/Popover"
import { cn } from "@/lib/utils"

// ---------------------------- ListBox ----------------------------
function ListBox<T>({ ...props }: AriaListBoxProps<T>) {
  const isWithinPopover = useContext(WithinPopoverContext)

  return (
    <AriaListBox
      {...props}
      renderEmptyState={
        props.renderEmptyState ??
        (() => (
          <p className="text-tertiary p-8 text-center text-sm">
            No results found.
          </p>
        ))
      }
      className={composeRenderProps(props.className, (className) =>
        cn(
          "flex flex-col gap-0.5 empty:content-center",
          "outline-none",

          // These styles should be in sync with the first line of Popover styles in Popover.tsx
          !isWithinPopover &&
            "border-secondary bg-primary overflow-auto rounded-lg border px-1 py-1.5 shadow-sm outline-none",
          className
        )
      )}
    />
  )
}

// ----------------------------- ListBox Item -----------------------------
function ListBoxItem({ textValue, children, ...props }: AriaListBoxItemProps) {
  const textValueConstructed =
    textValue || (typeof children === "string" ? children : undefined)

  return (
    <AriaListBoxItem
      {...props}
      textValue={textValueConstructed}
      className={composeRenderProps(props.className, (className, rp) =>
        // `position: relative` because the SelectionIndicator gets absolutely positioned.
        cn(
          "group text-primary relative text-sm font-normal",
          "grid grid-cols-[auto_1fr]",
          "rounded-lg px-2 py-1.5",
          "cursor-pointer",
          "outline-none",
          "[&_svg:not([class*='text-'])]:text-tertiary",
          rp.isDisabled &&
            "text-disabled [&_svg:not([class*='text-'])]:text-disabled cursor-not-allowed",
          (rp.isFocusVisible || rp.isHovered || rp.isPressed) && "bg-focused",
          // rp.isSelected && "font-semibold",
          className
        )
      )}
    >
      {composeRenderProps(children, (resolvedChildren, rp) => (
        <>
          {resolvedChildren}
          {rp.selectionMode !== "none" && (
            <span className="absolute inset-y-0 inset-e-2 my-auto flex size-5 items-center justify-center">
              {rp.isSelected && <Check className="text-brand" />}
            </span>
          )}
        </>
      ))}
    </AriaListBoxItem>
  )
}

export {
  ListBox,
  ListBoxItem,
  type AriaListBoxProps as ListBoxProps,
  type AriaListBoxItemProps as ListBoxItemProps,
}

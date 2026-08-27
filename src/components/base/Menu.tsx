"use client"

import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuProps as AriaMenuProps,
  type MenuItemProps as AriaMenuItemProps,
} from "react-aria-components/Menu"

import { cn } from "@/lib/utils"

// --------------------------- Menu ------------------------------

function Menu<T>(props: AriaMenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("grid gap-0.5 outline-none", className)
      )}
    />
  )
}

// ---------------------------- Menu Item ------------------------------
function MenuItem({ textValue, children, ...props }: AriaMenuItemProps) {
  const textValueConstructed =
    textValue || (typeof children === "string" ? children : undefined)

  return (
    <AriaMenuItem
      {...props}
      textValue={textValueConstructed}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          "group text-primary relative text-sm font-normal",
          "grid grid-cols-[auto_1fr]",
          "rounded-lg px-2 py-1.5",
          "cursor-pointer",
          "outline-none",
          "[&_svg:not([class*='text-'])]:text-secondary",
          rp.isDisabled &&
            "text-disabled [&_svg:not([class*='text-'])]:text-fg-disabled cursor-not-allowed",
          (rp.isFocusVisible || rp.isHovered || rp.isPressed) && "bg-focused",
          className
        )
      )}
    />
  )
}

export { Menu, MenuItem, type AriaMenuProps as MenuProps }
export { MenuTrigger, SubmenuTrigger } from "react-aria-components/Menu"
export { Popover, type PopoverProps } from "@/components/base/Popover"

import { composeRenderProps } from "react-aria-components"
import {
  MenuTrigger,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuProps as AriaMenuProps,
  type MenuItemProps as AriaMenuItemProps,
} from "react-aria-components/Menu"

import { Popover } from "@/components/base/Popover"
import { cn } from "@/lib/utils"

// ---------------------------- Menu ------------------------------
function Menu<T>(props: AriaMenuProps<T>) {
  return (
    <Popover>
      <AriaMenu
        {...props}
        className={composeRenderProps(props.className, (className) =>
          cn("grid gap-0.5 outline-none", className)
        )}
      />
    </Popover>
  )
}

// ---------------------------- Menu Item ------------------------------
function MenuItem({ textValue, ...props }: AriaMenuItemProps) {
  const textValueConstructed =
    textValue ||
    (typeof props.children === "string" ? props.children : undefined)

  return (
    <AriaMenuItem
      {...props}
      textValue={textValueConstructed}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          "group text-primary relative text-sm font-normal",
          "grid grid-cols-[auto_1fr] gap-2",
          "rounded-lg px-2 py-1.5",
          "cursor-pointer",
          "outline-none",
          "[&_svg:not([class*='text-'])]:text-tertiary",
          rp.isDisabled &&
            "text-disabled [&_svg:not([class*='text-'])]:text-fg-disabled cursor-not-allowed",
          (rp.isFocusVisible || rp.isHovered || rp.isPressed) && "bg-focused",
          className
        )
      )}
    />
  )
}

export { MenuTrigger, Menu, MenuItem }

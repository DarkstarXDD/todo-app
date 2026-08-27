import { ChevronDown } from "lucide-react"
import { type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components"
import {
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  type SelectValueProps as AriaSelectValueProps,
} from "react-aria-components/Select"

import { Button, ButtonProps } from "@/components/base/Button"
import {
  FieldLabel,
  FieldDescription,
  FieldError,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import {
  ListBoxItem,
  ListBox,
  type ListBoxProps,
} from "@/components/base/ListBox"
import { Popover } from "@/components/base/Popover"
import { cn } from "@/lib/utils"

// ------------------------- Select ----------------------------
interface SelectProps<T, M extends "single" | "multiple" = "single">
  extends
    Pick<
      ListBoxProps<T>,
      "items" | "children" | "dependencies" | "renderEmptyState"
    >,
    Omit<AriaSelectProps<T, M>, "children"> {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ErrorMessage
}

function Select<T, M extends "single" | "multiple" = "single">({
  children,
  label,
  description,
  errorMessage,
  items,
  dependencies,
  renderEmptyState,
  ...props
}: SelectProps<T, M>) {
  return (
    <AriaSelect
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group grid w-full gap-2 disabled:cursor-not-allowed", className)
      )}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <SelectTrigger>
        <SelectValue />
        <ChevronDown className="group-open:rotate-180" />
      </SelectTrigger>
      <Popover isMatchingTriggerWidth animationStyle="slide">
        <ListBox
          items={items}
          dependencies={dependencies}
          renderEmptyState={renderEmptyState}
        >
          {children}
        </ListBox>
      </Popover>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSelect>
  )
}

// ------------------------- Select Trigger ----------------------------
function SelectTrigger(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant={props.variant ?? "primary"}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "w-full justify-between overflow-hidden outline outline-offset-0",
          // Some focus styles are handled inside the Button component styles.
          "focus-visible:outline-brand focus-visible:border-brand",
          "group-invalid:border-error group-invalid:focus-visible:border-error group-invalid:outline-error",
          className
        )
      )}
    />
  )
}

// ------------------------- Select Value ----------------------------
function SelectValue<T>(props: AriaSelectValueProps<T>) {
  return (
    <AriaSelectValue
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "text-primary truncate font-medium",
          "group-disabled:text-disabled",
          "placeholder-shown:text-placeholder placeholder-shown:font-normal placeholder-shown:group-disabled:text-transparent",
          className
        )
      )}
    >
      {props.children ??
        (({ defaultChildren, isPlaceholder, selectedText }) =>
          isPlaceholder ? defaultChildren : selectedText)}
    </AriaSelectValue>
  )
}

export { Select, ListBoxItem as SelectItem }

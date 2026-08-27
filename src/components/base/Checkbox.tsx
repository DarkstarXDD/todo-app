import { Check } from "lucide-react"
import { type ReactNode } from "react"
import {
  CheckboxField as AiraCheckboxField,
  CheckboxButton as AriaCheckboxButton,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
  type CheckboxButtonProps as AriaCheckboxButtonProps,
  composeRenderProps,
} from "react-aria-components"

import {
  FieldDescription,
  FieldError,
  FieldIndentContext,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import { cn } from "@/lib/utils"

interface CheckboxProps
  extends
    Pick<AriaCheckboxButtonProps, "children">,
    Omit<AriaCheckboxFieldProps, "children"> {
  description?: ReactNode
  errorMessage?: ErrorMessage
  /** Hides the field description when the field is invalid. */
  isDescriptionHiddenOnInvalid?: boolean
}

function Checkbox({
  children,
  description,
  errorMessage,
  isDescriptionHiddenOnInvalid,
  ...props
}: CheckboxProps) {
  return (
    <FieldIndentContext value="ms-6.5">
      <AiraCheckboxField
        {...props}
        className={composeRenderProps(props.className, (className) =>
          cn("group", className)
        )}
      >
        <CheckboxButton>{children}</CheckboxButton>
        {description && (
          <FieldDescription isHiddenOnInvalid={isDescriptionHiddenOnInvalid}>
            {description}
          </FieldDescription>
        )}
        <FieldError>{errorMessage}</FieldError>
      </AiraCheckboxField>
    </FieldIndentContext>
  )
}

// ------------------------- Checkbox Button -------------------------------
function CheckboxButton(props: AriaCheckboxButtonProps) {
  return (
    <AriaCheckboxButton
      {...props}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          "text-secondary relative cursor-pointer text-sm font-medium",
          "group flex items-center gap-2",
          rp.isDisabled && "text-disabled cursor-not-allowed",
          className
        )
      )}
    >
      {composeRenderProps(props.children, (children, rp) => (
        <>
          {/* Checkbox selection indicator. */}
          <span
            className={cn(
              "relative flex size-4.5 shrink-0 items-center justify-center rounded-sm text-white",
              "outline-brand border-primary/30 border-2 outline-2 outline-offset-4 outline-none group-focus-visible:outline-solid",

              !rp.isDisabled &&
                !rp.isSelected &&
                !rp.isIndeterminate &&
                "bg-primary border-primary",

              !rp.isDisabled &&
                (rp.isSelected || rp.isIndeterminate) &&
                "bg-brand",

              !rp.isDisabled && rp.isInvalid && "outline-error",

              !rp.isDisabled &&
                (rp.isSelected || rp.isIndeterminate) &&
                rp.isInvalid &&
                "bg-error",

              rp.isDisabled && "bg-disabled text-disabled border-disabled"
            )}
          >
            {rp.isSelected && !rp.isIndeterminate && (
              <Check className="size-3.5 stroke-3" />
            )}
          </span>

          {/* Children will be the label of the CheckboxField. */}
          {children}
        </>
      ))}
    </AriaCheckboxButton>
  )
}

export { Checkbox, type CheckboxProps }

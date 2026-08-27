import { type ReactNode } from "react"
import {
  RadioGroup as AriaRadioGroup,
  RadioField as AriaRadioField,
  RadioButton as AriaRadioButton,
  type RadioGroupProps as AriaRadioGroupProps,
  type RadioFieldProps as AriaRadioFieldProps,
  type RadioButtonProps as AriaRadioButtonProps,
} from "react-aria-components"
import { composeRenderProps } from "react-aria-components/composeRenderProps"

import {
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldIndentContext,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import { cn } from "@/lib/utils"

// ------------------------- Radio Group -------------------------------
interface RadioGroupProps extends AriaRadioGroupProps {
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ErrorMessage
  /** Hides the field description when the field is invalid. */
  isDescriptionHiddenOnInvalid?: boolean
}

function RadioGroup({
  children,
  label,
  description,
  errorMessage,
  isDescriptionHiddenOnInvalid = true,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group disabled:cursor-not-allowed", className)
      )}
    >
      {composeRenderProps(children, (resolved) => (
        <>
          {label && <FieldLabel>{label}</FieldLabel>}
          {description && (
            <FieldDescription isHiddenOnInvalid={isDescriptionHiddenOnInvalid}>
              {description}
            </FieldDescription>
          )}
          <FieldError>{errorMessage}</FieldError>
          <div
            className={cn(
              "group-orientation-horizontal:flex-row mt-4 flex flex-col items-start justify-start gap-3"
            )}
          >
            {resolved}
          </div>
        </>
      ))}
    </AriaRadioGroup>
  )
}

// ------------------------- Radio -------------------------------
interface RadioFieldProps
  extends
    Pick<AriaRadioButtonProps, "children">,
    Omit<AriaRadioFieldProps, "children"> {
  description?: ReactNode
}

function Radio({ children, description, ...props }: RadioFieldProps) {
  return (
    <FieldIndentContext value="ms-6.5">
      <AriaRadioField
        {...props}
        className={composeRenderProps(props.className, (className) =>
          cn("group", className)
        )}
      >
        <RadioButton>{children}</RadioButton>
        {description && <FieldDescription>{description}</FieldDescription>}
      </AriaRadioField>
    </FieldIndentContext>
  )
}

// ------------------------- Radio Button -------------------------------
function RadioButton(props: AriaRadioButtonProps) {
  return (
    <AriaRadioButton
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
          {/* Radio selection indicator. */}
          <span
            className={cn(
              "bg-primary",
              "relative block size-4.5 shrink-0 rounded-full",
              "border-primary outline-brand border-2 outline-2 outline-offset-4 outline-none",

              rp.isFocusVisible && "outline-solid",
              rp.isInvalid && "border-error outline-error",
              rp.isDisabled && "bg-disabled border-disabled"
            )}
          >
            {rp.isSelected && (
              <span
                className={cn(
                  "motion-safe:animate-radio absolute h-full w-full scale-65 rounded-full",
                  !rp.isDisabled && "bg-brand",
                  rp.isInvalid && "bg-error",
                  rp.isDisabled && "bg-disabled"
                )}
              />
            )}
          </span>

          {/* Children will be the label of the RadioField. */}
          {children}
        </>
      ))}
    </AriaRadioButton>
  )
}

export {
  RadioGroup,
  Radio,
  type RadioGroupProps,
  type RadioFieldProps as RadioProps,
}

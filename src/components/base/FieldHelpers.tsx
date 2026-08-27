import { createContext, useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  FieldError as AriaFieldError,
  type FieldErrorProps as AriaFieldErrorProps,
  type ValidationResult,
} from "react-aria-components/FieldError"
import {
  Label as AriaLabel,
  type LabelProps as AriaLabelProps,
} from "react-aria-components/Label"
import {
  Text as AriaText,
  type TextProps as AriaTextProps,
} from "react-aria-components/Text"

import { cn } from "@/lib/utils"

// ------------------------- Field Indent Context -------------------------------
/** Lets a field pass the margin that aligns its description/error under the label. */
const FieldIndentContext = createContext("")

// ------------------------- Field Label -------------------------------
interface FieldLabelProps extends AriaLabelProps {
  isDisabled?: boolean
}

function FieldLabel({ isDisabled, ...props }: FieldLabelProps) {
  return (
    <AriaLabel
      {...props}
      className={cn(
        "text-secondary text-sm font-medium",
        "block justify-self-start",
        "group-disabled:text-disabled group-disabled:cursor-not-allowed",
        isDisabled && "text-disabled cursor-not-allowed",
        props.className
      )}
    />
  )
}

// ------------------------- Field Description -------------------------------
/** Sets the default for whether a nested description hides when the field is invalid. */
const HideDescriptionContext = createContext(true)

interface FieldDescriptionProps extends AriaTextProps {
  isDisabled?: boolean
  /** Hides the description if the field is invalid. */
  isHiddenOnInvalid?: boolean
}

function FieldDescription({
  isDisabled,
  isHiddenOnInvalid,
  ...props
}: FieldDescriptionProps) {
  const defaultHidden = useContext(HideDescriptionContext)
  const hidden = isHiddenOnInvalid ?? defaultHidden
  const indent = useContext(FieldIndentContext)

  return (
    <AriaText
      {...props}
      slot="description"
      className={cn(
        "text-tertiary text-sm font-normal",
        "block",
        "group-disabled:text-disabled group-disabled:cursor-not-allowed",
        indent,
        hidden && "group-invalid:hidden",
        isDisabled && "text-disabled cursor-not-allowed",
        props.className
      )}
    />
  )
}

// ------------------------- Field Error -------------------------------
function FieldError(props: AriaFieldErrorProps) {
  const indent = useContext(FieldIndentContext)

  return (
    <AriaFieldError
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn(
          "text-error text-start text-sm font-normal",
          "block justify-self-start",
          indent,
          className
        )
      )}
    />
  )
}

// ------------------------- ErrorMessage type -------------------------------
type ErrorMessage = string | ((validation: ValidationResult) => string)

export {
  FieldLabel,
  FieldDescription,
  FieldError,
  type FieldLabelProps,
  type FieldDescriptionProps,
  type AriaFieldErrorProps as FieldErrorProps,
  type AriaTextProps,
  type ErrorMessage,
  FieldIndentContext,
  HideDescriptionContext,
}

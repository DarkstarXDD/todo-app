import { type Ref, type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components"
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components/TextField"

import {
  FieldLabel,
  FieldDescription,
  FieldError,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import { TextArea } from "@/components/base/Input"
import { cn } from "@/lib/utils"

interface TextAreaFieldProps extends Omit<AriaTextFieldProps, "children"> {
  /** Ref to the underlying `<input>` element. */
  ref?: Ref<HTMLTextAreaElement>
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ErrorMessage
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  placeholder?: string
}

function TextAreaField({
  ref,
  label,
  description,
  errorMessage,
  leadingIcon,
  trailingIcon,
  placeholder,
  ...props
}: TextAreaFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group grid gap-2 disabled:cursor-not-allowed", className)
      )}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <TextArea
        ref={ref}
        placeholder={placeholder}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export { TextAreaField, type TextAreaFieldProps }

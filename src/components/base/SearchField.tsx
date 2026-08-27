import { X } from "lucide-react"
import { type Ref, type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components"
import {
  SearchField as AriaSearchField,
  Button as AriaButton,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components/SearchField"

import {
  FieldLabel,
  FieldDescription,
  FieldError,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import { Input } from "@/components/base/Input"
import { cn } from "@/lib/utils"

interface SearchFieldProps extends Omit<AriaSearchFieldProps, "children"> {
  /** Ref to the underlying `<input>` element. */
  ref?: Ref<HTMLInputElement>
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ErrorMessage
  leadingIcon?: ReactNode
  placeholder?: string
  hasClearButton?: boolean
}

// --------------------- Search Field ------------------------
function SearchField({
  ref,
  label,
  description,
  errorMessage,
  leadingIcon,
  placeholder,
  hasClearButton = true,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group grid gap-2 disabled:cursor-not-allowed", className)
      )}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <Input
        ref={ref}
        placeholder={placeholder}
        leadingIcon={leadingIcon}
        trailingIcon={hasClearButton && <SearchFieldClearButton />}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSearchField>
  )
}

// --------------------- Search Field Clear Button ------------------------
function SearchFieldClearButton({
  "aria-label": ariaLabel = "Clear",
}: {
  "aria-label"?: string
}) {
  return (
    <AriaButton
      aria-label={ariaLabel}
      className="pointer-events-auto size-5 cursor-pointer group-empty:hidden disabled:hidden"
    >
      <X className="text-primary size-5" />
    </AriaButton>
  )
}

export { SearchField, type SearchFieldProps }

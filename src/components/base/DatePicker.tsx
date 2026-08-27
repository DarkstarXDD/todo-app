import { Calendar as CalendarIcon } from "lucide-react"
import { type Ref, type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  DatePicker as AriaDatePicker,
  type DatePickerProps as AriaDatePickerProps,
  type DateValue,
} from "react-aria-components/DatePicker"

import { Button } from "@/components/base/Button"
import { Calendar } from "@/components/base/Calendar"
import { DateInput, DateSegment, InputGroup } from "@/components/base/DateInput"
import {
  FieldLabel,
  FieldDescription,
  FieldError,
  type ErrorMessage,
} from "@/components/base/FieldHelpers"
import { Popover } from "@/components/base/Popover"
import { cn } from "@/lib/utils"

interface DatePickerProps<T extends DateValue> extends Omit<
  AriaDatePickerProps<T>,
  "children"
> {
  /** Ref to the underlying `<input>` element. */
  ref?: Ref<HTMLDivElement>
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ErrorMessage
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function DatePicker<T extends DateValue>({
  ref,
  label,
  description,
  errorMessage,
  leadingIcon,
  trailingIcon,
  ...props
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker
      {...props}
      className={composeRenderProps(props.className, (className) =>
        cn("group grid gap-2 disabled:cursor-not-allowed", className)
      )}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      <InputGroup>
        <DateInput
          ref={ref}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
        >
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button>
          <CalendarIcon />
        </Button>
      </InputGroup>

      <Popover animationStyle="slide">
        <Calendar />
      </Popover>

      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError>{errorMessage}</FieldError>
    </AriaDatePicker>
  )
}

export { DatePicker, type DatePickerProps }

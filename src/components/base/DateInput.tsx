import { type Ref, type ReactNode, useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  type DateInputProps as AriaDateInputProps,
  type DateSegmentProps as AriaDateSegmentProps,
} from "react-aria-components/DateField"

import {
  inputCoreStyles,
  WithinInputGroupContext,
  InputIcons,
  inputWrapperStyles,
} from "@/components/base/InputGroup"
import { cn } from "@/lib/utils"

// ------------------------- DateInput -------------------------------
interface DateInputProps extends AriaDateInputProps {
  ref?: Ref<HTMLDivElement>
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function DateInput({ leadingIcon, trailingIcon, ...props }: DateInputProps) {
  return (
    <InputIcons leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
      {(iconFlags) => <DateInputCore {...props} {...iconFlags} />}
    </InputIcons>
  )
}

// ------------------------- DateInput Core -------------------------------
// DateInputCore is an implementation detail so it's not exported for consumers.
interface DateInputCoreProps extends AriaDateInputProps {
  ref?: Ref<HTMLDivElement>
  hasLeadingIcon?: boolean
  hasTrailingIcon?: boolean
}

function DateInputCore({
  hasLeadingIcon,
  hasTrailingIcon,
  ...props
}: DateInputCoreProps) {
  const isWithinInputGroup = useContext(WithinInputGroupContext)

  return (
    <AriaDateInput
      {...props}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          inputCoreStyles({
            isDisabled: rp.isDisabled,
            isWithinInputGroup,
            hasLeadingIcon,
            hasTrailingIcon,
          }),
          !isWithinInputGroup &&
            inputWrapperStyles({
              isFocusWithin: rp.isFocusWithin,
              isInvalid: rp.isInvalid,
              isDisabled: rp.isDisabled,
            }),
          className
        )
      )}
    />
  )
}

// ------------------------- Date Segment -------------------------------
function DateSegment(props: AriaDateSegmentProps) {
  return (
    <AriaDateSegment
      {...props}
      className={composeRenderProps(props.className, (className, rp) =>
        cn(
          "text-md font-normal tabular-nums md:text-sm",
          "rounded-md",
          "outline-none",
          rp.type !== "literal" && "p-1",
          rp.type === "literal" && "text-tertiary",
          rp.isPlaceholder && "text-placeholder",
          rp.isHovered && "bg-focused",
          (rp.isFocusVisible || rp.isFocused) && "bg-brand text-white",
          rp.isDisabled && "text-disabled cursor-not-allowed",
          className
        )
      )}
    />
  )
}

export {
  DateInput,
  DateSegment,
  type DateInputProps,
  type AriaDateSegmentProps as DateSegmentProps,
}

export { InputGroup, type InputGroupProps } from "@/components/base/InputGroup"

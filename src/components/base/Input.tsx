import { type Ref, type ReactNode, useContext } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Input as AriaInput,
  type InputProps as AriaInputProps,
} from "react-aria-components/Input"
import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
} from "react-aria-components/TextArea"

import {
  InputIcons,
  WithinInputGroupContext,
  inputWrapperStyles,
  inputCoreStyles,
} from "@/components/base/InputGroup"
import { cn } from "@/lib/utils"

// ------------------------- Input -------------------------------
interface InputProps extends AriaInputProps {
  ref?: Ref<HTMLInputElement>
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function Input({ leadingIcon, trailingIcon, ...props }: InputProps) {
  return (
    <InputIcons leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
      {(iconFlags) => <InputCore {...props} {...iconFlags} />}
    </InputIcons>
  )
}

// ------------------------- Input Core -------------------------------
// InputCore is an implementation detail so it's not exported for consumers.
interface InputCoreProps extends AriaInputProps {
  ref?: Ref<HTMLInputElement>
  hasLeadingIcon?: boolean
  hasTrailingIcon?: boolean
}

function InputCore({
  hasLeadingIcon,
  hasTrailingIcon,
  ...props
}: InputCoreProps) {
  const isWithinInputGroup = useContext(WithinInputGroupContext)

  return (
    <AriaInput
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
              isFocused: rp.isFocused,
              isInvalid: rp.isInvalid,
              isDisabled: rp.isDisabled,
            }),
          className
        )
      )}
    />
  )
}

// ------------------------- TextArea -------------------------------
interface TextAreaProps extends AriaTextAreaProps {
  ref?: Ref<HTMLTextAreaElement>
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function TextArea({ leadingIcon, trailingIcon, ...props }: TextAreaProps) {
  return (
    <InputIcons leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
      {(iconFlags) => <TextAreaCore {...props} {...iconFlags} />}
    </InputIcons>
  )
}

// ------------------------- TextArea Core -------------------------------
// InputCore is an implementation detail so it's not exported for consumers.
interface TextAreaCoreProps extends AriaTextAreaProps {
  ref?: Ref<HTMLTextAreaElement>
  hasLeadingIcon?: boolean
  hasTrailingIcon?: boolean
}

function TextAreaCore({
  hasLeadingIcon,
  hasTrailingIcon,
  ...props
}: TextAreaCoreProps) {
  const isWithinInputGroup = useContext(WithinInputGroupContext)

  return (
    <AriaTextArea
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
              isFocused: rp.isFocused,
              isInvalid: rp.isInvalid,
              isDisabled: rp.isDisabled,
            }),
          className
        )
      )}
    />
  )
}

export { Input, type InputProps, TextArea, type TextAreaProps }

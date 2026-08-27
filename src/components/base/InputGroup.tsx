import { createContext, type ReactNode } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  Group as AriaGroup,
  type GroupProps as AriaGroupProps,
} from "react-aria-components/Group"
import { tv } from "tailwind-variants"

import { cn } from "@/lib/utils"

/** Returns true if the current element is nested within an InputGroup. */
const WithinInputGroupContext = createContext(false)

// ------------------------- Input Group -------------------------------
function InputGroup(props: AriaGroupProps) {
  return (
    <WithinInputGroupContext value={true}>
      <AriaGroup
        {...props}
        className={composeRenderProps(props.className, (className, rp) =>
          inputWrapperStyles({
            isFocusWithin: rp.isFocusWithin,
            isInvalid: rp.isInvalid,
            isDisabled: rp.isDisabled,
            className: cn("flex items-stretch overflow-hidden", className),
          })
        )}
      />
    </WithinInputGroupContext>
  )
}

// ------------------------- Input Icons -------------------------------
interface InputIconsProps {
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  children: (iconFlags: {
    hasLeadingIcon: boolean
    hasTrailingIcon: boolean
  }) => ReactNode
}

function InputIcons({ leadingIcon, trailingIcon, children }: InputIconsProps) {
  if (!leadingIcon && !trailingIcon)
    return children({ hasLeadingIcon: false, hasTrailingIcon: false })

  return (
    <div className="text-tertiary has-disabled:text-disabled relative w-full min-w-0">
      {leadingIcon && (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          {leadingIcon}
        </span>
      )}

      {/* Children will be either Input or DateInput. */}
      {children({
        hasLeadingIcon: !!leadingIcon,
        hasTrailingIcon: !!trailingIcon,
      })}

      {trailingIcon && (
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          {trailingIcon}
        </span>
      )}
    </div>
  )
}

// ------------------------- Input Wrapper Styles -------------------------------
// Used by the InputGroup. If Input is not within a group, Input and DateInput will use these.
const inputWrapperStyles = tv({
  base: "bg-primary border-primary rounded-lg border shadow-xs outline-none",

  variants: {
    isFocused: { true: "border-brand outline-brand outline outline-solid" }, // Focus styles get applied if Input calls the style object.
    isFocusWithin: {
      true: "border-brand outline-brand outline outline-solid",
    }, // FocusWithin styles get applied if InputGroup calls the style object.
    isInvalid: { true: "border-error outline-error" },
    isDisabled: { true: "bg-disabled border-disabled cursor-not-allowed" },
  },
})

// ------------------------- Input Core Styles -------------------------------
// Used by Input and DateInput.
const inputCoreStyles = tv({
  base: [
    "text-md text-primary placeholder:text-placeholder font-normal md:text-sm",
    "w-full min-w-0 cursor-text px-3 py-1.5",
  ],
  variants: {
    isDisabled: {
      true: "text-disabled cursor-not-allowed placeholder:text-transparent",
    },

    hasLeadingIcon: { true: "pl-10.5" },
    hasTrailingIcon: { true: "pr-10.5" },

    isWithinInputGroup: {
      true: "bg-transparent outline-none",
    },
  },
})

export {
  InputGroup,
  InputIcons,
  WithinInputGroupContext,
  inputWrapperStyles,
  inputCoreStyles,
  type AriaGroupProps as InputGroupProps,
}

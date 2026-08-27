import { type RefObject } from "react"
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { tv, type VariantProps } from "tailwind-variants"

type ButtonVariants = VariantProps<typeof buttonStyles>

const buttonStyles = tv({
  base: [
    "pointer-events-auto cursor-pointer text-sm font-semibold whitespace-nowrap",
    "disabled:bg-disabled disabled:text-disabled disabled:border-disabled",
    "flex w-min items-center justify-center gap-2 rounded-lg px-3 py-1.5",
    "outline-brand border-primary/30 border outline-2 outline-offset-4 transition-colors duration-75 outline-none focus-visible:outline-solid",
  ],
  variants: {
    variant: {
      brand: "bg-brand pressed:bg-brand/95 hover:bg-brand/95 text-white",
      primary:
        "bg-primary border-primary text-secondary hover:bg-focused pressed:bg-focused",
      ghost:
        "text-secondary hover:bg-focused pressed:bg-focused border-transparent bg-transparent outline-offset-0",
      destructive:
        "bg-error outline-error pressed:bg-error/95 hover:bg-error/95 text-white",
    },
  },
  defaultVariants: { variant: "primary" },
})

interface ButtonProps extends AriaButtonProps, ButtonVariants {
  ref?: RefObject<HTMLButtonElement | null>
}

function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(props.className, (className) =>
        buttonStyles({ variant, className })
      )}
    />
  )
}

export { Button, type ButtonProps, type ButtonVariants, buttonStyles }

import { X } from "lucide-react"
import { ComponentProps } from "react"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import {
  DialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  // RAC mislabels Modal's props as `ModalOverlayProps`, so we alias it back to `ModalProps`.
  // https://github.com/adobe/react-spectrum/discussions/8421
  type ModalOverlayProps as AriaModalProps,
  Dialog as AriaDialog,
  type DialogProps as AriaDialogProps,
  type HeadingProps as AriaHeadingProps,
  Heading as AriaHeading,
} from "react-aria-components/Modal"

import { Button } from "@/components/base/Button"
import { cn } from "@/lib/utils"

// ----------------------------- Modal -------------------------------------
// Modal is what blocks the interaction with the rest of the page.
function Modal({ className, children, ...props }: AriaModalProps) {
  return (
    <AriaModalOverlay
      {...props}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 p-4"
    >
      <AriaModal
        className={composeRenderProps(className, (className) =>
          cn(
            "border-secondary bg-primary w-full max-w-100 rounded-2xl border p-5 shadow-xl md:p-6",
            className
          )
        )}
      >
        {children}
      </AriaModal>
    </AriaModalOverlay>
  )
}

interface DialogProps extends AriaDialogProps {
  hasCloseButton?: boolean
}
// ----------------------------- Dialog ------------------------------------
// Dialog is the content rendered.
function Dialog({ className, hasCloseButton = true, ...props }: DialogProps) {
  return (
    <AriaDialog {...props} className={cn("relative outline-none", className)}>
      {composeRenderProps(props.children, (resolved) => (
        <>
          {hasCloseButton && (
            <Button
              slot="close"
              aria-label="Close dialog"
              className="absolute -top-2 -right-2 size-9 border-none p-0 outline-offset-0"
            >
              <X className="text-tertiary" />
            </Button>
          )}
          {resolved}
        </>
      ))}
    </AriaDialog>
  )
}

// ----------------------------- Dialog Icon ------------------------------------
function DialogIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "text-secondary bg-primary border-secondary mb-4 flex size-10 items-center justify-center rounded-lg border",
        className
      )}
    />
  )
}

// ----------------------------- Dialog Title ------------------------------------
function DialogTitle(props: AriaHeadingProps) {
  return (
    <AriaHeading
      slot="title"
      {...props}
      className={cn("text-primary text-md mb-1 font-semibold", props.className)}
    />
  )
}

// ----------------------------- Dialog Description --------------------------------
function DialogDescription(props: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-tertiary text-sm font-normal", props.className)}
    />
  )
}

export {
  DialogTrigger as ModalTrigger,
  Modal,
  Dialog,
  DialogIcon,
  DialogTitle,
  DialogDescription,
}

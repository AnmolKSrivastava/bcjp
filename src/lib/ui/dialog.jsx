"use client";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "./utils";
function Dialog({
  ...props
}) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
function DialogTrigger({
  ...props
}) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
function DialogPortal({
  ...props
}) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
function DialogClose({
  ...props
}) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => <DialogPrimitive.Overlay
  ref={ref}
  data-slot="dialog-overlay"
  className={cn(
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
    className
  )}
  {...props}
/>);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => <DialogPortal data-slot="dialog-portal">
    <DialogOverlay />
    <DialogPrimitive.Content
  ref={ref}
  data-slot="dialog-content"
  className={cn(
    "bg-background fixed z-[51] grid h-fit w-[min(calc(100vw-2rem),22rem)] max-h-[min(85dvh,calc(100dvh-2rem))] gap-2 overflow-y-auto overscroll-contain rounded-2xl border p-3.5 shadow-lg outline-none duration-200 top-[50%] left-[50%] sm:max-w-lg sm:gap-4 sm:rounded-lg sm:p-6 sm:max-h-[min(90dvh,calc(100dvh-2rem))]",
    className
  )}
  {...props}
>
      {children}
      <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-3 right-3 sm:top-4 sm:right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <XIcon />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>);
DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader({ className, ...props }) {
  return <div
    data-slot="dialog-header"
    className={cn("flex flex-col gap-1 sm:gap-2 text-center sm:text-left", className)}
    {...props}
  />;
}
function DialogFooter({ className, ...props }) {
  return <div
    data-slot="dialog-footer"
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />;
}
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => <DialogPrimitive.Title
  ref={ref}
  data-slot="dialog-title"
  className={cn("text-base sm:text-lg leading-snug font-semibold", className)}
  {...props}
/>);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => <DialogPrimitive.Description
  ref={ref}
  data-slot="dialog-description"
  className={cn("text-muted-foreground text-xs sm:text-sm", className)}
  {...props}
/>);
DialogDescription.displayName = DialogPrimitive.Description.displayName;
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};

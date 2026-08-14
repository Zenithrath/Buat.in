"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContent,
  DialogHeader,
  DialogTitleText,
} from "@/components/ui/dialog";

export function Modal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className={cn(wide && "max-w-3xl")}>
        <DialogHeader>
          <DialogTitleText>{title}</DialogTitleText>
          <DialogCloseButton onClick={onClose} />
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
      </DialogContent>
    </Dialog>
  );
}
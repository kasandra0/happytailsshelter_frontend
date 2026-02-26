import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { FC } from "react";

export type ModalInputs = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  component?: any;
  onCancel: () => void;
  onSubmit: () => Promise<any>;
  cancelText?: string;
  submitText?: string;
};

export const Modal: FC<ModalInputs> = ({
  open,
  onOpenChange,
  title,
  description,
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Submit",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button onClick={onSubmit}>{submitText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

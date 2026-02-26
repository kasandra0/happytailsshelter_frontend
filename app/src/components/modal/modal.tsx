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
  form?: string;
};

export const Modal: FC<ModalInputs> = ({
  open,
  onOpenChange,
  title,
  description,
  component,
  onCancel,
  onSubmit,
  cancelText = "Cancel",
  submitText = "Submit",
  form,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {component && <div className="py-4">{component}</div>}

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button type="submit" form={form} onClick={onSubmit}>
            {submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

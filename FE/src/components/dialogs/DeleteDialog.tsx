import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";
import Loading from "../Loading";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  confirmText?: string;
  isPending: boolean;
}

export function DeleteDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  isPending,
}: DeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#1e1e1e] border-none [&>button]:text-white [&>button]:hover:text-white [&>button]:hover:bg-[#333333]">
        {isPending && <Loading variant="fullscreen" />}
        <DialogHeader>
          <DialogTitle className="text-[#00d4ff] text-xl">{title}</DialogTitle>
          <DialogDescription className="text-white">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between w-full">
          <Button
            className="bg-[#555555] hover:bg-[#444444] border-none text-white hover:text-white"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

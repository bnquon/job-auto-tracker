import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { EditJobApplication } from "types/EditJobApplication";

interface DeleteJobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  application: EditJobApplication | null;
}

export function DeleteJobApplicationDialog({
  open,
  onOpenChange,
  onConfirm,
  application,
}: DeleteJobApplicationDialogProps) {
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
        <DialogHeader>
          <DialogTitle className="text-[#00d4ff] text-xl">
            Delete Job Application
          </DialogTitle>
          <DialogDescription className="text-white">
            Are you sure you want to delete this job application{" "}
            {application?.company_name && application.title && (
              <>
                for <strong>{application.title}</strong> at{" "}
                <strong>{application.company_name}</strong>
              </>
            )}
            ? This action cannot be undone.
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
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

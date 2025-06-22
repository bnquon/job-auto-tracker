import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import type { EditJobApplication } from "../../../types/EditJobApplication";
import { editJobApplicationSchema } from "../../../schemas/EditJobSchema";
import { JobApplicationForm } from "../JobApplicationForm";

interface EditJobApplicationDialogProps {
  title: string;
  subTitle: string;
  confirmText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EditJobApplication) => void;
  application: EditJobApplication | null;
}

export function EditJobApplicationDialog({
  title,
  subTitle,
  confirmText,
  open,
  onOpenChange,
  onSubmit,
  application,
}: EditJobApplicationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<EditJobApplication>({
    resolver: zodResolver(editJobApplicationSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: EditJobApplication) => {
    onSubmit(data);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  useEffect(() => {
    if (application) {
      reset({
        company_name: application.company_name,
        title: application.title,
        link: application.link,
        status: application.status,
      });
    }
  }, [application, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {subTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <JobApplicationForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <DialogFooter className="flex justify-between w-full">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {confirmText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

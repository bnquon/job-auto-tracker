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
import { JobApplicationForm } from "../JobApplicationForm";
import {  manualAddJobApplicationWithoutCycleSchema } from "../../../schemas/ManualAddJobSchema";
import type { ManualJobWithoutCycle } from "../../../types/ManualJobApplication";
import Loading from "../Loading";

interface EditJobApplicationDialogProps {
  title: string;
  subTitle: string;
  confirmText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ManualJobWithoutCycle) => void;
  application: EditJobApplication | null;
  isPending: boolean;
}

export function EditJobApplicationDialog({
  title,
  subTitle,
  confirmText,
  open,
  onOpenChange,
  onSubmit,
  application,
  isPending,
}: EditJobApplicationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ManualJobWithoutCycle>({
    resolver: zodResolver(manualAddJobApplicationWithoutCycleSchema),
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: ManualJobWithoutCycle) => {
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
        company_name: application.company_name ?? undefined,
        title: application.title ?? undefined,
        link: application.link ?? undefined,
        status: application.status,
        notes: application.notes ?? undefined,
      });
    }
  }, [application, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] bg-[#1e1e1e] border-none [&>button]:text-white [&>button]:hover:text-white [&>button]:hover:bg-[#333333]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isPending && <Loading variant="overlay" />}
        <DialogHeader>
          <DialogTitle className="text-[#00d4ff] text-xl">{title}</DialogTitle>
          <DialogDescription className="text-[#ccc]">
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
            <Button
              type="button"
              className="bg-[#555555] hover:bg-[#444444] border-none text-white hover:text-white"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#00d4ff] hover:bg-[#00b2e0]">
              {confirmText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

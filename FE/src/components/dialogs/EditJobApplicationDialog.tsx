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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import type { ApplicationStatus } from "types/JobApplication";
import type { EditJobApplication } from "../../../types/EditJobApplication"
import { editJobApplicationSchema } from "../../../schemas/EditJobSchema"

interface EditJobApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: EditJobApplication) => void;
  application: EditJobApplication | null;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "received_oa", label: "Received OA" },
  { value: "rejected", label: "Rejected" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offered", label: "Offered" },
  { value: "ghosted", label: "Ghosted" },
];

export function EditJobApplicationDialog({
  open,
  onOpenChange,
  onSubmit,
  application,
}: EditJobApplicationDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<EditJobApplication>({
    resolver: zodResolver(editJobApplicationSchema),
    mode: "onSubmit",
  });

  const statusValue = watch("status");

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
      <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault( )}>
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
          <DialogDescription>
            Update the details for this job application.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid gap-3">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              {...register("company_name")}
              id="company_name"
              placeholder="Enter company name"
            />
            {errors.company_name && (
              <p className="text-red-500 text-sm">{errors.company_name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="title">Job Title</Label>
            <Input
              {...register("title")}
              id="title"
              placeholder="Enter job title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="link">Job Link</Label>
            <Input
              {...register("link")}
              id="link"
              type="url"
              placeholder="https://..."
            />
            {errors.link && (
              <p className="text-red-500 text-sm">{errors.link.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={statusValue} 
              onValueChange={(value) => setValue("status", value as ApplicationStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
          
          <DialogFooter className="flex justify-between w-full">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
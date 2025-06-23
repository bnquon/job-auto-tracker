import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ApplicationStatus } from "../../types/JobApplication";
import type { EditJobApplication } from "../../types/EditJobApplication";

interface JobApplicationFormProps {
  register: UseFormRegister<EditJobApplication>;
  errors: FieldErrors<EditJobApplication>;
  setValue: UseFormSetValue<EditJobApplication>;
  watch: UseFormWatch<EditJobApplication>;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: "applied", label: "Applied" },
  { value: "received_oa", label: "Received OA" },
  { value: "rejected", label: "Rejected" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offered", label: "Offered" },
  { value: "ghosted", label: "Ghosted" },
];

export function JobApplicationForm({
  register,
  errors,
  setValue,
  watch,
}: JobApplicationFormProps) {
  const statusValue = watch("status");

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        <Label htmlFor="company_name" className="text-[#ccc] text-lg">Company Name</Label>
        <Input
          {...register("company_name")}
          id="company_name"
          placeholder="Enter company name"
          className="border-[#444] bg-[#2a2a2a] text-[#e0e0e0]"
        />
        {errors.company_name && (
          <p className="text-red-500 text-sm">
            {errors.company_name.message}
          </p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="title" className="text-[#ccc] text-lg">Job Title</Label>
        <Input
          {...register("title")}
          id="title"
          placeholder="Enter job title"
          className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="link" className="text-[#ccc] text-lg">Job Link</Label>
        <Input
          {...register("link")}
          id="link"
          placeholder="https://..."
          className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
        />
        {errors.link && (
          <p className="text-red-500 text-sm">{errors.link.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="status" className="text-[#ccc] text-lg">Status</Label>
        <Select
          value={statusValue}
          onValueChange={(value) =>
            setValue("status", value as ApplicationStatus)
          }
        >
          <SelectTrigger className="bg-[#2a2a2a] text-[#e0e0e0] border-[#444]">
            <SelectValue placeholder="Select a status" className="text-[#e0e0e0]" />
          </SelectTrigger>
          <SelectContent className="bg-[#2a2a2a] border-[#444]">
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-[#e0e0e0] focus:bg-[#444]">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="notes" className="text-[#ccc] text-lg">Notes</Label>
        <Textarea
          className="resize-none bg-[#2a2a2a] text-[#e0e0e0] border-[#444]"
          {...register("notes")}
          id="notes"
          placeholder="Applied with a referral."
        />
        {errors.notes && (
          <p className="text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>
    </div>
  );
}
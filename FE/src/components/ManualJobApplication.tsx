import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editJobApplicationSchema } from "../../schemas/EditJobSchema";
import type { EditJobApplication } from "../../types/EditJobApplication";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { useAddApplication } from "@/hooks/useAddApplication";

export function ManualJobApplication() {
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

  const { mutate: addJob } = useAddApplication();

  const handleFormSubmit = (data: EditJobApplication) => {
    addJob(data);
    reset({
      company_name: null,
      title: null,
      link: null,
      notes: null,
      status: "applied",
    });
  };

  const handleCancel = () =>
    reset({
      company_name: null,
      title: null,
      link: null,
      notes: null,
      status: "applied",
    });

  return (
    <>
      <p className="text-2xl text-[#00d4ff] font-bold mb-2">Add Job Application</p>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 mt-2"
      >
        <JobApplicationForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        <DialogFooter className="flex justify-between w-full">
          <Button
            type="button"
            className="cursor-pointer bg-[#555555] hover:bg-[#444444] hover:text-white border-none text-white"
            variant="outline"
            onClick={handleCancel}
          >
            Clear
          </Button>
          <Button className="cursor-pointer bg-[#00d4ff] hover:bg-[#00b2e0] border-none text-white" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ManualJobApplication } from "../../types/ManualJobApplication";
import { JobApplicationForm } from "./JobApplicationForm";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { useAddApplication } from "@/hooks/useAddApplication";
import { manualAddJobApplicationSchema } from "../../schemas/ManualAddJobSchema";

export function ManualJobApplication() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ManualJobApplication>({
    resolver: zodResolver(manualAddJobApplicationSchema),
    mode: "onSubmit",
  });

  const { mutate: addJob } = useAddApplication();

  const handleFormSubmit = (data: ManualJobApplication) => {
    addJob(data);
    reset({
      company_name: "",
      title: "",
      link: null,
      notes: null,
      status: "applied",
    });
  };

  const handleCancel = () =>
    reset({
      company_name: "",
      title: "",
      link: null,
      notes: null,
      status: "applied",
    });

  return (
    <>
      <p className="text-2xl text-[#00d4ff] font-bold mb-2">
        Add Job Application
      </p>
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
          <Button
            className="cursor-pointer bg-[#00d4ff] hover:bg-[#00b2e0] border-none text-white"
            type="submit"
          >
            Submit
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

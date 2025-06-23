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
    console.log(data);
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
      <p className="text-lg leading-none font-semibold">Add Job Application</p>
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
            className="cursor-pointer"
            variant="outline"
            onClick={handleCancel}
          >
            Clear
          </Button>
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

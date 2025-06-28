import { useState } from "react";
import { BentoContainer } from "../shared/BentoContainer";
import UploadForm from "../UploadForm";
import { EditJobApplicationDialog } from "../dialogs/EditJobApplicationDialog";
import { useExtractInfo } from "@/hooks/useExtractInfo";
import { useAddApplication } from "@/hooks/useAddApplication";
import Loading from "../Loading";
import type { ManualJobWithoutCycle } from "types/ManualJobApplication";

interface UploadWrapperProps {
  currentCycleId: number;
}

export function UploadWrapper({ currentCycleId }: UploadWrapperProps) {
  const [extractInfoModalOpen, setExtractInfoModalOpen] = useState(false);
  const { mutate: extractInfo, data, isPending } = useExtractInfo();
  const { mutate: addJob, isPending: isAdding } = useAddApplication();

  const onUploadConfirm = (file: File) => {
    extractInfo(file);
    setExtractInfoModalOpen(true);
  };

  const onSubmitConfirm = (data: ManualJobWithoutCycle) => {
    addJob({ ...data, cycle_id: currentCycleId });
    setExtractInfoModalOpen(false);
  };

  return (
    <>
      <BentoContainer>
        <UploadForm onConfirm={onUploadConfirm} />
      </BentoContainer>

      {data && extractInfoModalOpen && (
        <EditJobApplicationDialog
          title="Add Job Application"
          subTitle="Take a look at the extracted info and change it if needed."
          confirmText="Add Application"
          open={extractInfoModalOpen}
          onOpenChange={setExtractInfoModalOpen}
          onSubmit={onSubmitConfirm}
          application={{
            ...data,
            status: "applied",
            notes: "",
          }}
          isPending={isAdding}
        />
      )}

      {isPending && <Loading loadingText="Extracting info" />}
    </>
  );
}

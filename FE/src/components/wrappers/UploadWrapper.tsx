import { useState } from "react";
import { BentoContainer } from "../shared/BentoContainer";
import UploadForm from "../UploadForm";
import { EditJobApplicationDialog } from "../dialogs/EditJobApplicationDialog";
import { useExtractInfo } from "@/hooks/useExtractInfo";
import { useAddApplication } from "@/hooks/useAddApplication";
import type { EditJobApplication } from "types/EditJobApplication";

export function UploadWrapper() {
  const [extractInfoModalOpen, setExtractInfoModalOpen] = useState(false);
  const { mutate: extractInfo, data } = useExtractInfo();
  const { mutate: addJob } = useAddApplication();

  const onUploadConfirm = (file: File) => {
    extractInfo(file);
    setExtractInfoModalOpen(true);
  };

  const onSubmitConfirm = (data: EditJobApplication) => {
    addJob(data);
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
        />
      )}
    </>
  );
}

import { useState } from "react";
import type { ReceivedJobApplicationInfo } from "types/JobApplication";
import { BentoContainer } from "../shared/BentoContainer";
import JobApplicationsTable from "../JobApplicationsTable";
import { DeleteDialog } from "../dialogs/DeleteDialog";
import { EditJobApplicationDialog } from "../dialogs/EditJobApplicationDialog";
import type { EditJobApplication } from "types/EditJobApplication";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";
import { useDeleteApplication } from "@/hooks/useDeleteApplication";

interface ITableWrapper {
  data?: ReceivedJobApplicationInfo[];
}

export const TableWrapper = ({ data = [] }: ITableWrapper) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] =
    useState<ReceivedJobApplicationInfo | null>(null);

  const deleteText = (
    <>
      Are you sure you want to delete this job application{" "}
      {selectedApp?.company_name && selectedApp.title && (
        <>
          for <strong>{selectedApp.title}</strong> at{" "}
          <strong>{selectedApp.company_name}</strong>
        </>
      )}
      ? This action cannot be undone.
    </>
  );

  const { mutate: updateJob, isPending: isUpdating } = useUpdateApplication();
  const { mutate: deleteJob, isPending } = useDeleteApplication();

  const handleEdit = (id: number) => {
    const app = data.find((app) => app.id === id);
    setSelectedApp(app || null);
    setEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const app = data.find((app) => app.id === id);
    setSelectedApp(app || null);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedApp) {
      deleteJob(selectedApp.id);
    }
  };

  const handleEditSubmit = (formData: EditJobApplication) => {
    if (selectedApp) {
      updateJob({ jobId: selectedApp.id, updatedData: formData });
    }
  };

  return (
    <>
      <BentoContainer>
        <p className="text-2xl text-[#00d4ff] font-bold mb-4">
          Job Applications
        </p>
        <JobApplicationsTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </BentoContainer>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Job Application"
        description={deleteText}
        isPending={isPending}
      />

      <EditJobApplicationDialog
        title="Edit Job Application"
        subTitle="Edit the fields below and save to update the job application."
        confirmText="Save Changes"
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
        application={selectedApp}
        isPending={isUpdating}
      />
    </>
  );
};

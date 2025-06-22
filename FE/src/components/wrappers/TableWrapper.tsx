import { useState } from "react";
import type { ReceivedJobApplicationInfo } from "types/JobApplication";
import { BentoContainer } from "../shared/BentoContainer";
import DataGridDemo from "../JobApplicationsDataGrid";
import { DeleteJobApplicationDialog } from "../dialogs/DeleteJobApplicationDialog";
import { EditJobApplicationDialog } from "../dialogs/EditJobApplicationDialog";
import type { EditJobApplication } from "types/EditJobApplication";

interface ITableWrapper {
  data: ReceivedJobApplicationInfo[];
}

export const TableWrapper = ({ data }: ITableWrapper) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedApp, setSelectedApp] =
    useState<ReceivedJobApplicationInfo | null>(null);

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
      // call delete hook
      console.log("Deleting application:", selectedApp.id);
      
    }
  };

  const handleEditSubmit = (formData: EditJobApplication) => {
    if (selectedApp) {
      // call edit hook
      console.log("Updating application:", selectedApp.id, formData);
    }
  };

  return (
    <BentoContainer>
      <DataGridDemo data={data} onEdit={handleEdit} onDelete={handleDelete} />

      <DeleteJobApplicationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        application={selectedApp}
      />

      <EditJobApplicationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditSubmit}
        application={selectedApp}
      />
    </BentoContainer>
  );
};

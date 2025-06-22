import Box from "@mui/material/Box";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { Chip, Typography, IconButton } from "@mui/material";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { MapApplicationStatusToString } from "../../helpers/ApplicationStatusHelper";
import type {
  ApplicationStatus,
  ReceivedJobApplicationInfo,
} from "types/JobApplication";

interface JobApplicationsDataGridProps {
  data: ReceivedJobApplicationInfo[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const CompanyCell = ({ value }: GridRenderCellParams) => (
  <Typography variant="body2" fontWeight="medium">
    {value}
  </Typography>
);

const TitleCell = ({ value }: GridRenderCellParams) => (
  <Typography variant="body2" color="text.primary">
    {value}
  </Typography>
);

const StatusCell = ({ value }: GridRenderCellParams) => {
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "applied":
        return "primary";
      case "received_oa":
        return "info";
      case "rejected":
        return "error";
      case "interviewing":
        return "warning";
      case "offered":
        return "success";
      case "ghosted":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={MapApplicationStatusToString(value)}
      color={getStatusColor(value)}
      size="small"
      variant="filled"
    />
  );
};

const DateCell = ({ value }: GridRenderCellParams) => (
  <Typography variant="body2" color="text.secondary">
    {new Date(value).toLocaleDateString()}
  </Typography>
);

const LinkCell = ({ value }: GridRenderCellParams) => {
  if (!value) {
    return (
      <Typography variant="body2" color="text.secondary">
        -
      </Typography>
    );
  }

  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#1976d2",
        textDecoration: "underline",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
        maxWidth: "100%",
      }}
    >
      {value}
    </a>
  );
};

const NotesCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: "100%",
    }}
  >
    {value || "-"}
  </Typography>
);

const ActionsCell = ({
  row,
  onEdit,
  onDelete,
}: {
  row: ReceivedJobApplicationInfo;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    onEdit?.(row.id);
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(row.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <IconButton size="small">
          <EllipsisVertical />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1">
        <div className="flex flex-col">
          <button
            onClick={handleEdit}
            className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded text-red-600"
          >
            Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function JobApplicationsDataGrid({
  data,
  onEdit,
  onDelete,
}: JobApplicationsDataGridProps) {
  const columns: GridColDef<ReceivedJobApplicationInfo>[] = [
    {
      field: "company_name",
      headerName: "Company",
      display: "flex",
      width: 200,
      renderCell: CompanyCell,
    },
    {
      field: "title",
      headerName: "Job Title",
      display: "flex",
      width: 250,
      renderCell: TitleCell,
    },
    {
      field: "status",
      headerName: "Status",
      display: "flex",
      width: 120,
      renderCell: StatusCell,
    },
    {
      field: "link",
      headerName: "Link",
      display: "flex",
      width: 150,
      sortable: false,
      renderCell: LinkCell,
    },
    {
      field: "applied_on",
      headerName: "Applied On",
      display: "flex",
      width: 130,
      renderCell: DateCell,
    },
    {
      field: "notes",
      headerName: "Notes",
      display: "flex",
      width: 200,
      sortable: false,
      renderCell: NotesCell,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 80,
      display: "flex",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <ActionsCell row={params.row} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          "& .MuiDataGrid-main": {
            borderRadius: 2,
          },
          "& .MuiDataGrid-columnHeaders": {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          },
          "& .MuiDataGrid-footerContainer": {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
        }}
      />
    </Box>
  );
}

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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CompanyCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    fontWeight="600"
    sx={{ fontSize: "15px", textOverflow: "ellipsis" }}
  >
    {value}
  </Typography>
);

const TitleCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    color="text.primary"
    sx={{ fontSize: "15px", textOverflow: "ellipsis" }}
  >
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
      size="medium"
      variant="filled"
      sx={{
        fontSize: "13px",
        fontWeight: 500,
        height: "28px",
      }}
    />
  );
};

const DateCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    color="text.secondary"
    sx={{ fontSize: "15px", textOverflow: "ellipsis" }}
  >
    {new Date(value).toLocaleDateString()}
  </Typography>
);

const LinkCell = ({ value }: GridRenderCellParams) => {
  if (!value) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: "15px", textOverflow: "ellipsis" }}
      >
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
        fontSize: "15px",
        fontWeight: 500,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        display: "block",
        maxWidth: "100%",
      }}
    >
      {value.length > 20 ? `${value.substring(0, 20)}...` : value}
    </a>
  );
};

const NotesCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    color="text.secondary"
    sx={{
      fontSize: "15px",
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
        <IconButton size="medium" sx={{ padding: "8px" }}>
          <EllipsisVertical size={18} />
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
      flex: 1,
      minWidth: 140,
      renderCell: CompanyCell,
    },
    {
      field: "title",
      headerName: "Job Title",
      display: "flex",
      flex: 2,
      minWidth: 200,
      renderCell: TitleCell,
    },
    {
      field: "status",
      headerName: "Status",
      display: "flex",
      flex: 1,
      minWidth: 210,
      renderCell: StatusCell,
    },
    {
      field: "link",
      headerName: "Link",
      display: "flex",
      flex: 1.5,
      minWidth: 150,
      sortable: false,
      renderCell: LinkCell,
    },
    {
      field: "applied_on",
      headerName: "Applied On",
      display: "flex",
      flex: 1,
      minWidth: 120,
      renderCell: DateCell,
    },
    {
      field: "notes",
      headerName: "Notes",
      display: "flex",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: NotesCell,
    },
    {
      field: "actions",
      headerName: "Actions",
      display: "flex",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <ActionsCell row={params.row} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
  return (
    <Box sx={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          // Remove main container border
          border: "none",

          // Header styling
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8fafc",
            borderRadius: "0",
            border: "none",
            "& .MuiDataGrid-columnHeader": {
              padding: "16px 12px",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                letterSpacing: "0.5px",
              },
            },
          },

          "& .MuiDataGrid-row": {
            "&:hover": {
              backgroundColor: "#f8fafc",
            },
          },

          "& .MuiDataGrid-cell": {
            padding: "16px 12px",
            borderRight: "1px solid #f1f5f9",
            borderBottom: "none", // Remove default cell bottom borders
            "&:last-child": {
              borderRight: "none",
            },
          },

          // Footer styling
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "transparent",
            border: "none",
            borderRadius: 0,
            marginTop: "16px",
            padding: "8px 0",
            minHeight: "52px",

            "& .MuiTablePagination-root": {
              "& .MuiTablePagination-toolbar": {
                paddingLeft: 0,
                paddingRight: 0,
              },

              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#374151",
                },

              "& .MuiTablePagination-select": {
                fontSize: "14px",
                fontWeight: 500,
              },

              "& .MuiTablePagination-actions": {
                "& .MuiIconButton-root": {
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  margin: "0 2px",
                  padding: "6px",
                  "&:hover": {
                    backgroundColor: "#e2e8f0",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #f1f5f9",
                  },
                },
              },
            },
          },

          // Scrollbar styling
          "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f8fafc",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#cbd5e1",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#94a3b8",
              },
            },
          },
        }}
      />
    </Box>
  );
}

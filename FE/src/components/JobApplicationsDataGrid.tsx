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
    sx={{
      fontSize: "18px",
      textOverflow: "ellipsis",
      color: "#ffffff",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}
  >
    {value}
  </Typography>
);

const TitleCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    sx={{
      fontSize: "18px",
      textOverflow: "ellipsis",
      color: "#ffffff",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}
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
        fontSize: "16px",
        fontWeight: 500,
        height: "28px",
      }}
    />
  );
};

const DateCell = ({ value }: GridRenderCellParams) => (
  <Typography
    variant="body1"
    sx={{ fontSize: "18px", textOverflow: "ellipsis", color: "#b3b3b3" }}
  >
    {new Date(value).toLocaleDateString()}
  </Typography>
);

const LinkCell = ({ value }: GridRenderCellParams) => {
  if (!value) {
    return (
      <Typography
        variant="body1"
        sx={{ fontSize: "18px", textOverflow: "ellipsis", color: "#b3b3b3" }}
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
        color: "#00d4ff",
        textDecoration: "underline",
        fontSize: "18px",
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
    sx={{
      fontSize: "18px",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: "100%",
      color: "#b3b3b3",
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
        <IconButton size="medium" sx={{ padding: "8px", color: "#00d4ff" }}>
          <EllipsisVertical size={18} />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-1 bg-white">
        <div className="flex flex-col">
          <button
            onClick={handleEdit}
            className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 text-sm text-left hover:bg-gray-100 rounded text-red-400"
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
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#1a1a1a" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25, 40, 50]}
        disableRowSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          // Remove main container border and set dark background
          border: "none",
          backgroundColor: "#1e1e1e",
          color: "#ffffff",
          height: "100%",

          // Header styling
          "& .MuiDataGrid-columnHeaders": {
            borderRadius: "0",
            border: "none",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#2a2a2a",
              padding: "16px 12px",
              borderBottom: "none",
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "16px",
                fontWeight: 600,
                color: "#00d4ff",
                letterSpacing: "0.5px",
              },
              // Column menu icon styling
              "& .MuiDataGrid-menuIconButton": {
                color: "#666666",
                "&:hover": {
                  backgroundColor: "#333333",
                  color: "#00d4ff",
                },
              },
              "& .MuiDataGrid-menuIcon": {
                color: "inherit",
              },
              // Sorting arrow styling
              "& .MuiDataGrid-sortIcon": {
                color: "#00d4ff",
                opacity: 1,
              },
            },
          },

          "& .MuiDataGrid-row": {
            backgroundColor: "#1e1e1e",
            border: "none",
            "&:hover": {
              backgroundColor: "#2d2d2d",
            },
            "&.Mui-selected": {
              backgroundColor: "#2d2d2d",
              "&:hover": {
                backgroundColor: "#333333",
              },
            },
          },

          "& .MuiDataGrid-cell": {
            padding: "16px 12px",
            borderBottom: "1px solid #2a2a2a",
            "&:last-child": {
              borderRight: "none",
            },
          },

          // Footer styling
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#1e1e1e",
            border: "none",
            borderRadius: 0,
            padding: "8px 0",
            minHeight: "52px",
            position: "sticky",
            bottom: 0,

            "& .MuiTablePagination-root": {
              color: "#ffffff",
              "& .MuiTablePagination-toolbar": {
                paddingLeft: 0,
                paddingRight: 0,
              },

              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#ffffff",
                },

              "& .MuiTablePagination-select": {
                fontSize: "14px",
                fontWeight: 500,
                color: "#ffffff",
                backgroundColor: "#1e1e1e",
                border: "1px solid #404040",
              },

              "& .MuiTablePagination-actions": {
                "& .MuiIconButton-root": {
                  backgroundColor: "#1e1e1e",
                  border: "1px solid #404040",
                  borderRadius: "6px",
                  margin: "0 2px",
                  padding: "6px",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#333333",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #404040",
                    color: "#666666",
                  },
                },
              },
            },
          },

          // Scrollbar styling for dark theme
          "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#1e1e1e",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#555555",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#777777",
              },
            },
          },
        }}
      />
    </Box>
  );
}

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  ChevronUp,
  ChevronDown,
  Search,
  Check,
  Edit,
  Trash2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import type {
  ApplicationStatus,
  ReceivedJobApplicationInfo,
} from "types/JobApplication";
import { Input } from "./ui/input";
import { MapApplicationStatusToString } from "../../helpers/ApplicationStatusHelper";

interface JobApplicationsTableProps {
  data: ReceivedJobApplicationInfo[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// Multi-select status filter component
const StatusMultiSelect = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  const statusOptions = [
    { value: "applied", label: "Applied" },
    { value: "received_oa", label: "Received OA" },
    { value: "rejected", label: "Rejected" },
    { value: "interviewing", label: "Interviewing" },
    { value: "offered", label: "Offered" },
    { value: "ghosted", label: "Ghosted" },
  ];

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:text-white"
        >
          <span>
            {value.length === 0
              ? "Filter by Status"
              : `${value.length} status${
                  value.length === 1 ? "" : "es"
                } selected`}
          </span>
          {open ? (
            <ChevronUp className="h-4 w-4 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 bg-white">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Select Statuses
            </span>
            {value.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="space-y-1">
            {statusOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => toggleOption(option.value)}
              >
                <div className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded">
                  {value.includes(option.value) && (
                    <Check className="w-3 h-3 text-blue-600" />
                  )}
                </div>
                <span className="text-sm text-gray-700">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const StatusChip = ({ status }: { status: ApplicationStatus }) => {
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "applied":
        return "bg-blue-600 text-white";
      case "received_oa":
        return "bg-cyan-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      case "interviewing":
        return "bg-orange-600 text-white";
      case "offered":
        return "bg-green-600 text-white";
      case "ghosted":
        return "bg-gray-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
    >
      {MapApplicationStatusToString(status)}
    </span>
  );
};

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
    <div className="text-lg font-semibold mb-2">No applications yet</div>
    <div className="text-sm">
      Start tracking your job applications by adding your first application
    </div>
  </div>
);

export default function JobApplicationsTable({
  data,
  onEdit,
  onDelete,
}: JobApplicationsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<ReceivedJobApplicationInfo>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("company_name", {
        header: "Company",
        cell: ({ getValue }) => (
          <div className="text-white font-semibold text-lg truncate">
            {getValue()}
          </div>
        ),
        filterFn: "includesString",
        size: 250,
      }),
      columnHelper.accessor("title", {
        header: "Job Title",
        cell: ({ getValue }) => (
          <div className="text-white text-lg truncate">{getValue()}</div>
        ),
        filterFn: "includesString",
        size: 200,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <StatusChip status={getValue()} />,
        filterFn: (row, columnId, value) => {
          if (!value || value.length === 0) return true;
          return value.includes(row.getValue(columnId));
        },
        size: 150,
      }),
      columnHelper.accessor("link", {
        header: "Link",
        cell: ({ getValue }) => {
          const value = getValue();
          if (!value) {
            return <span className="text-gray-400 text-lg">-</span>;
          }
          return (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline text-lg font-medium hover:text-cyan-300 block truncate"
            >
              {value}
            </a>
          );
        },
        enableSorting: false,
        size: 200,
      }),
      columnHelper.accessor("applied_on", {
        header: "Applied On",
        cell: ({ getValue }) => (
          <div className="text-gray-300 text-lg truncate">
            {new Date(getValue()).toLocaleDateString()}
          </div>
        ),
        size: 150,
      }),
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: ({ getValue }) => (
          <div className="text-gray-300 text-lg truncate">
            {getValue() || "-"}
          </div>
        ),
        enableSorting: false,
        size: 170,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Button
              onClick={() => onEdit(row.original.id)}
              className="text-cyan-400 hover:bg-gray-600 hover:text-cyan-500 cursor-pointer rounded-lg transition-colors p-2"
              variant="ghost"
              size="sm"
              title="Edit application"
            >
              <Edit size={16} />
            </Button>
            <Button
              onClick={() => onDelete(row.original.id)}
              className="text-red-400 hover:bg-gray-600 hover:text-red-50 cursor-pointer rounded-lg transition-colors p-2"
              variant="ghost"
              size="sm"
              title="Delete application"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ),
        enableSorting: false,
        size: 92,
      }),
    ],
    [onEdit, onDelete, columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string[]) || [];

  // Calculate total width for consistent grid layout
  const totalWidth = columns.reduce((acc, col) => acc + (col.size || 150), 0);
  const gridTemplateColumns = columns
    .map((col) => `${col.size || 150}px`)
    .join(" ");

  if (data.length === 0) {
    return (
      <div className="w-full h-full">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Search and Filters */}
      <div className="py-4 border-b shrink-0 border-gray-700">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Global Search */}
          <div className="relative flex-1 min-w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search by company name, job title, status, notes, or link..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <StatusMultiSelect
              value={statusFilter}
              onChange={(values) => {
                table
                  .getColumn("status")
                  ?.setFilterValue(values.length ? values : undefined);
              }}
            />
          </div>

          {/* Clear Filters */}
          <Button
            disabled={!globalFilter && !columnFilters.length}
            onClick={() => {
              setGlobalFilter("");
              setColumnFilters([]);
            }}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm transition-colors"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Table Container - Horizontal scroll for entire table */}
      <div className="flex-1 overflow-x-auto">
        <div style={{ minWidth: `${totalWidth}px`, width: "100%" }}>
          {/* Table Header - Fixed, no vertical scroll */}
          <div className="bg-gray-800 border-b border-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <div
                key={headerGroup.id}
                className="grid w-full"
                style={{
                  gridTemplateColumns: gridTemplateColumns,
                }}
              >
                {headerGroup.headers.map((header) => (
                  <div
                    key={header.id}
                    className="px-3 py-4 text-left text-cyan-400 font-semibold text-base tracking-wide"
                  >
                    <div className="flex items-center gap-2">
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              <ChevronUp
                                size={14}
                                className={`${
                                  header.column.getIsSorted() === "asc"
                                    ? "text-cyan-400"
                                    : "text-gray-600"
                                }`}
                              />
                              <ChevronDown
                                size={14}
                                className={`${
                                  header.column.getIsSorted() === "desc"
                                    ? "text-cyan-400"
                                    : "text-gray-600"
                                } -mt-1`}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Table Body - Vertical scroll only with LEFT scrollbar */}
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: "720px",
              direction: "rtl", // This moves scrollbar to left
            }}
          >
            <div style={{ direction: "ltr" }}>
              {" "}
              {/* This keeps content flowing left-to-right */}
              {table.getRowModel().rows.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="text-lg font-semibold mb-2">
                      No matching applications found
                    </div>
                    <div className="text-sm">
                      Try adjusting your search or filter criteria
                    </div>
                  </div>
                </div>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <div
                    key={row.id}
                    className="grid w-full border-b border-gray-800 hover:bg-gray-800 transition-colors"
                    style={{
                      gridTemplateColumns: gridTemplateColumns,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <div
                        key={cell.id}
                        className="px-3 py-4 min-w-0 flex items-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="border-t shrink-0 border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} results
          </span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white"
          >
            {[25, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} per page
              </option>
            ))}
          </select>

          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </Button>

          <span className="px-3 py-1 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

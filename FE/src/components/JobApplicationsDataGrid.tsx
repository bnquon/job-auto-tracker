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
  EllipsisVertical,
  Search,
  Check,
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
          {value.length === 0
            ? "Filter by Status"
            : `${value.length} status${
                value.length === 1 ? "" : "es"
              } selected`}
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

// Action menu component
const ActionMenu = ({
  row,
  onEdit,
  onDelete,
}: {
  row: ReceivedJobApplicationInfo;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors"
        variant="ghost"
      >
        <EllipsisVertical size={18} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border min-w-32">
            <Button
              onClick={() => {
                onEdit(row.id);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-t-lg text-gray-700"
              variant="ghost"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                onDelete(row.id);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-b-lg text-red-500"
              variant="ghost"
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
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
      }),
      columnHelper.accessor("title", {
        header: "Job Title",
        cell: ({ getValue }) => (
          <div className="text-white text-lg truncate">{getValue()}</div>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <StatusChip status={getValue()} />,
        filterFn: (row, columnId, value) => {
          if (!value || value.length === 0) return true;
          return value.includes(row.getValue(columnId));
        },
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
              className="text-cyan-400 underline text-lg font-medium hover:text-cyan-300 truncate block max-w-full"
            >
              {value.length > 20 ? `${value.substring(0, 20)}...` : value}
            </a>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("applied_on", {
        header: "Applied On",
        cell: ({ getValue }) => (
          <div className="text-gray-300 text-lg">
            {new Date(getValue()).toLocaleDateString()}
          </div>
        ),
      }),
      columnHelper.accessor("notes", {
        header: "Notes",
        cell: ({ getValue }) => (
          <div className="text-gray-300 text-lg truncate">
            {getValue() || "-"}
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="w-fit">
            <ActionMenu
              row={row.original}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ),
        enableSorting: false,
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

  if (data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Search and Filters */}
      <div className="py-4 border-b border-gray-700">
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
              placeholder="Search by company name or job title..."
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

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-800 border-b border-gray-700"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 py-4 text-left text-cyan-400 font-semibold text-base tracking-wide"
                    style={{ minWidth: "200px" }}
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <div className="text-lg font-semibold mb-2">
                      No matching applications found
                    </div>
                    <div className="text-sm">
                      Try adjusting your search or filter criteria
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-gray-700 px-4 py-3 flex items-center justify-between">
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

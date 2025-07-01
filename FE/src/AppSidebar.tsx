import { useState } from "react";
import { MoreHorizontal, LogOut, Edit2, Trash2, Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { JobCycleResponse } from "types/JobCycle";
import { useDeleteJobCycle } from "./hooks/useDeleteJobCycle";
import { useAddJobCycle } from "./hooks/useAddJobCycle";
import { useEditJobCycle } from "./hooks/useEditJobCycle";
import { DeleteDialog } from "./components/dialogs/DeleteDialog";
import { toast } from "sonner";
import { api } from "./utils/axios";
import { useAuth } from "./context/Auth";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";

interface AppSidebarProps {
  cycles: JobCycleResponse[];
  activeCycleId: number;
  setActiveCycleId: (id: number) => void;
}

export default function AppSidebar({
  cycles = [],
  activeCycleId,
  setActiveCycleId,
}: AppSidebarProps) {
  const { mutate: deleteJobCycle, isPending: isDeleting } = useDeleteJobCycle();
  const { mutate: addCycle } = useAddJobCycle();
  const { mutate: renameCycle, isPending: isRenaming } = useEditJobCycle();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cycleToDelete, setCycleToDelete] = useState<JobCycleResponse | null>(
    null
  );

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleAddCycle = () => {
    addCycle({ name: "New Cycle" });
  };

  // DELETE CYCLE FUNCTION
  const handleDeleteCycle = () => {
    if (cycles.length < 2) {
      return toast.warning("You must have at least one remaining cycle");
    }
    deleteJobCycle(cycleToDelete!.id);
  };

  // RENAME CYCLE FUNCTIONS
  const startEditing = (cycle: JobCycleResponse) => {
    setEditingId(cycle.id);
    setEditingTitle(cycle.name);
  };

  const saveEdit = (id: number) => {
    if (!editingTitle) {
      return toast.warning("Cycle name cannot be empty");
    }

    renameCycle({
      jobCycleId: id,
      updatedData: { name: editingTitle },
    });
    setEditingId(null);
    setEditingTitle("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleSetActiveCycle = (id: number) => {
    setActiveCycleId(id);
  };

  const handleSignOut = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      <Sidebar className="border-r border-gray-800 2xl:w-80 lg:w-60">
        <SidebarContent className="bg-[#1e1e1e] flex flex-col h-full">
          {/* FIXED HEADER WITH ADD BUTTON */}
          <div className="flex flex-col justify-between px-2 py-1 mb-8 gap-8 flex-shrink-0">
            <div className="flex items-center text-2xl text-white font-semibold py-2 px-1">
              Auto Tracker
            </div>
            <div
              onClick={handleAddCycle}
              className="flex items-center text-xl text-white font-semibold py-2 px-1 hover:bg-gray-800 cursor-pointer"
            >
              <Plus
                size={32}
                className="rounded-full bg-[#00d4ff] p-[2px] mr-4"
              />
              Add New Cycle
            </div>
          </div>

          {/* SCROLLABLE CYCLES SECTION */}
          <SidebarGroup className="flex-1 overflow-hidden">
            <SidebarGroupContent className="h-full overflow-y-auto">
              <SidebarMenu>
                {cycles?.map((cycle: JobCycleResponse) => (
                  <SidebarMenuItem key={cycle.id}>
                    <div className="flex items-center w-full group">
                      {editingId === cycle.id ? (
                        <div className="flex items-center w-full px-2 py-1">
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(cycle.id);
                              if (e.key === "Escape") cancelEdit();
                            }}
                            onBlur={() => saveEdit(cycle.id)}
                            className="h-12 text-sm bg-gray-800 border-gray-700 text-white"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <>
                          <SidebarMenuButton
                            asChild
                            className={`flex-1 justify-start h-12 py-3 cursor-pointer ${
                              cycle.id === activeCycleId
                                ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <button
                              className="w-full text-left h-full flex items-center"
                              onClick={() => handleSetActiveCycle(cycle.id)}
                            >
                              <span className="truncate text-lg">
                                {cycle.name}
                              </span>
                            </button>
                          </SidebarMenuButton>

                          {/* KEBAB MENU */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 group:opacity-100 hover:bg-gray-800 text-[#00d4ff] hover:text-white cursor-pointer"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white border-gray-700"
                            >
                              {/* RENAME OPTION */}
                              <DropdownMenuItem
                                onClick={() => startEditing(cycle)}
                                className="cursor-pointer"
                              >
                                <Edit2 className="mr-2 h-4 w-4" />
                                Rename
                              </DropdownMenuItem>

                              {/* DELETE OPTION */}
                              <DropdownMenuItem
                                onClick={() => {
                                  setCycleToDelete(cycle);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-red-400 cursor-pointer hover:!text-red-400"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </>
                      )}
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER WITH SIGN OUT */}
        <SidebarFooter className="bg-[#1e1e1e] border-t border-gray-800 py-4 flex-shrink-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                className="text-white flex items-center px-1 hover:bg-gray-800 hover:text-white cursor-pointer text-xl py-3"
                onClick={handleSignOut}
              >
                <LogOut size={24} className="mr-2 text-[#00d4ff]" />
                <span>Sign Out</span>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {deleteDialogOpen && (
        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteCycle}
          title="Delete Cycle"
          description="Are you sure you want to delete this cycle? It will delete all jobs tracked in the cycle as well."
        />
      )}
      
      {isDeleting && (
        <Loading loadingText="Deleting job cycle"/>
      )}

      {isRenaming && (
        <Loading loadingText="Renaming job cycle"/>
      )}
    </>
  );
}

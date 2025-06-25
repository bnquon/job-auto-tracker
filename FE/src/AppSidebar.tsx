/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function AppSidebar() {
  // DUMMY DATA - Replace with your actual cycles state/hook
  const [cycles, setCycles] = useState([
    { id: 1, title: "Software Engineering 2025", active: true },
    { id: 2, title: "Product Manager Roles", active: false },
    { id: 3, title: "Frontend Developer", active: false },
  ]);

  // LOCAL EDITING STATE - Keep this for inline editing functionality
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // ADD NEW CYCLE FUNCTION
  const addNewCycle = () => {
    // TODO: Replace with your addCycle hook/function
    // Example: const { addCycle } = useCycles()
    // addCycle({ title: "New Cycle" })

    const newCycle = {
      id: Date.now(), // Replace with proper ID generation
      title: "New Cycle",
      active: false,
    };
    setCycles([...cycles, newCycle]);

    // Start editing the new cycle immediately
    setEditingId(newCycle.id);
    setEditingTitle(newCycle.title);
  };

  // DELETE CYCLE FUNCTION
  const deleteCycle = (id: number) => {
    // TODO: Replace with your deleteCycle hook/function
    // Example: const { deleteCycle } = useCycles()
    // deleteCycle(id)

    setCycles(cycles.filter((cycle) => cycle.id !== id));
  };

  // RENAME CYCLE FUNCTIONS
  const startEditing = (cycle: { id: any; title: any; active?: boolean }) => {
    setEditingId(cycle.id);
    setEditingTitle(cycle.title);
  };

  const saveEdit = (id: number) => {
    // TODO: Replace with your renameCycle hook/function
    // Example: const { renameCycle } = useCycles()
    // renameCycle(id, editingTitle)

    setCycles(
      cycles.map((cycle) =>
        cycle.id === id ? { ...cycle, title: editingTitle } : cycle
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  // SET ACTIVE CYCLE FUNCTION
  const setActiveCycle = (id: number) => {
    // TODO: Replace with your setActiveCycle hook/function
    // Example: const { setActiveCycle } = useCycles()
    // setActiveCycle(id)

    setCycles(cycles.map((cycle) => ({ ...cycle, active: cycle.id === id })));
  };

  // SIGN OUT FUNCTION
  const handleSignOut = () => {
    // TODO: Replace with your signOut hook/function
    // Example: const { signOut } = useAuth()
    // signOut()

    console.log("Sign out clicked");
  };

  return (
    <Sidebar className="border-r border-gray-800 w-80">
      <SidebarContent className="bg-[#1e1e1e]">
        <SidebarGroup>
          {/* HEADER WITH ADD BUTTON */}
          <div className="flex flex-col justify-between px-2 py-1 mb-8 gap-8 relative">
            <div className="flex items-center text-2xl text-white font-semibold">
              Auto Tracker
            </div>
            <div
              onClick={addNewCycle}
              className="flex items-center text-xl text-white font-semibold py-2 px-1 hover:bg-gray-800 cursor-pointer"
            >
              <Plus
                size={32}
                className="rounded-full bg-[#00d4ff] p-[2px] mr-4"
              />
              Add New Cycle
            </div>
          </div>

          {/* CYCLES LIST */}
          <SidebarGroupContent>
            <SidebarMenu>
              {cycles.map((cycle) => (
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
                            cycle.active
                              ? "bg-cyan-500/10 text-cyan-400 border-r-2 border-cyan-400"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          <button
                            className="w-full text-left h-full flex items-center"
                            onClick={() => setActiveCycle(cycle.id)}
                          >
                            <span className="truncate text-lg">
                              {cycle.title}
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
                            className="bg-gray-800 border-gray-700"
                          >
                            {/* RENAME OPTION */}
                            <DropdownMenuItem
                              onClick={() => startEditing(cycle)}
                              className="text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              <Edit2 className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>

                            {/* DELETE OPTION */}
                            <DropdownMenuItem
                              onClick={() => deleteCycle(cycle.id)}
                              className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
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
      <SidebarFooter className="bg-[#1e1e1e] border-t border-gray-800 py-4">
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
  );
}

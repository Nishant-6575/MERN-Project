import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <User className="h-5 w-5">
        </User>
      </div>
    </header>
  )
}

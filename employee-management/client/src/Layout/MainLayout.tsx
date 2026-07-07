import AppSidebar from "@/common/AppSidebar";
import Header from "@/common/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="flex-1 w-full min-h-screen flex flex-col">

                <Header />
                <div className="p-6 flex-1">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}

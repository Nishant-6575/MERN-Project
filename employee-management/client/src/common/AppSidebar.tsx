import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import navigationItem from "@/constants/Navigation";
import { NavLink } from "react-router-dom";


export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                Employee
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Hello
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                navigationItem.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <SidebarMenuItem key={item.path}>
                                            <SidebarMenuButton>
                                                <NavLink to={item.path} className="flex items-center rounded-2xl p-1 w-100">
                                                    <Icon className="size-4" />
                                                    <span className="mx-2">{item.title}</span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Nishant Patel
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Administrator
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

"use client";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
export default function DashboardPage({ children }: { children: React.ReactNode }) {

  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full min-h-svh flex flex-col">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </>

  );
}
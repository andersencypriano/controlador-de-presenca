"use client";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
export default function DashboardPage({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-full">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full h-svh grid grid-rows-[30px_1fr]">
            <div className="flex items-center px-4">
              <SidebarTrigger />
            </div>
            <div className="min-h-0 overflow-y-auto w-full flex items-center justify-center p-4">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </div>

  );
}
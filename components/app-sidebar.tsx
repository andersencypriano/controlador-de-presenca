"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UsersIcon } from "lucide-react"
import { signOut } from "@/src/lib/auth-client"
import { toast } from "sonner"
import { Button } from "./ui/button"

// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: (
  //       <GalleryVerticalEndIcon
  //       />
  //     ),
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: (
  //       <AudioLinesIcon
  //       />
  //     ),
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: (
  //       <TerminalIcon
  //       />
  //     ),
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Gerenciar alunos",
      url: "#",
      icon: (
        <UsersIcon />
      ),
      isActive: true,
      items: [
        {
          title: "Cadastrar aluno",
          url: "/dashboard/alunos/cadastro",
        },
        {
          title: "Lista de presença",
          url: "/dashboard/alunos/lista",
        },
        {
          title: "Formulário de presença",
          url: "/dashboard/alunos/presenca",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <Button onClick={async () => {
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success("Deslogado com sucesso!", {
                  description: "Você saiu do sistema.",
                  action: {
                    label: "Fechar",
                    onClick: () => toast.dismiss(),
                  },
                  position: "top-center"
                });
                router.push("/sign-in");
              }
            }
          });
        }}>
          Sair
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

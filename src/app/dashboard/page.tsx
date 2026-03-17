"use client";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "../../../src/lib/auth-client";
import { useEffect } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);
  if (isPending) return <p className="text-center mt-8 text-white">Carregando...</p>;
  if (!session?.user) return <p className="text-center mt-8 text-white">Redirecionando...</p>;
  const { user } = session;

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="text-sm font-semibold">Sistema de Presença</div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard">Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/alunos/cadastro">Cadastrar aluno</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/alunos/lista">Lista de presença</Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/dashboard/alunos/presenca">Formulário de presença</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <button
            onClick={() => signOut()}
            className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
          >
            Sair
          </button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <div className="text-sm text-muted-foreground">Bem-vindo, {user.name || "Usuário"}</div>
        </header>

        <main className="p-6 text-white">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="mt-2 text-black">Email: {user.email}</p>
        </main>
      </SidebarInset>
    </SidebarProvider>

  );
}
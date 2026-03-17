import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import ListaPresencaClient from "./ListaPresencaClient";

export default async function ListaPresenca() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <ListaPresencaClient />;
}
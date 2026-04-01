"use client";
import { useSession } from "../../../src/lib/auth-client";


export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) return <p className="text-center mt-8 text-white">Carregando...</p>;

  const user = session?.user;

  return (
    <>
      <main className="w-full">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="mt-2 text-black">Email: {user?.email}</p>
      </main>
    </>
  );
}
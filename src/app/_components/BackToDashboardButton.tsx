import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BackToDashboardButton() {
  return (
    <Button asChild variant="outline" size="sm">
      <Link href="/dashboard">Voltar</Link>
    </Button>
  );
}


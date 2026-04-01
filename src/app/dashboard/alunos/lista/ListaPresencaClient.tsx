"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { localISODate, formatHora } from "@/utils/utils";
import BackToDashboardButton from "@/src/app/_components/BackToDashboardButton";
import { toast } from "sonner";

type PresencaComAluno = {
  id: string;
  data: string;
  presente: boolean;
  alunoId: string;
  aluno: {
    id: string;
    nome: string;
    cpf: string;
  };
};



export default function ListaPresencaClient() {
  const [itens, setItens] = React.useState<PresencaComAluno[] | null>(null);
  const [dataFiltro, setDataFiltro] = React.useState(() => localISODate(new Date()));

  React.useEffect(() => {
    let ativo = true;

    (async () => {
      try {
        setItens(null);
        const qs = new URLSearchParams({ data: dataFiltro });
        const res = await fetch(`/api/alunos/presenca?${qs.toString()}`, { method: "GET" });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ?? "Erro ao buscar lista de presença.");
        }
        const data = (await res.json()) as PresencaComAluno[];
        if (ativo) setItens(data);
      } catch (e) {
        if (!ativo) return;
        setItens([]);
        const errorMessage = e instanceof Error ? e.message : "Erro ao buscar lista de presença.";
        toast.error(errorMessage, {
          description: errorMessage,
          action: {
            label: "Fechar",
            onClick: () => toast.dismiss(),
          },
          position: "top-center"
        });
      }
    })();

    return () => {
      ativo = false;
    };
  }, [dataFiltro]);

  return (
    <div className="w-full min-h-svh flex flex-col">
      <div className="mb-4">
        <BackToDashboardButton />
      </div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium">Filtrar por data</span>
          <input
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:w-[220px]"
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
          />
        </div>
      </div>

      <Table className="table-fixed">
        <TableCaption>
          {itens === null
            ? "Carregando lista de presença..."
            : `Lista de Presença (${dataFiltro.split("-").reverse().join("/")})`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">Nome</TableHead>
            <TableHead className="hidden w-[130px] sm:table-cell">CPF</TableHead>
            <TableHead className="w-[90px]">Entrada</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itens?.length ? (
            itens.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="w-auto truncate">{p.aluno?.nome ?? "-"}</TableCell>
                <TableCell className="hidden w-[130px] sm:table-cell">{p.aluno?.cpf ?? "-"}</TableCell>
                <TableCell className="w-[90px]">{formatHora(p.data)}</TableCell>
              </TableRow>
            ))
          ) : itens !== null ? (
            <TableRow>
              <TableCell colSpan={3}>Nenhum aluno com presença hoje.</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}


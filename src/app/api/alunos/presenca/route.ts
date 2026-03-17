import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

function getRangeFromQuery(dateParam: string | null) {
  if (!dateParam) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start, end };
  }

  // Espera AAAA-MM-DD e considera a data no fuso local do servidor
  const start = new Date(`${dateParam}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const range = getRangeFromQuery(searchParams.get("data"));
    if (!range) {
      return NextResponse.json(
        { error: "Parâmetro 'data' inválido. Use o formato AAAA-MM-DD." },
        { status: 400 }
      );
    }

    const presencas = await prisma.presenca.findMany({
      where: {
        presente: true,
        data: {
          gte: range.start,
          lt: range.end,
        },
      },
      include: {
        aluno: true,
      },
      orderBy: {
        data: "desc",
      },
      distinct: ["alunoId"],
    });

    return NextResponse.json(presencas, { status: 200 });
  } catch (error) {
    console.error("[API PRESENCA GET]", error);
    return NextResponse.json(
      { error: "Erro ao buscar lista de presença." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const { cpf } = await request.json();

    if (!cpf) {
      return NextResponse.json(
        { error: "CPF é obrigatório." },
        { status: 400 }
      );
    }

    const aluno = await prisma.aluno.findUnique({
      where: { cpf },
    });

    if (!aluno) {
      return NextResponse.json(
        { error: "Aluno não encontrado para o CPF informado." },
        { status: 404 }
      );
    }

    const presenca = await prisma.presenca.create({
      data: {
        alunoId: aluno.id,
        data: new Date(),
        presente: true,
      },
    });

    return NextResponse.json(presenca, { status: 201 });
  } catch (error) {
    console.error("[API PRESENCA POST]", error);
    return NextResponse.json(
      { error: "Erro ao registrar presença." },
      { status: 500 }
    );
  }
}
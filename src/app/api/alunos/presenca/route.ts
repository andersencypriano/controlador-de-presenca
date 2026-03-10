import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
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
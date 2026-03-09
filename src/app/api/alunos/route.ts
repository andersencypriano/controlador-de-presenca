import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function POST(request: Request) {
  try {
    const { nome, telefone, cpf } = await request.json();

    if (!nome || !telefone || !cpf) {
      return NextResponse.json(
        { error: "Campos obrigatórios não informados." },
        { status: 400 }
      );
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        telefone,
        cpf,
      },
    });

    return NextResponse.json(aluno, { status: 201 });
  } catch (error) {
    console.error("[API ALUNOS POST]", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar aluno." },
      { status: 500 }
    );
  }
}
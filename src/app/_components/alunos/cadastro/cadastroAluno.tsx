"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  nome: string;
  telefone: string;
  cpf: string;
};

export default function CadastroAlunos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => null);
        alert(erro?.error ?? "Erro ao cadastrar aluno.");
        return;
      }

      alert("Aluno cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro inesperado ao cadastrar aluno.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <input
          className="w-full rounded-md border border-neutral-700 px-3 py-2"
          placeholder="Nome"
          {...register("nome", { required: true })}
        />
        <input
          className="w-full rounded-md border border-neutral-700 px-3 py-2"
          placeholder="Telefone"
          {...register("telefone", { required: true })}
        />
        <input
          className="w-full rounded-md border border-neutral-700 px-3 py-2"
          placeholder="CPF"
          {...register("cpf", { required: true })}
        />
      </div>
      <button
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        type="submit"
      >
        Cadastrar
      </button>
    </form>
  );
}


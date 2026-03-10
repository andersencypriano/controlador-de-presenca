"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  cpf: string;
};

export default function PresencaAluno() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("/api/alunos/presenca", {
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

      alert("Presença registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
      alert("Erro inesperado ao registrar presença.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-auto">
      <div className="grid grid-cols-3 gap-4">
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
        Marcar Presença
      </button>
    </form>
  );
}


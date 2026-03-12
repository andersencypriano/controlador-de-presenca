"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";


const formSchemaCadastroAlunos = z.object({
  nome: z
    .string()
    .min(1, "E-mail é obrigatório"),
  telefone: z
    .string()
    .min(11, "Sua senha precisa ter no minimo 6 caracteres"),
  cpf: z
    .string()
    .min(11, "Seu CPF precisa ter no minimo 11 caracteres"),
})

export default function CadastroAlunos() {

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchemaCadastroAlunos>>({
    resolver: zodResolver(formSchemaCadastroAlunos),
    defaultValues: {
      nome: "",
      telefone: "",
      cpf: "",
    },
  })



  async function onSubmit(data: z.infer<typeof formSchemaCadastroAlunos>) {
    try {
      const response = await fetch("/api/alunos/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => null);
        setError(erro?.error ?? "Erro ao cadastrar aluno.");
        return;
      }

      alert("Aluno cadastrado com sucesso!");
      form.reset();
      router.push("/aluno");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro inesperado ao cadastrar aluno.");
    }

  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Cadastro de aluno</CardTitle>
        <CardDescription>
          Cadastro de aluno.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signup-aluno" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="nome"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-nome">
                    Nome
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-nome"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nome"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="telefone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-telefone">
                    Telefone
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-telefone"
                    aria-invalid={fieldState.invalid}
                    placeholder="Telefone"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cpf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-cpf">
                    CPF
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-cpf"
                    aria-invalid={fieldState.invalid}
                    placeholder="CPF"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>

        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-signup-aluno" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <>Entrando <Spinner /></> : "Entrar"}
          </Button>

        </Field>

      </CardFooter>

      <span className="text-center mb-4">
        {error && (
          <FieldError errors={[{ message: error }]} />
        )}
      </span>
    </Card>
  );
}


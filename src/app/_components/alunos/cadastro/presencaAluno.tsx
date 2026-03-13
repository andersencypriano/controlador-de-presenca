"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as z from "zod"

const formSchemaPresencaAlunos = z.object({
  cpf: z
    .string()
    .min(11, "O CPF nome é obrigatório"),
})

export default function PresencaAluno() {
  const form = useForm<z.infer<typeof formSchemaPresencaAlunos>>({
    resolver: zodResolver(formSchemaPresencaAlunos),
    defaultValues: {
      cpf: ""
    }
  });

  async function onSubmit(data: z.infer<typeof formSchemaPresencaAlunos>) {
    console.log('click')
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
        form.reset();
        return;
      }

      alert("Presença registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
      alert("Erro inesperado ao registrar presença.");
    }
  };

  return (

    <>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Confirmar presença</CardTitle>
          <CardDescription>
            Para confirmar presença, insira seu cpf no formulário abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-presenca" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="form-presenca" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <>Registrando presença <Spinner /></> : "Registrar presença"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}


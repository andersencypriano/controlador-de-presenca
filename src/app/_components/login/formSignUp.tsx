"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signUp } from "@/src/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"


const formSchemaSignUp = z.object({
  nome: z
    .string()
    .min(2, "Preencha o campo nome"),
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, "E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Sua senha precisa ter no minimo 6 caracteres")
    .max(8, "Sua senha precisa ter no maximo 8 caracteres"),

})

export default function FormSignUp() {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
    defaultValues: {
      nome: "",
      email: "",
      password: "",
    },
  })


  async function handleSubmit(data: z.infer<typeof formSchemaSignUp>) {

    const res = await signUp.email({
      name: data.nome,
      email: data.email,
      password: data.password,
    });


    if (res.error) {
      toast.error(res.error.message || "Erro ao cadastrar.", {
        description: res.error.message || "Erro ao cadastrar.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
        position: "top-center"
      });
    } else {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Cadastro realizado com sucesso!",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
        position: "top-center"
      });
      router.push("/dashboard");
    }
  }


  return (
    <>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Cadastrar</CardTitle>
          <CardDescription>
            Preencha os campos para se cadastrar.
          </CardDescription>
          <CardContent>
            <form id="form-signup" onSubmit={form.handleSubmit(handleSubmit)}>
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
                        placeholder="Insiria o nome"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="input-e-mail">
                        Senha
                      </FieldLabel>
                      <Input
                        {...field}
                        id="input-e-mail"
                        aria-invalid={fieldState.invalid}
                        placeholder="Insiria o e-mail"
                        autoComplete="off"
                        type="e-mail"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="input-password">
                        Senha
                      </FieldLabel>
                      <Input
                        {...field}
                        id="input-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Insiria o password"
                        autoComplete="off"
                        type="password"
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
              <Button type="submit" form="form-signup" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <>Entrando <Spinner /></> : "Entrar"}
              </Button>

            </Field>

          </CardFooter>
        </CardHeader>
      </Card>
    </>
  )
}
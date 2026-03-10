"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

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
import { signIn } from "@/src/lib/auth-client"
import { Spinner } from "@/components/ui/spinner"


const formSchemaSignIn = z.object({
  email: z
    .string()
    .email("E-mail inválido")
    .min(1, "E-mail é obrigatório"),
  password: z
    .string()
    .min(6, "Sua senha precisa ter no minimo 6 caracteres")
    .max(8, "Sua senha precisa ter no maximo 8 caracteres"),
})


export function FormSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchemaSignIn>) {
    const res = await signIn.email({
      email: data.email,
      password: data.password,
    });
    if (res.error) {
      setError(res.error.message || "Something went wrong.")
    } else {
      router.push("/dashboard");
    }

  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Fazer login</CardTitle>
        <CardDescription>
          Insira seu e-mail e senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="input-email">
                    E-mail
                  </FieldLabel>
                  <Input
                    {...field}
                    id="input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Insiria o e-mail"
                    autoComplete="off"
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
                    placeholder="Insiria a senha"
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
          <Button type="submit" form="form-signin" className="w-full cursor-pointer" disabled={form.formState.isSubmitting}>
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
  )
}

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type TFormLogin = {
  email: string;
  password: string;
};


export default function Home() {
  const router = useRouter();
  

  const form = useForm<TFormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });


  return (
    <>
      <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Preencha com e-mail e senha.</CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}

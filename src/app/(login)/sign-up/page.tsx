"use client";
import FormSignUp from '../../_components/login/formSignUp'

export default function SignUpPage() {
  // const router = useRouter();

  // async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);

  //   const res = await signUp.email({
  //     name: formData.get("name") as string,
  //     email: formData.get("email") as string,
  //     password: formData.get("password") as string,
  //   });


  //   if (res.error) {
  //     toast.error(res.error.message || "Erro ao cadastrar.", {
  //       description: res.error.message || "Erro ao cadastrar.",
  //       action: {
  //         label: "Fechar",
  //         onClick: () => toast.dismiss(),
  //       },
  //       position: "top-center"
  //     });
  //   } else {
  //     toast.success("Cadastro realizado com sucesso!", {
  //       description: "Cadastro realizado com sucesso!",
  //       action: {
  //         label: "Fechar",
  //         onClick: () => toast.dismiss(),
  //       },
  //       position: "top-center"
  //     });
  //     router.push("/dashboard");
  //   }
  // }

  return (
    <>
      <main className="max-w-md mx-auto p-6 space-y-4 text-white">
        <h1 className="text-2xl font-bold text-black">Cadastrar Administrador</h1>
        <FormSignUp/>
        {/* <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Nome Completo"
          required
          className="w-full rounded-md text-black border border-neutral-700 px-3 py-2"
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          required
          className="w-full rounded-md text-black border border-neutral-700 px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full rounded-md text-black border border-neutral-700 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full text-white bg-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
        >

          Cadastrar
        </button>
      </form> */}
      </main>
    </>
  );
}
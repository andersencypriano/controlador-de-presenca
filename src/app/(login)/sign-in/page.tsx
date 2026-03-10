import { FormSignIn } from "../../_components/login/formLogin";

export default function SignInPage() {
  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4">
        <FormSignIn />
    </main>
  );
}
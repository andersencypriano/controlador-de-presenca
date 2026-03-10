
import "./globals.css";

import { FormSignIn } from "./_components/formTeste";

export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <FormSignIn />
        </div>
      </main>
    </>
  );
}

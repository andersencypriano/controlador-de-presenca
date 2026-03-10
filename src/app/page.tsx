
import { FormSignIn } from "./_components/login/formLogin";
import "./globals.css";



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

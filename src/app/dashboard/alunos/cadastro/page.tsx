import CadastroAlunos from "@/src/app/_components/alunos/cadastro/cadastroAluno";
import type { Metadata } from 'next';
import BackToDashboardButton from "@/src/app/_components/BackToDashboardButton";

export const metadata: Metadata = {
    title: 'Cadastro de Usuários',
    description: 'Cadastro de Usuários',
};

export default function PresencaPage() {
    return (
        <div className="w-full min-h-svh flex flex-col">
            <div className="p-4">
                <BackToDashboardButton />
            </div>
            <div className="flex-1 flex items-center justify-center flex-col">
                <CadastroAlunos />
            </div>
        </div>
    )
}
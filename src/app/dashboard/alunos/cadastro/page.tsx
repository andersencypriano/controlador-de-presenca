import CadastroAlunos from "@/src/app/_components/alunos/cadastro/cadastroAluno";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cadastro de Usuários',
    description: 'Cadastro de Usuários',
};

export default function PresencaPage() {
    return (
        <div className="w-full flex flex-col">
            <div className="flex-1 flex items-center justify-center flex-col">
                <CadastroAlunos />
            </div>
        </div>
    )
}
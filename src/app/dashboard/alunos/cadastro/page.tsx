import CadastroAlunos from "@/src/app/_components/alunos/cadastro/cadastroAluno";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastro de Usuários',
  description: 'Cadastro de Usuários',
};

export default function PresencaPage() {
    return (
        <div>
            <h1>Cadastrar Usuário</h1>
            <CadastroAlunos />
        </div>
    )
}
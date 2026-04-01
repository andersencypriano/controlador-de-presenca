import PresencaAluno from "@/src/app/_components/alunos/cadastro/presencaAluno";

export default function PresencaPage() {
    return (
        <div className="w-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center">
                <PresencaAluno />
            </div>
        </div>
    )
}
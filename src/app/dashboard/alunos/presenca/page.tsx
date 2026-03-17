import PresencaAluno from "@/src/app/_components/alunos/cadastro/presencaAluno";
import BackToDashboardButton from "@/src/app/_components/BackToDashboardButton";

export default function PresencaPage() {
    return (
        <div className="w-full min-h-svh flex flex-col">
            <div className="p-4">
                <BackToDashboardButton />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
                <PresencaAluno />
            </div>
        </div>
    )
}
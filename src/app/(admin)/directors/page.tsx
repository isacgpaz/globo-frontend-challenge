import { CreateDirectorDialog } from "./create-director-dialog";
import { DirectorsList } from "./directors-list";

export default function Directors() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="lg:max-w-5xl mx-auto">
        <header className="flex justify-between items-center gap-4 mb-6">
          <h2 className="font-medium text-xl">
            Diretores
          </h2>

          <CreateDirectorDialog />
        </header>

        <DirectorsList />
      </div>
    </div>
  )
}
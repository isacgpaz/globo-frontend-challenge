import { CreateMediaProvider } from "@/contexts/create-media-context";
import { CreateMediaDialog } from "./create-media-dialog";
import { MediasList } from "./medias-list";

export default function Medias() {
  return (
    <CreateMediaProvider>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <header className="flex justify-between items-center gap-4 mb-6">
          <h2 className="font-medium text-xl">
            Mídias
          </h2>

          <CreateMediaDialog />
        </header>

        <MediasList />
      </div>
    </CreateMediaProvider>
  )
}
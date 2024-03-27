import { ArtistsList } from "./artists-list";
import { CreateArtistDialog } from "./create-artist-dialog";

export default function Artists() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="flex justify-between items-center gap-4 mb-6">
        <h2 className="font-medium text-xl">
          Diretores
        </h2>

        <CreateArtistDialog />
      </header>

      <ArtistsList />
    </div>
  )
}
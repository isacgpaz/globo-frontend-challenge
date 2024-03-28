'use client'

import { useIsClient } from "@uidotdev/usehooks";
import { ArtistsList } from "./artists-list";
import { CreateArtistDialog } from "./create-artist-dialog";

export default function Artists() {
  const isClient = useIsClient()

  if (isClient === false) {
    return null
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="lg:max-w-5xl mx-auto">
        <header className="flex justify-between items-center gap-4 mb-6">
          <h2 className="font-medium text-xl">
            Artistas
          </h2>

          <CreateArtistDialog />
        </header>

        <ArtistsList />
      </div>
    </div>
  )
}
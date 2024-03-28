'use client'

import { Button } from "@/components/ui/button";
import { CreateMediaProvider, useCreateMediaContext } from "@/contexts/create-media-context";
import { useIsClient } from "@uidotdev/usehooks";
import { Clapperboard } from "lucide-react";
import { useState } from "react";
import { CreateMediaDialog } from "./create-media-dialog";
import { MediasList } from "./medias-list";

export default function Medias() {
  const isClient = useIsClient()

  if (isClient === false) {
    return null
  }

  return (
    <CreateMediaProvider>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="lg:max-w-5xl mx-auto">
          <header className="flex justify-between items-center gap-4 mb-6">
            <h2 className="font-medium text-xl">
              Mídias
            </h2>

            <CreateMedia />
          </header>

          <MediasList />
        </div>
      </div>
    </CreateMediaProvider>
  )
}

function CreateMedia() {
  const [open, setOpen] = useState(false);
  const { setMedia } = useCreateMediaContext()

  return (
    <>
      <Button size='sm' onClick={() => {
        setMedia(undefined)
        setOpen(true)
      }}>
        <Clapperboard className="mr-2 w-4 h-4" />
        Novo
      </Button>

      <CreateMediaDialog
        open={open}
        setOpen={setOpen}
        mode="create"
      />
    </>
  )
}
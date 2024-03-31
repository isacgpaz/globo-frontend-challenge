'use client'

import { MediasList } from "@/components/medias-list";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth-context";
import { CreateMediaProvider, useCreateMediaContext } from "@/contexts/create-media-context";
import { AccessLevel } from "@/types/user";
import { useIsClient } from "@uidotdev/usehooks";
import { Clapperboard } from "lucide-react";
import { Fragment, useState } from "react";
import { AdminMediasList } from "./admin-medias-list";
import { MediaFormDialog } from "./media-form-dialog";

export default function Medias() {
  const { user } = useAuthContext()
  const isClient = useIsClient()

  if (isClient === false) {
    return null
  }

  const isAdmin = user?.accessLevel === AccessLevel.ADMIN
  const Wrapper = isAdmin ? CreateMediaProvider : Fragment

  return (
    <Wrapper>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="lg:max-w-5xl mx-auto">
          <header className="flex justify-between items-center gap-4 mb-6">
            <h2 className="font-medium text-xl">
              Mídias
            </h2>

            {isAdmin && <CreateMedia />}
          </header>

          {isAdmin ? <AdminMediasList /> : <MediasList />}
        </div>
      </div>
    </Wrapper>
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

      <MediaFormDialog
        open={open}
        setOpen={setOpen}
        mode="create"
      />
    </>
  )
}
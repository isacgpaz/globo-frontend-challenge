"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useCreateMediaContext } from "@/contexts/create-media-context";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { CreateMediaForm } from "./create-media-form";
import { CreateSeasonDialog } from "./create-season-dialog";

export function CreateMediaDialog({
  open,
  setOpen,
  mode
}: {
  open: boolean,
  setOpen: (open: boolean) => void,
  mode?: 'update' | 'create'
}) {
  const { setMedia, media } = useCreateMediaContext()

  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [createSeasonDialogOpen, setCreateSeasonDialogOpen] = useState(false)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0)

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={(open) => {
          if (!open) {
            setMedia(undefined)
          }

          setOpen(open)
        }}>
          <DialogContent className="max-w-sm">
            <DialogHeader className="justify-center items-center space-y-0">
              <DialogTitle className="text-2xl">
                {mode === 'create' ? 'Criar nova' : 'Editar'} mídia
              </DialogTitle>
            </DialogHeader>

            <CreateMediaForm
              isDesktop
              setOpen={setOpen}
              setCreateSeasonDialogOpen={setCreateSeasonDialogOpen}
              setSelectedSeasonIndex={setSelectedSeasonIndex}
              mode={mode}
            />
          </DialogContent>
        </Dialog>

        <CreateSeasonDialog
          open={createSeasonDialogOpen}
          setOpen={(open) => {
            setOpen(!open)
            setCreateSeasonDialogOpen(open)
          }}
          seasonIndex={selectedSeasonIndex}
          isDesktop
        />
      </>
    )
  }

  return (
    <>
      <Drawer open={open} onOpenChange={(open) => {
        if (!open) {
          setMedia(undefined)
        }

        setOpen(open)
      }}>
        <DrawerContent showIsland={false}>
          <DrawerHeader className="mt-2 gap-0">
            <DrawerTitle className="text-2xl">
              {mode === 'create' ? 'Criar nova' : 'Editar'} mídia
            </DrawerTitle>
          </DrawerHeader>

          <CreateMediaForm
            className="px-6"
            isDesktop={false}
            setOpen={setOpen}
            setCreateSeasonDialogOpen={setCreateSeasonDialogOpen}
            setSelectedSeasonIndex={setSelectedSeasonIndex}
            mode={mode}
          />
        </DrawerContent>
      </Drawer>

      <CreateSeasonDialog
        open={createSeasonDialogOpen}
        setOpen={(open) => {
          setOpen(!open)
          setCreateSeasonDialogOpen(open)
        }}
        seasonIndex={selectedSeasonIndex}
        isDesktop={false}
      />
    </>
  )
}
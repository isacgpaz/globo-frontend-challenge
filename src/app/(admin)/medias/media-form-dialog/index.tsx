"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import { CreateMediaForm } from "./media-form";
import { SeasonFormDialog } from "./season-form-dialog";

export function MediaFormDialog({
  open,
  setOpen,
  mode
}: {
  open: boolean,
  setOpen: (open: boolean) => void,
  mode?: 'update' | 'create'
}) {
  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [seasonFormDialogOpen, setSeasonFormDialogOpen] = useState(false)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0)

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader className="justify-center items-center space-y-0">
              <DialogTitle className="text-2xl">
                {mode === 'create' ? 'Criar nova' : 'Editar'} mídia
              </DialogTitle>
            </DialogHeader>

            <CreateMediaForm
              isDesktop
              setOpen={setOpen}
              setSeasonFormDialogOpen={setSeasonFormDialogOpen}
              setSelectedSeasonIndex={setSelectedSeasonIndex}
              mode={mode}
            />
          </DialogContent>
        </Dialog>

        <SeasonFormDialog
          open={seasonFormDialogOpen}
          setOpen={(open) => {
            setOpen(!open)
            setSeasonFormDialogOpen(open)
          }}
          seasonIndex={selectedSeasonIndex}
          isDesktop
        />
      </>
    )
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
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
            setSeasonFormDialogOpen={setSeasonFormDialogOpen}
            setSelectedSeasonIndex={setSelectedSeasonIndex}
            mode={mode}
          />
        </DrawerContent>
      </Drawer>

      <SeasonFormDialog
        open={seasonFormDialogOpen}
        setOpen={(open) => {
          setOpen(!open)
          setSeasonFormDialogOpen(open)
        }}
        seasonIndex={selectedSeasonIndex}
        isDesktop={false}
      />
    </>
  )
}
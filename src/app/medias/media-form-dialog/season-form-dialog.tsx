"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { SeasonForm } from "./season-form";

export function SeasonFormDialog({
  open,
  setOpen,
  seasonIndex,
  isDesktop
}: {
  open: boolean,
  setOpen: (open: boolean) => void,
  seasonIndex: number,
  isDesktop: boolean
}) {
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="justify-center items-center space-y-0">
            <DialogTitle className="text-2xl">Temporada {seasonIndex + 1}</DialogTitle>
          </DialogHeader>

          <SeasonForm
            isDesktop
            setOpen={setOpen}
            seasonIndex={seasonIndex}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent showIsland={false}>
        <DrawerHeader className="mt-2 gap-0">
          <DrawerTitle className="text-2xl">Temporada {seasonIndex + 1}</DrawerTitle>
        </DrawerHeader>

        <SeasonForm
          className="px-6"
          isDesktop={false}
          setOpen={setOpen}
          seasonIndex={seasonIndex}
        />
      </DrawerContent>
    </Drawer>
  )
}
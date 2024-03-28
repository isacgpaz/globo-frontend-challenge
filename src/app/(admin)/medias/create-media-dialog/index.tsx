"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsClient, useMediaQuery } from "@uidotdev/usehooks";
import { Clapperboard } from "lucide-react";
import { useState } from "react";
import { CreateMediaForm } from "./create-media-form";
import { CreateSeasonDialog } from "./create-season-dialog";

export function CreateMediaDialog() {
  const isClient = useIsClient()

  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [open, setOpen] = useState(false);
  const [createSeasonDialogOpen, setCreateSeasonDialogOpen] = useState(false)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState<number>(0)

  if (isClient === false) {
    return null
  }

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size='sm'>
              <Clapperboard className="mr-2 w-4 h-4" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader className="justify-center items-center space-y-0">
              <DialogTitle className="text-2xl">Criar nova mídia</DialogTitle>
            </DialogHeader>

            <CreateMediaForm
              isDesktop
              setOpen={setOpen}
              setCreateSeasonDialogOpen={setCreateSeasonDialogOpen}
              setSelectedSeasonIndex={setSelectedSeasonIndex}
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
        />
      </>
    )
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size='sm'>
            <Clapperboard className="mr-2 w-4 h-4" />
            Novo
          </Button>
        </DrawerTrigger>
        <DrawerContent showIsland={false}>
          <DrawerHeader className="mt-2 gap-0">
            <DrawerTitle className="text-2xl">Criar nova mídia</DrawerTitle>
          </DrawerHeader>

          <CreateMediaForm
            className="px-6"
            isDesktop={false}
            setOpen={setOpen}
            setCreateSeasonDialogOpen={setCreateSeasonDialogOpen}
            setSelectedSeasonIndex={setSelectedSeasonIndex}
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
      />
    </>
  )
}
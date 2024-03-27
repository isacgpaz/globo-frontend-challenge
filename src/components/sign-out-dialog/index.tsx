"use client"

import { useAuthContext } from "@/contexts/auth-context";
import { useMediaQuery } from "@uidotdev/usehooks";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export function SignOutDialog() {
  const { signOut } = useAuthContext()
  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            size='sm'
            className="md:mr-0 transition-all hover:scale-95 text-white hover:no-underline"
            variant='link'
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Ainda há muitos filmes para conhecer e séries para avaliar!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button onClick={signOut} variant='secondary'>
              Sim, sair
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          size='sm'
          className="md:mr-0 transition-all hover:scale-95 text-white hover:no-underline"
          variant='link'
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </DrawerTrigger>

      <DrawerContent showIsland={false}>
        <DrawerHeader className="mt-2 gap-0">
          <DrawerTitle className="text-2xl">Deseja realmente sair?</DrawerTitle>
          <DrawerDescription>
            Ainda há muitos filmes para conhecer e séries para avaliar!
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="mt-2">
          <DrawerClose asChild>
            <Button size='sm'>
              Cancelar
            </Button>
          </DrawerClose>

          <Button
            variant='secondary'
            onClick={signOut}
          >
            Sim, sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
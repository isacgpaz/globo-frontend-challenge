"use client"

import { useMediaQuery } from "@uidotdev/usehooks";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { SignInForm } from "./sign-in-form";

export function SignInDialog() {
  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm' className="md:mr-0 transition-all hover:scale-95">
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader className="justify-center items-center space-y-0">
            <DialogTitle className="text-2xl">Bem-vindo</DialogTitle>
            <DialogDescription>
              Faça login na sua conta.
            </DialogDescription>
          </DialogHeader>

          <SignInForm
            isDesktop
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size='sm' className="md:mr-0 transition-all hover:scale-95">
          <LogIn className="w-4 h-4 mr-2" />
          Entrar
        </Button>
      </DrawerTrigger>
      <DrawerContent showIsland={false}>
        <DrawerHeader className="mt-2 gap-0">
          <DrawerTitle className="text-2xl">Bem-vindo</DrawerTitle>
          <DrawerDescription>
            Faça login na sua conta.
          </DrawerDescription>
        </DrawerHeader>

        <SignInForm
          className="px-6"
          isDesktop={false}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  )
}
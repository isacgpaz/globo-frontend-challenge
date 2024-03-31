"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Tag } from "lucide-react";
import { useState } from "react";
import { CreateCategoryForm } from "./create-category-form";

export function CreateCategoryDialog() {
  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm'>
            <Tag className="mr-2 w-4 h-4" />
            Nova
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader className="justify-center items-center space-y-0">
            <DialogTitle className="text-2xl">Criar nova categoria</DialogTitle>
          </DialogHeader>

          <CreateCategoryForm
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
        <Button size='sm'>
          <Tag className="mr-2 w-4 h-4" />
          Nova
        </Button>
      </DrawerTrigger>
      <DrawerContent showIsland={false}>
        <DrawerHeader className="mt-2 gap-0">
          <DrawerTitle className="text-2xl">Criar nova categoria</DrawerTitle>
        </DrawerHeader>

        <CreateCategoryForm
          className="px-6"
          isDesktop={false}
          setOpen={setOpen}
        />
      </DrawerContent>
    </Drawer>
  )
}
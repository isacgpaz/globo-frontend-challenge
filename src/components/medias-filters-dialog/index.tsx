"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Filter } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MediaFiltersForm } from "./media-filters-form";
import { MediaFiltersSchema } from "./schema";

export function MediaFiltersDialog({
  open,
  setOpen,
  form,
  setAdvancedsFilters,
  hideFields
}: {
  open: boolean,
  setOpen: (open: boolean) => void,
  form: UseFormReturn<MediaFiltersSchema>,
  setAdvancedsFilters: (advancedsFilters: {
    directorId?: string;
    artistsIds?: string[];
    categoriesIds?: string[];
  }) => void,
  hideFields?: string[]
}) {
  const isDesktop = useMediaQuery(
    "only screen and (min-width: 768px)"
  );


  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='icon'>
            <Filter className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-sm">
          <DialogHeader className="justify-center items-center space-y-0">
            <DialogTitle className="text-2xl">
              Filtrar mídias
            </DialogTitle>
          </DialogHeader>

          <MediaFiltersForm
            isDesktop
            setOpen={setOpen}
            form={form}
            setAdvancedsFilters={setAdvancedsFilters}
            hideFields={hideFields}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size='icon'>
          <Filter className="w-4 h-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent showIsland={false}>
        <DrawerHeader className="mt-2 gap-0">
          <DrawerTitle className="text-2xl">
            Filtrar mídias
          </DrawerTitle>
        </DrawerHeader>

        <MediaFiltersForm
          className="px-6"
          isDesktop={false}
          setOpen={setOpen}
          form={form}
          setAdvancedsFilters={setAdvancedsFilters}
          hideFields={hideFields}
        />
      </DrawerContent>
    </Drawer>
  )
}
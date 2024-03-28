import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerFooter } from "@/components/ui/drawer";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultipleSelector } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useArtists } from "@/modules/artists/list-artists";
import { useCategories } from "@/modules/categories/list-categories";
import { useDirectors } from "@/modules/directors/list-directors";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { MediaFiltersSchema } from "../../app/(admin)/medias/admin-medias-list/schema";

export function MediaFiltersForm({
  className,
  isDesktop,
  form,
  setAdvancedsFilters,
  setOpen,
  hideFields
}: React.ComponentProps<"div"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void,
  form: UseFormReturn<MediaFiltersSchema>,
  setAdvancedsFilters: (advancedsFilters: {
    directorId?: string;
    artistsIds?: string[];
    categoriesIds?: string[];
  }) => void,
  hideFields?: string[]
}) {
  const [categoriesSearch, setCategoriesSearch] = useState('')
  const debouncedCategoriesSearch = useDebounce(categoriesSearch, 500)

  const { data: directorsResponse } = useDirectors({
    filters: {
      page: 1,
      rowsPerPage: 10,
    }
  })

  const { data: categoriesResponse } = useCategories({
    filters: {
      page: 1,
      rowsPerPage: 10,
      name: debouncedCategoriesSearch
    }
  })

  const { data: artistsResponse } = useArtists({
    filters: {
      page: 1,
      rowsPerPage: 10,
    }
  })

  const directors = directorsResponse?.pages.map((page) => page.result).flat() ?? []
  const categories = categoriesResponse?.pages.map((page) => page.result).flat() ?? []
  const artists = artistsResponse?.pages.map((page) => page.result).flat() ?? []

  function applyFilters() {
    setAdvancedsFilters({
      artistsIds: form.watch('artistsIds'),
      categoriesIds: form.watch('categoriesIds'),
      directorId: form.watch('directorId')
    })

    setOpen(false)
  }

  function reset() {
    form.reset({
      artistsIds: [],
      categoriesIds: [],
      directorId: undefined
    })
  }

  return (
    <div className={cn("grid items-start gap-4", className)}
    >
      <ScrollArea className="h-[360px] ">
        <div className="m-1">
          {!hideFields?.includes("categoriesIds") && (
            <FormField
              control={form.control}
              name="categoriesIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <MultipleSelector
                    triggerSearchOnFocus
                    value={
                      categories
                        .filter(
                          (category) => field.value?.includes(category.id)
                        ).map(
                          (category) => ({
                            label: category.name,
                            value: category.id
                          }
                          ))
                    }
                    onChange={(options) => field.onChange(
                      options.map(option => option.value)
                    )}
                    defaultOptions={categories.map((category) => ({
                      label: category.name,
                      value: category.id
                    }))}
                    onSearch={async (value) => {
                      setCategoriesSearch(value)
                      return categories.map((category) => ({
                        label: category.name,
                        value: category.id
                      }))
                    }}
                    placeholder="Selecionar categorias"
                    loadingIndicator={
                      <Loader />
                    }
                    emptyIndicator={
                      <p className="w-full text-center text-sm leading-10 text-slate-500">
                        Nenhum resultado encontrado.
                      </p>
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="directorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diretor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar diretor" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {directors.map((director) => (
                      <SelectItem
                        key={director.id}
                        value={director.id}>
                        {director.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="artistsIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artistas</FormLabel>
                <MultipleSelector
                  triggerSearchOnFocus
                  value={
                    artists
                      .filter(
                        (artist) => field.value?.includes(artist.id)
                      ).map(
                        (artist) => ({
                          label: artist.name,
                          value: artist.id
                        }
                        ))
                  }
                  onChange={(options) => field.onChange(
                    options.map(option => option.value)
                  )}
                  defaultOptions={artists.map((artist) => ({
                    label: artist.name,
                    value: artist.id
                  }))}
                  onSearch={async (value) => {
                    setCategoriesSearch(value)
                    return artists.map((artist) => ({
                      label: artist.name,
                      value: artist.id
                    }))
                  }}
                  placeholder="Selecionar artistas"
                  loadingIndicator={
                    <Loader />
                  }
                  emptyIndicator={
                    <p className="w-full text-center text-sm leading-10 text-slate-500">
                      Nenhum resultado encontrado.
                    </p>
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </ScrollArea>

      {
        isDesktop ? (
          <DialogFooter className="flex md:flex-col mt-2 space-x-0 md:space-x-0 space-y-2 px-2">
            <Button className="w-full" onClick={applyFilters}>
              Aplicar filtros
            </Button>

            <Button className="w-full" variant="outline" onClick={reset}>
              Limpar filtros
            </Button>
          </DialogFooter>
        ) : (
          <DrawerFooter className="mt-2 px-2">
            <Button onClick={applyFilters}>
              Aplicar filtros
            </Button>

            <Button className="w-full" variant="outline" onClick={reset}>
              Limpar filtros
            </Button>
          </DrawerFooter>
        )}
    </div>
  )
}
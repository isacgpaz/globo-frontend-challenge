'use client'

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMedias } from "@/modules/medias/list-medias";
import { MediaType } from "@/types/media";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MediaFiltersDialog } from "../../../../components/medias-filters-dialog";
import { MediasTable } from "../medias-table";
import { MediaFiltersSchema, mediaFiltersSchema, mediaFiltersType } from "./schema";

const mediaTypeOptions = [
  {
    label: 'Todos',
    value: mediaFiltersType.Values.all
  },
  {
    label: 'Filmes',
    value: mediaFiltersType.Values.MOVIE,
  },
  {
    label: 'Séries',
    value: mediaFiltersType.Values.SERIE,
  },
]

export function AdminMediasList() {
  const [open, setOpen] = useState(false)
  const [advancedsFilters, setAdvancedsFilters] = useState<{
    directorId?: string;
    artistsIds?: string[];
    categoriesIds?: string[];
  }>({
    directorId: undefined,
    artistsIds: [],
    categoriesIds: []
  })

  const form = useForm<MediaFiltersSchema>({
    resolver: zodResolver(mediaFiltersSchema),
    defaultValues: {
      title: '',
      type: mediaTypeOptions[0].value,
      directorId: undefined,
      artistsIds: [],
      categoriesIds: []
    }
  });

  const title = useDebounce(form.watch('title'), 500)
  const type = form.watch('type')

  const {
    data: mediasResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useMedias({
    filters: {
      page: 1,
      rowsPerPage: 10,
      title,
      type: type === 'all' ? undefined : type as MediaType,
      ...advancedsFilters
    }
  })

  const medias = mediasResponse?.pages.map((page) => page.result).flat() ?? []

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Form {...form}>
        <form className="mb-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 flex-1 space-y-0">
                  <FormLabel>Título:</FormLabel>
                  <FormControl>
                    <Input {...field} className="text-black mt-0" placeholder="Pesquisar por título" />
                  </FormControl>
                </FormItem>
              )}
            />

            <MediaFiltersDialog
              open={open}
              setOpen={setOpen}
              form={form}
              setAdvancedsFilters={setAdvancedsFilters}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3 flex items-center gap-2">
                <FormLabel className="mt-4">Visualizar:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1 gap-4"
                  >
                    {mediaTypeOptions.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {medias?.length ? (
        <>
          <MediasTable data={medias ?? []} />

          {hasNextPage && (
            <div className="w-full flex items-center justify-center">
              <Button
                className="mt-4 w-fit text-primary hover:no-underline"
                variant='link'
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              >
                Carregar mais
              </Button>
            </div>
          )}
        </ >
      ) : (
        <p className="text-sm text-slate-500">
          Nenhuma mídia encontrada.
        </p>
      )}
    </>
  )
}
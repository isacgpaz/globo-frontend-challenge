'use client'

import { CategoriesBadgesList } from "@/components/categories-badges-list";
import { Loader } from "@/components/loader";
import { MediaFiltersDialog } from "@/components/medias-filters-dialog";
import { MediaFiltersSchema, mediaFiltersSchema, mediaFiltersType } from "@/components/medias-filters-dialog/schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMedias } from "@/modules/medias/list-medias";
import { MediaType } from "@/types/media";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MediasGrid } from "../medias-grid";

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

export function MediasList() {
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
      directorId: undefined,
      artistsIds: [],
      categoriesIds: [],
      type: mediaTypeOptions[0].value
    }
  });

  const title = useDebounce(form.watch('title'), 500)
  const categoriesIds = form.watch('categoriesIds')
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
      ...advancedsFilters,
      categoriesIds
    }
  })

  const medias = mediasResponse?.pages.map((page) => page.result).flat() ?? []

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col-reverse sm:flex-row items-start justify-between gap-4">
          <CategoriesBadgesList
            categoriesIds={categoriesIds}
            setCategoriesIds={(categoriesIds) => {
              form.setValue('categoriesIds', categoriesIds)
            }}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex items-center flex-1 ">
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
                hideFields={["categoriesIds"]}
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
          </div>
        </form>
      </Form>

      {isLoading ? (
        <Loader />
      ) : (
        medias.length ? (
          <MediasGrid medias={medias} />
        ) : (
          <span className="text-sm text-slate-500 mt-6 block">
            Nenhuma mídia encontrada.
          </span>
        )
      )}
    </div>
  )
}
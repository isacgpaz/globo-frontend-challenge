'use client'

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMedias } from "@/modules/medias/list-medias";
import { MediaType } from "@/types/media";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { MediasTable } from "../medias-table";

const mediaTypeOptions = [
  {
    label: 'Todos',
    value: 'all'
  },
  {
    label: 'Filmes',
    value: MediaType.MOVIE,
  },
  {
    label: 'Séries',
    value: MediaType.SERIE,
  },
]

export function MediasList() {
  const form = useForm({
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
      type: type === 'all' ? undefined : type as MediaType
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
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-3 flex items-center gap-2">
                <FormLabel className="mt-4">Título:</FormLabel>
                <FormControl>
                  <Input {...field} className="text-black" placeholder="Pesquisar por título" />
                </FormControl>
              </FormItem>
            )}
          />

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
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultipleSelector } from "@/components/ui/multi-select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCreateMediaContext } from "@/contexts/create-media-context";
import { dayjs } from '@/lib/dayjs';
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { useArtists } from "@/modules/artists/list-artists";
import { useCategories } from "@/modules/categories/list-categories";
import { useDirectors } from "@/modules/directors/list-directors";
import { useCreateMedia } from "@/modules/medias/create-media";
import { useUpdateMedia } from "@/modules/medias/update-media";
import { MediaType, ParentalRating } from "@/types/media";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MediaSchema, mediaSchema } from "./schema";

export function CreateMediaForm({
  className,
  isDesktop,
  setOpen,
  setSeasonFormDialogOpen,
  setSelectedSeasonIndex,
  mode
}: React.ComponentProps<"form"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void,
  setSeasonFormDialogOpen: (open: boolean) => void,
  setSelectedSeasonIndex: (index: number) => void,
  mode?: 'update' | 'create',
}) {
  const { media, setMedia } = useCreateMediaContext()

  const form = useForm<MediaSchema>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      id: media?.id ?? undefined,
      title: media?.title ?? '',
      description: media?.description ?? '',
      releaseDate: media?.releaseDate ?? undefined,
      type: media?.type ?? MediaType.MOVIE,
      artistsIds: media?.artistsIds ?? [],
      categoriesIds: media?.categoriesIds ?? [],
      directorId: media?.directorId ?? undefined,
      parentalRating: media?.parentalRating ?? ParentalRating.G,
      movie: media?.movie ?? undefined,
      serie: media?.serie ?? undefined
    }
  });

  const values = form.watch()

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

  const { mutate: createMedia, isPending: isCreateMediaPending } = useCreateMedia()
  const { mutate: updateMedia, isPending: isUpdateMediaPending } = useUpdateMedia()

  const isPending = isCreateMediaPending && isUpdateMediaPending

  async function handleCreateMedia(values: MediaSchema) {
    let mediaData = {
      ...values,
      releaseDate: dayjs(values.releaseDate).toISOString()
    }

    if (values.type === MediaType.MOVIE) {
      delete mediaData.serie
    }

    if (values.type === MediaType.SERIE) {
      delete mediaData.movie
    }


    if (mode === 'update' && media?.id) {
      updateMedia({
        ...mediaData,
        id: media.id
      }, {
        onSuccess() {
          toast({
            description: 'Mídia atualizada com sucesso.',
            variant: 'success'
          })

          queryClient.invalidateQueries({
            queryKey: ['medias']
          })

          queryClient.invalidateQueries({
            queryKey: ['media']
          })

          setOpen(false)
          form.reset()
        },
        onError() {
          toast({
            description: 'Ops, aconteceu um erro.',
            variant: 'destructive'
          })
        }
      })
    }

    if (mode === 'create') {
      createMedia(mediaData, {
        onSuccess() {
          toast({
            description: 'Mídia criada com sucesso.',
            variant: 'success'
          })

          queryClient.invalidateQueries({
            queryKey: ['medias']
          })

          setOpen(false)
          form.reset()
        },
        onError() {
          toast({
            description: 'Ops, aconteceu um erro.',
            variant: 'destructive'
          })
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleCreateMedia)}
      >
        <ScrollArea className="h-[320px] ">
          <Tabs
            defaultValue={MediaType.MOVIE}
            value={form.watch('type')}
            onValueChange={(value) => {
              form.setValue('type', value as MediaType)

              if (value === MediaType.MOVIE) {
                form.setValue('serie', undefined)
              }

              if (value === MediaType.SERIE) {
                form.setValue('movie', undefined)
              }
            }}
          >
            <TabsList>
              <TabsTrigger
                value={MediaType.MOVIE}
                disabled={MediaType.MOVIE !== media?.type && mode === 'update'}
                className="data-[state=active]:text-primary disabled:cursor-not-allowed"
              >
                Filme
              </TabsTrigger>

              <TabsTrigger
                value={MediaType.SERIE}
                disabled={MediaType.SERIE !== media?.type && mode === 'update'}
                className="data-[state=active]:text-primary"
              >
                Série
              </TabsTrigger>
            </TabsList>

            <TabsContent value={form.watch('type')} className="m-1">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Data de lançamento</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={value}
                        label='Selecionar data'
                        setDate={(date) => {
                          onChange(date)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                            (category) => field.value.includes(category.id)
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
                            (artist) => field.value.includes(artist.id)
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

              {form.watch('type') === MediaType.MOVIE && (
                <FormField
                  control={form.control}
                  name="movie.duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração em minutos do filme</FormLabel>
                      <FormControl>
                        <Input {...field} type='number' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch('type') === MediaType.SERIE && (
                <>
                  <FormLabel className="mt-4 block">
                    Temporadas
                  </FormLabel>

                  {form.watch('serie.seasons')?.length && (
                    <ul>
                      {form.watch('serie.seasons').map((season, index) => (
                        <li key={index} className="flex items-center justify-between gap-4">
                          <span className="text-xs block">
                            Temporada {index + 1} ({season.episodes?.length} episódios)
                          </span>

                          <div>
                            <Button
                              size='sm'
                              variant='link'
                              type='button'
                              className="text-destructive"
                              onClick={() => {
                                setMedia((media) => ({
                                  ...media,
                                  serie: {
                                    seasons: media?.serie ? media.serie?.seasons.filter(
                                      (_, seasonIndex) => seasonIndex !== index
                                    ) : []
                                  }
                                }))
                              }}
                            >
                              Excluir
                            </Button>

                            <Button
                              size='sm'
                              variant='link'
                              type='button'
                              onClick={() => {
                                setSelectedSeasonIndex(index)
                                setMedia(values)
                                setSeasonFormDialogOpen(true)
                                setOpen(false)
                              }}
                            >
                              Ver
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button
                    variant='link'
                    size='sm'
                    type='button'
                    onClick={() => {
                      setSelectedSeasonIndex(form.watch('serie.seasons')?.length ?? 0)
                      setMedia(values)
                      setSeasonFormDialogOpen(true)
                      setOpen(false)
                    }}
                  >
                    Adicionar temporada
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>


        {isDesktop ? (
          <DialogFooter className="flex md:flex-col mt-2 space-x-0 md:space-x-0 space-y-2">
            <Button
              className="w-full"
              type='submit'
              isLoading={isPending}
            >
              Salvar mídia
            </Button>

            <DialogClose asChild>
              <Button className="w-full" variant="ghost">
                Voltar
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <DrawerFooter className="mt-2 px-0">
            <Button
              type='submit'
              isLoading={isPending}
            >
              Salvar mídia
            </Button>

            <DrawerClose asChild>
              <Button variant="ghost" size='sm'>
                Voltar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        )}
      </form>
    </Form>
  )
}
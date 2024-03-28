import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useCreateMediaContext } from "@/contexts/create-media-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { CreateSeasonSchema, createSeasonSchema } from "./schema";

export function CreateSeasonForm({
  className,
  isDesktop,
  setOpen,
  seasonIndex
}: React.ComponentProps<"form"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void,
  seasonIndex: number
}) {
  const { media, setMedia } = useCreateMediaContext()

  const currentSeason = media?.serie?.seasons[seasonIndex]

  const form = useForm<CreateSeasonSchema>({
    resolver: zodResolver(createSeasonSchema),
    defaultValues: {
      episodes: currentSeason ? currentSeason.episodes : [
        {
          description: '',
          duration: '' as unknown as number,
          title: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'episodes',
  })

  async function handleCreateSeason(season: CreateSeasonSchema) {
    const serie = media?.serie ?? { seasons: [] }

    if (currentSeason) {
      serie.seasons.splice(seasonIndex, 1, season)
    } else {
      serie?.seasons.push(season)
    }

    setMedia((media) => ({
      ...media,
      serie
    }))

    toast({
      variant: 'success',
      description: 'Temporada adicionada com sucesso.'
    })

    setOpen(false)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleCreateSeason)}
      >
        <ScrollArea className="h-[320px]">
          <div className="flex flex-col justify-center items-center gap-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="w-full">
                <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-sm">
                    Episódio {index + 1}
                  </CardTitle>

                  {fields.length > 1 && (
                    <Button
                      variant='outline'
                      className="hover:no-underline text-destructive"
                      type='button'
                      size='sm'
                      onClick={() => {
                        remove(index)
                        toast({
                          description: 'Episódio removido.',
                          variant: 'default'
                        })
                      }}
                    >
                      Remover episódio
                    </Button>
                  )}
                </CardHeader>

                <CardContent>
                  <FormField
                    control={form.control}
                    name={`episodes.${index}.title`}
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
                    name={`episodes.${index}.description`}
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
                    name={`episodes.${index}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duração</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}

            <Button
              variant='link'
              className="hover:no-underline"
              type='button'
              onClick={() => {
                append({
                  description: '',
                  duration: '' as unknown as number,
                  title: ''
                })

                toast({
                  description: 'Episódio adicionado.',
                  variant: 'default'
                })
              }}
            >
              Adicionar novo episódio
            </Button>
          </div>
        </ScrollArea>

        {isDesktop ? (
          <DialogFooter className="flex md:flex-col mt-2 space-x-0 md:space-x-0 space-y-2">
            <Button
              className="w-full"
              type='submit'
            >
              {currentSeason ? 'Atualizar' : 'Adicionar'} temporada - {form.watch('episodes')?.length} EP
            </Button>

            <DialogClose asChild>
              <Button className="w-full" variant="ghost">
                Voltar
              </Button>
            </DialogClose>
          </DialogFooter>
        ) : (
          <DrawerFooter className="mt-2 px-0">
            <Button type='submit'>
              {currentSeason ? 'Atualizar' : 'Adicionar'} temporada - {form.watch('episodes')?.length} EP
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
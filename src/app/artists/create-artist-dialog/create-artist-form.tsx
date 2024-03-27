import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { useCreateArtist } from "@/modules/artists/create-artist";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { CreateArtistSchema, createArtistSchema } from "./schema";

export function CreateArtistForm({
  className,
  isDesktop,
  setOpen
}: React.ComponentProps<"form"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void
}) {
  const form = useForm<CreateArtistSchema>({
    resolver: zodResolver(createArtistSchema),
    defaultValues: {
      name: '',
    }
  });

  const { mutate: createArtist, isPending } = useCreateArtist()

  async function handleCreateUser({ name }: CreateArtistSchema) {
    createArtist({
      name
    }, {
      onSuccess() {
        toast({
          description: 'Artista criado com sucesso.',
          variant: 'success'
        })

        queryClient.invalidateQueries({
          queryKey: ['artists']
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

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(handleCreateUser)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {isDesktop ? (
          <DialogFooter className="flex md:flex-col mt-2 space-x-0 md:space-x-0 space-y-2">
            <Button
              className="w-full"
              type='submit'
              isLoading={isPending}
            >
              Criar artista
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
              Criar artista
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
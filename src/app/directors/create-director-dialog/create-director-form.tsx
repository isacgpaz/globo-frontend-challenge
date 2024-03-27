import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";
import { useCreateDirector } from "@/modules/directors/create-director";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { CreateDirectorSchema, createDirectorSchema } from "./schema";

export function CreateDirectorForm({
  className,
  isDesktop,
  setOpen
}: React.ComponentProps<"form"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void
}) {
  const form = useForm<CreateDirectorSchema>({
    resolver: zodResolver(createDirectorSchema),
    defaultValues: {
      name: '',
    }
  });

  const { mutate: createDirector, isPending } = useCreateDirector()

  async function handleCreateUser({ name }: CreateDirectorSchema) {
    createDirector({
      name
    }, {
      onSuccess() {
        toast({
          description: 'Diretor criado com sucesso.',
          variant: 'success'
        })

        queryClient.invalidateQueries({
          queryKey: ['directors']
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
              Criar diretor
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
              Criar diretor
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
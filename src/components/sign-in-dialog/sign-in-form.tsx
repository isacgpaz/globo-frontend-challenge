import { useAuthContext } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { useSignIn } from "@/modules/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { DrawerClose, DrawerFooter } from "../ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import { SignInSchema, signInSchema } from "./schema";

export function SignInForm({
  className,
  isDesktop,
  setOpen
}: React.ComponentProps<"form"> & {
  isDesktop: boolean,
  setOpen: (open: boolean) => void
}) {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { storageUser } = useAuthContext()
  const { mutate: signIn, isPending } = useSignIn()

  async function handleSignIn({ email, password }: SignInSchema) {
    signIn({
      email,
      password
    }, {
      onSuccess(signInResponse) {
        storageUser(signInResponse)
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
        onSubmit={form.handleSubmit(handleSignIn)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
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
              Entrar
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
              Entrar
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
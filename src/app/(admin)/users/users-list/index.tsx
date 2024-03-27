'use client'

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUsers } from "@/modules/users";
import { UserStatus } from "@/types/user";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UsersTable } from "../users-table";

const userStatusOptions = [
  {
    label: 'Habilitado',
    value: UserStatus.ENABLED,
  },
  {
    label: 'Desabilitado',
    value: UserStatus.BLOCKED,
  },
]

export function UsersList() {
  const [page, setPage] = useState(1)

  const form = useForm({
    defaultValues: {
      name: '',
      status: userStatusOptions[0].value,
    }
  });

  const name = useDebounce(form.watch('name'), 500)

  const {
    data: usersResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useUsers({
    filters: {
      page,
      rowsPerPage: 10,
      name,
      status: form.watch('status')
    }
  })

  const users = usersResponse?.pages.map((page) => page.result).flat() ?? []

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
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3 flex items-center gap-2">
                <FormLabel className="mt-4">Nome:</FormLabel>
                <FormControl>
                  <Input {...field} className="text-black" placeholder="Pesquisar por nome" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3 flex items-center gap-2">
                <FormLabel className="mt-4">Filtrar por:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1 gap-4"
                  >
                    {userStatusOptions.map((option) => (
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

      {users?.length ? (
        <>
          <UsersTable data={users ?? []} />

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
          Nenhum usuário encontrado.
        </p>
      )}

    </>
  )
}
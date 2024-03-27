'use client'

import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useArtists } from "@/modules/artists/list-artists";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { ArtistsTable } from "../artists-table";

export function ArtistsList() {
  const form = useForm({
    defaultValues: {
      name: '',
    }
  });

  const name = useDebounce(form.watch('name'), 500)

  const {
    data: artistsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useArtists({
    filters: {
      page: 1,
      rowsPerPage: 10,
      name,
    }
  })

  const artists = artistsResponse?.pages.map((page) => page.result).flat() ?? []

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
        </form>
      </Form>

      {artists?.length ? (
        <>
          <ArtistsTable data={artists ?? []} />

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
          Nenhum artista encontrado.
        </p>
      )}

    </>
  )
}
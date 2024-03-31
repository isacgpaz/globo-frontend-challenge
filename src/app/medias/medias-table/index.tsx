import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useCreateMediaContext } from "@/contexts/create-media-context";
import { useMediaMutation } from "@/modules/medias/get-media";
import { Media } from "@/types/media";
import dayjs from "dayjs";
import { useState } from "react";
import { MediaFormDialog } from "../media-form-dialog";

export function MediasTable({ data }: { data: Omit<Media, 'movie' | 'serie' | 'director' | 'artists'>[] }) {
  const { setMedia, media: mediaFromContext } = useCreateMediaContext()
  const [open, setOpen] = useState(false);

  const { mutateAsync: getMedia, isPending } = useMediaMutation()

  async function selectMedia(selectedMediaId: string) {
    setMedia(undefined)

    await getMedia(selectedMediaId).then((media) => {
      setMedia({
        id: media.id,
        artistsIds: media.artists.map((artist) => artist.id),
        categoriesIds: media.categories.map((category) => category.id),
        directorId: media.directorId,
        description: media.description,
        title: media.title,
        type: media.type,
        releaseDate: dayjs(media.releaseDate).toDate(),
        parentalRating: media.parentalRating,
        movie: media.movie ? {
          duration: media.movie.duration,
        } : undefined,
        serie: media.serie ? {
          seasons: media.serie.seasons.map((season) => ({
            episodes: season.episodes.map((episode) => ({
              title: episode.title,
              description: episode.description,
              duration: episode.duration,
            }))
          }))
        } : undefined
      })

      setOpen(true)
    }).catch(() => {
      toast({
        description: 'Ops, ocorreu um erro.',
        variant: 'destructive'
      })
    })

  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Data de lançamento</TableHead>
            <TableHead>Opções</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((media, index) => (
            <TableRow key={media.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{media.title}</TableCell>
              <TableCell>{dayjs(media.releaseDate).format('DD/MM/YYYY')}</TableCell>
              <TableCell>
                <Button
                  onClick={() => selectMedia(media.id)}
                  isLoading={isPending && media.id === mediaFromContext?.id}
                  size='sm'
                  variant='link'
                  className="p-0 hover:no-underline"
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MediaFormDialog
        open={open}
        setOpen={setOpen}
        mode='update'
      />
    </>
  )
}
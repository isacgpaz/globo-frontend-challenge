import { api } from "@/lib/axios"
import { Media, MediaType, Movie, ParentalRating } from "@/types/media"
import { useMutation } from "@tanstack/react-query"

type UpdateMedia = {
  id: string,
  title: string,
  description: string,
  releaseDate: string,
  artistsIds: string[],
  directorId: string,
  categoriesIds: string[],
  type: MediaType,
  parentalRating: ParentalRating,
  movie?: Pick<Movie, 'duration'>,
  serie?: {
    seasons: {
      episodes: {
        title: string,
        description: string,
        duration: number
      }[]
    }[]
  }
}

export async function updateMedia({ id, ...params }: UpdateMedia) {
  const response = await api.put<{ media: Media }>(`/media/${id}`, params)

  return response.data
}

export const useUpdateMedia = () => {
  return useMutation({
    mutationFn: (params: UpdateMedia) => updateMedia(params)
  });
};
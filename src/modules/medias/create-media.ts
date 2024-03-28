import { api } from "@/lib/axios"
import { Media, MediaType, Movie, ParentalRating } from "@/types/media"
import { useMutation } from "@tanstack/react-query"

type CreateMedia = {
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

export async function createMedia(params: CreateMedia) {
  const response = await api.post<{ media: Media }>('/media', params)

  return response.data
}

export const useCreateMedia = () => {
  return useMutation({
    mutationFn: (params: CreateMedia) => createMedia(params)
  });
};
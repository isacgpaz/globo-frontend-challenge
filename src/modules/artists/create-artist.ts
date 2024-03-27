import { api } from "@/lib/axios"
import { Artist } from "@/types/artist"
import { useMutation } from "@tanstack/react-query"

type CreateArtist = {
  name: string,
}

export async function createArtist({ name }: CreateArtist) {
  const response = await api.post<{ artist: Artist }>('/artist', {
    name
  })

  return response.data
}

export const useCreateArtist = () => {
  return useMutation({
    mutationFn: (params: CreateArtist) => createArtist(params)
  });
};
import { api } from "@/lib/axios"
import { Director } from "@/types/director"
import { useMutation } from "@tanstack/react-query"

type CreateDirector = {
  name: string,
}

export async function createDirector({ name }: CreateDirector) {
  const response = await api.post<{ director: Director }>('/director', {
    name
  })

  return response.data
}

export const useCreateDirector = () => {
  return useMutation({
    mutationFn: (params: CreateDirector) => createDirector(params)
  });
};
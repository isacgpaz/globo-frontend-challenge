import { api } from "@/lib/axios";
import { Media } from "@/types/media";
import { useMutation } from "@tanstack/react-query";

export async function getMedia(mediaId: string) {
  const response = await api.get<{
    media: Media,
    averageRate: number | null
  }>(`/media/${mediaId}`)

  return {
    ...response.data.media,
    averageRate: response.data.averageRate
  }
}

export const useMedia = () => {
  return useMutation({
    mutationFn: (mediaId: string) => getMedia(mediaId),
  })
}
import { api } from "@/lib/axios";
import { Media } from "@/types/media";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useMedia = (mediaId: string) => {
  return useQuery({
    queryKey: ['media', mediaId],
    queryFn: () => getMedia(mediaId)
  })
}

export const useMediaMutation = () => {
  return useMutation({
    mutationFn: (mediaId: string) => getMedia(mediaId),
  })
}
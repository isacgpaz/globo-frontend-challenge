import { api } from "@/lib/axios";
import { Media } from "@/types/media";
import { useMutation } from "@tanstack/react-query";

export async function getMedia(mediaId: string) {
  const response = await api.get<{ media: Media }>(`/media/${mediaId}`)

  return response.data.media
}

export const useMedia = () => {
  return useMutation({
    mutationFn: (mediaId: string) => getMedia(mediaId),
  })
}
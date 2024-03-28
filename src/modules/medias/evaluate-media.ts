import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export async function evaluateMedia({ mediaId, rate }: {
  mediaId: string,
  rate: number
}) {
  const response = await api.patch(`/media/${mediaId}/evaluate`, {
    rate
  })

  return response.data
}

export const useEvaluateMedia = () => {
  return useMutation({
    mutationFn: ({ mediaId, rate }: {
      mediaId: string,
      rate: number
    }) => evaluateMedia({ mediaId, rate }),
  })
}
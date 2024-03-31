import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export async function verifyEvaluation(mediaId: string) {
  const response = await api.get<{
    evaluationAvalable: boolean,
    rate: number
  }>(`/media/${mediaId}/verify-evaluation`)

  return response.data
}

export const useVerifyEvaluation = (mediaId: string) => {
  return useQuery({
    queryKey: ['verify-evaluation', mediaId],
    queryFn: () => verifyEvaluation(mediaId),
  })
}
import { api } from "@/lib/axios"
import { User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"

type EnableUser = {
  userId: string,
}

export async function blockUser({ userId }: EnableUser) {
  const response = await api.patch<{ user: User }>(`/user/${userId}/enable`)

  return response.data
}

export const useEnableUser = () => {
  return useMutation({
    mutationFn: (params: EnableUser) => blockUser(params)
  });
};
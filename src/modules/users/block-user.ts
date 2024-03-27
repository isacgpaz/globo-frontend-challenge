import { api } from "@/lib/axios"
import { User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"

type BlockUser = {
  userId: string,
}

export async function blockUser({ userId }: BlockUser) {
  const response = await api.patch<{ user: User }>(`/user/${userId}/block`)

  return response.data
}

export const useBlockUser = () => {
  return useMutation({
    mutationFn: (params: BlockUser) => blockUser(params)
  });
};
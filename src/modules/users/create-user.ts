import { api } from "@/lib/axios"
import { AccessLevel, User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"

type CreateUser = {
  email: string,
  password: string,
  name: string,
  accessLevel: AccessLevel,
}

export async function signUp({ email, password, accessLevel, name }: CreateUser) {
  const response = await api.post<{ user: User }>('/auth/sign-up', {
    email, password, accessLevel, name
  })

  return response.data
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (params: CreateUser) => signUp(params)
  });
};
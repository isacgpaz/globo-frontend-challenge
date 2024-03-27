import { api } from "@/lib/axios"
import { User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"

type SignIn = {
  email: string,
  password: string
}

export async function signIn({ email, password }: SignIn) {
  const response = await api.post<{
    accessToken: string,
    user: User
  }>('/auth/sign-in', {
    email, password
  })

  return response.data
}

export const useSignIn = () => {
  return useMutation({
    mutationFn: (params: SignIn) => signIn(params)
  });
};
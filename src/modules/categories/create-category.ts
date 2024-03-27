import { api } from "@/lib/axios"
import { Category } from "@/types/category"
import { useMutation } from "@tanstack/react-query"

type CreateCategory = {
  name: string,
}

export async function createCategory({ name }: CreateCategory) {
  const response = await api.post<{ category: Category }>('/category', {
    name
  })

  return response.data
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (params: CreateCategory) => createCategory(params)
  });
};
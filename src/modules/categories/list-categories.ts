import { api } from "@/lib/axios";
import { Category } from "@/types/category";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetCategoriesResponse = {
  result: Category[],
  meta: {
    total: number,
    page: number,
    rowsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}

type GetCategorysParams = {
  page: number,
  rowsPerPage: number,
  name?: string
}

export async function getCategorys(filters: GetCategorysParams) {
  const response = await api.get<GetCategoriesResponse>('/category', {
    params: filters
  })

  return response.data
}

export const useCategories = ({
  filters,
}: { filters: GetCategorysParams }
) => {
  return useInfiniteQuery({
    queryKey: ['categories', filters],
    queryFn: ({ pageParam }) => getCategorys({ ...filters, page: pageParam + 1 }),
    getNextPageParam: (response) => response?.result?.length === 0 ||
      response?.result?.length >=
      response?.meta?.total
      ? undefined
      : response?.meta?.page,
    initialPageParam: 0
  })
}
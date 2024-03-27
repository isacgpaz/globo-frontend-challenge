import { api } from "@/lib/axios";
import { Director } from "@/types/director";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetDirectorsResponse = {
  result: Director[],
  meta: {
    total: number,
    page: number,
    rowsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}

type GetDirectorsParams = {
  page: number,
  rowsPerPage: number,
  name?: string
}

export async function getDirectors(filters: GetDirectorsParams) {
  const response = await api.get<GetDirectorsResponse>('/director', {
    params: filters
  })

  return response.data
}

export const useDirectors = ({
  filters,
}: { filters: GetDirectorsParams }
) => {
  return useInfiniteQuery({
    queryKey: ['directors', filters],
    queryFn: ({ pageParam }) => getDirectors({ ...filters, page: pageParam + 1 }),
    getNextPageParam: (response) => response?.result?.length === 0 ||
      response?.result?.length >=
      response?.meta?.total
      ? undefined
      : response?.meta?.page,
    initialPageParam: 0
  })
}
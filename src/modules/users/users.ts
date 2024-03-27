import { api } from "@/lib/axios";
import { User, UserStatus } from "@/types/user";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetUsersResponse = {
  result: User[],
  meta: {
    total: number,
    page: number,
    rowsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}

type GetUsersParams = {
  page: number,
  rowsPerPage: number,
  name?: string,
  status?: UserStatus
}

export async function getUsers(filters: GetUsersParams) {
  const response = await api.get<GetUsersResponse>('/users', {
    params: filters
  })

  return response.data
}

export const useUsers = ({
  filters,
}: { filters: GetUsersParams }
) => {
  return useInfiniteQuery({
    queryKey: ['users', filters],
    queryFn: ({ pageParam }) => getUsers({ ...filters, page: pageParam + 1 }),
    getNextPageParam: (response) => response?.result?.length === 0 ||
      response?.result?.length >=
      response?.meta?.total
      ? undefined
      : response?.meta?.page,
    initialPageParam: 0
  })
}
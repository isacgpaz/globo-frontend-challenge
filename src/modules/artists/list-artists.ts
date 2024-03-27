import { api } from "@/lib/axios";
import { Artist } from "@/types/artist";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetArtistsResponse = {
  result: Artist[],
  meta: {
    total: number,
    page: number,
    rowsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}

type GetArtistsParams = {
  page: number,
  rowsPerPage: number,
  name?: string
}

export async function getArtists(filters: GetArtistsParams) {
  const response = await api.get<GetArtistsResponse>('/artist', {
    params: filters
  })

  return response.data
}

export const useArtists = ({
  filters,
}: { filters: GetArtistsParams }
) => {
  return useInfiniteQuery({
    queryKey: ['artists', filters],
    queryFn: ({ pageParam }) => getArtists({ ...filters, page: pageParam + 1 }),
    getNextPageParam: (response) => response?.result?.length === 0 ||
      response?.result?.length >=
      response?.meta?.total
      ? undefined
      : response?.meta?.page,
    initialPageParam: 0
  })
}
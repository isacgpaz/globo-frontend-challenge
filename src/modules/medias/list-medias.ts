import { api } from "@/lib/axios";
import { Media, MediaType } from "@/types/media";
import { useInfiniteQuery } from "@tanstack/react-query";

type GetMediasResponse = {
  result: Omit<Media, 'movie' | 'serie' | 'director' | 'artists'>[],
  meta: {
    total: number,
    page: number,
    rowsPerPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}

type GetMediasParams = {
  page: number,
  rowsPerPage: number,
  title?: string,
  artistsIds?: string[],
  categoriesIds?: string[],
  directorId?: string,
  type?: MediaType
}

export async function getMedias(filters: GetMediasParams) {
  const response = await api.get<GetMediasResponse>('/media', {
    params: filters
  })

  return response.data
}

export const useMedias = ({
  filters,
}: { filters: GetMediasParams }
) => {
  return useInfiniteQuery({
    queryKey: ['medias', filters],
    queryFn: ({ pageParam }) => getMedias({ ...filters, page: pageParam + 1 }),
    getNextPageParam: (response) => response?.result?.length === 0 ||
      response?.result?.length >=
      response?.meta?.total
      ? undefined
      : response?.meta?.page,
    initialPageParam: 0
  })
}
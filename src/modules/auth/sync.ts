import { api } from "@/lib/axios";
import { User } from "@/types/user";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export async function sync() {
  const response = await api.get<{ user: User }>('/auth/sync')

  return response.data
}

export const useSync = ({ enabled }: Pick<UseQueryOptions<{ user: User }, Error>, 'enabled'>) => {
  return useQuery<{ user: User }, Error>({
    queryKey: ["sync"],
    queryFn: sync,
    enabled,
    retry: false,
    staleTime: 0,

  });
};
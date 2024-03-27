'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export function Providers(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {props.children}
      </AuthProvider>
    </QueryClientProvider>
  )
}

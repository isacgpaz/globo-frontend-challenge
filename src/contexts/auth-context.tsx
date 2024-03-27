'use client'

import { useSync } from "@/modules/auth/sync";
import { User } from "@/types/user";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type AuthContextProps = {
  user: User | undefined,
  storageUser: ({
    accessToken,
    user
  }: {
    accessToken: string,
    user: User
  }) => void,
  isLoading: boolean,
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: PropsWithChildren) {
  const route = useRouter();

  const [user, setUser] = useState<User | undefined>(undefined);

  const {
    isLoading,
    data: syncData,
    refetch: sync,
    isError
  } = useSync({
    enabled: !!getCookie('@media-reviews:accessToken'),
  });

  const signOut = useCallback(() => {
    deleteCookie('@media-reviews:accessToken')
    deleteCookie('@media-reviews:accessLevel')
    setUser(undefined)
    route.push('/')
  }, [route])

  const storageUser = useCallback(async ({
    accessToken,
    user
  }: {
    accessToken: string,
    user: User
  }) => {
    setCookie('@media-reviews:accessToken', accessToken)
    setCookie('@media-reviews:accessLevel', user.accessLevel)
    setUser(user)
  }, [])

  useEffect(() => {
    if (syncData) {
      setUser(syncData.user)
    } else {
      if (getCookie("@media-reviews:accessToken") && !syncData) {
        sync()
      }
    }
  }, [sync, syncData])

  useEffect(() => {
    if (isError) {
      signOut()
    }
  }, [isError, signOut])

  const authProviderValue: AuthContextProps = useMemo(() => ({
    user,
    isLoading,
    storageUser,
    signOut
  }), [
    user,
    isLoading,
    storageUser,
    signOut
  ])

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};

'use client'

import { CreateMediaSchema } from "@/app/(admin)/medias/create-media-dialog/schema";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from "react";

type CreateMediaContextProps = {
  media: Partial<CreateMediaSchema>,
  setMedia: Dispatch<SetStateAction<Partial<CreateMediaSchema>>>
}

export const CreateMediaContext = createContext({} as CreateMediaContextProps)

export function CreateMediaProvider({ children }: PropsWithChildren) {
  const [media, setMedia] = useState<Partial<CreateMediaSchema>>({});

  const createMediaContext: CreateMediaContextProps = useMemo(() => ({
    media,
    setMedia
  }), [
    media,
    setMedia
  ])

  return (
    <CreateMediaContext.Provider value={createMediaContext}>
      {children}
    </CreateMediaContext.Provider>
  )
}

export const useCreateMediaContext = () => {
  const context = useContext(CreateMediaContext);

  if (!context) {
    throw new Error("useCreateMediaContext must be used within a CreateMediaProvider");
  }

  return context;
};

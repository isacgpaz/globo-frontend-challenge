'use client'

import { useIsClient } from "@uidotdev/usehooks";
import { CreateUserDialog } from "./create-user-dialog";
import { UsersList } from "./users-list";

export default function Users() {
  const isClient = useIsClient()

  if (isClient === false) {
    return null
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="lg:max-w-5xl mx-auto">
        <header className="flex justify-between items-center gap-4 mb-6">
          <h2 className="font-medium text-xl">
            Usuários
          </h2>

          <CreateUserDialog />
        </header>

        <UsersList />
      </div>
    </div>
  )
}
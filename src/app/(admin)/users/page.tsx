import { CreateUserDialog } from "./create-user-dialog";
import { UsersList } from "./users-list";

export default function Users() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="flex justify-between items-center gap-4 mb-6">
        <h2 className="font-medium text-xl">
          Usuários
        </h2>

        <CreateUserDialog />
      </header>

      <UsersList />
    </div>
  )
}
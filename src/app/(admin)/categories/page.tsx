import { CategoriesList } from "./categories-list";
import { CreateCategoryDialog } from "./create-category-dialog";

export default function Artists() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header className="flex justify-between items-center gap-4 mb-6">
        <h2 className="font-medium text-xl">
          Diretores
        </h2>

        <CreateCategoryDialog />
      </header>

      <CategoriesList />
    </div>
  )
}
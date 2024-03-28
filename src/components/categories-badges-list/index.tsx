'use client'

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCategories } from "@/modules/categories/list-categories";

export function CategoriesBadgesList({
  categoriesIds,
  setCategoriesIds
}: {
  categoriesIds: string[]
  setCategoriesIds: (categoriesIds: string[]) => void
}) {
  const { data: categoriesResponse } = useCategories({
    filters: {
      page: 1,
      rowsPerPage: 10,
    }
  });

  const categories = categoriesResponse?.pages.map((page) => page.result).flat() ?? []

  return (
    <div>
      <ul className="flex whitespace-nowrap gap-3">
        {categories.map((category) => {
          const isActive = categoriesIds.includes(category.id)

          return (
            <li
              key={category.id}
              onClick={() => {
                if (isActive) {
                  setCategoriesIds(categoriesIds.filter(
                    (categoryId) => categoryId !== category.id
                  ))
                } else {
                  setCategoriesIds([
                    ...categoriesIds,
                    category.id
                  ])
                }
              }}
            >
              <Badge
                className={cn(
                  "text-sm font-medium px-3 py-1 text-white border-2 cursor-pointer transition-all hover:scale-95 hover:bg-slate-700",
                  isActive && 'hover:bg-primary'
                )}
                variant={isActive ? 'default' : 'outline'}
              >
                {category.name}
              </Badge>
            </li>
          )
        })}
      </ul>

      {categoriesIds.length > 0 && (
        <span className="text-xs text-slate-500 block mt-2">
          Selecionada(s): {categoriesIds.length}
        </span>
      )}
    </div>
  )
}
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Artist } from "@/types/artist";
import { Category } from "@/types/category";
import { Director } from "@/types/director";
import Link from "next/link";

export function MediaInfo({
  categories,
  director,
  artists,
  description
}: {
  categories: Category[],
  director: Director,
  artists: Artist[],
  description: string
}) {
  return (
    <div className="px-6 mt-6 lg:max-w-5xl mx-auto">
      {categories.length > 0 && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href='/medias'>
                <Badge
                  className={cn(
                    "text-sm font-medium px-3 py-1 text-white border-2 cursor-pointer transition-all hover:scale-95 hover:bg-slate-700",
                  )}
                  variant={'outline'}
                >
                  {category.name}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm mt-6">
        {description}
      </p>

      <p className="text-sm mt-6 text-slate-500">
        Diretor: {' '}

        <strong className="text-white">
          <Link href='/medias'>
            {director.name}
          </Link>
        </strong>
      </p>

      <p className="text-sm mt-6 text-slate-500">
        Elenco: {' '}

        {artists.map((artist, index) => (
          <strong className="text-white" key={artist.id}>
            <Link href='/medias'>
              {artist.name}
            </Link>

            {index !== 0
              ? index === artists.length - 2
                ? 'e '
                : ', '
              : ''
            }
          </strong>
        ))}
      </p>
    </div>
  )
}
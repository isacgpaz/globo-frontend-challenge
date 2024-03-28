import { Badge } from "@/components/ui/badge";
import { MediaType } from "@/types/media";

export function MediaCover({ title, duration, type }: { title: string, duration: number, type: MediaType }) {
  return (
    <header className="flex flex-col bg-gradient-to-t from-slate-950 to-blue-950 rounded-b-3xl h-[24vh] md:h-[32vh]">
      <div className="relative lg:max-w-5xl mx-auto w-full h-full">
        <div className="absolute bottom-8 left-6">
          <span className="text-3xl font-bold block mb-2">
            {title}
          </span>

          <div className="flex items-center gap-4">
            {type === MediaType.MOVIE && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Filme
              </Badge>
            )}

            {type === MediaType.SERIE && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Série
              </Badge>
            )}
            <span className="text-sm">
              ({duration} min)
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
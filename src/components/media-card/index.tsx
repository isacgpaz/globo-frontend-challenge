import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { Media } from "@/types/media";
import * as HoverCard from '@radix-ui/react-hover-card';
import Link from "next/link";

export function MediaCard({
  media
}: {
  media: Omit<Media, "movie" | "serie" | "director" | "artists">
}) {
  return (
    <HoverCard.Root openDelay={500}>
      <Link href={`/medias/${media.id}`}>
        <HoverCard.Trigger asChild>
          <Card className="max-w-lg px-6 pt-20 pb-6 bg-gradient-to-tr from-slate-950 to-blue-950 border-slate-800 shadow-2xl rounded-2xl cursor-pointer hover:scale-95 transition-all">
            <CardTitle className="text-base sm:text-xl text-primary-foreground text-ellipsis text-nowrap">
              {media.title}
            </CardTitle>
          </Card>
        </HoverCard.Trigger>
      </Link>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[240px] rounded-md bg-slate-300 p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div>
            {media.movieId && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Filme
              </Badge>
            )}

            {media.serieId && (
              <Badge variant="outline" className="bg-slate-400 uppercase text-[0.6rem] font-medium">
                Série
              </Badge>
            )}

            <strong className="font-medium block">
              {media.title}
              {' '}
              <span className="text-xs font-normal text-slate-500">
                ({dayjs(media.releaseDate).format('YYYY')})
              </span>

            </strong>

            <p className="text-sm">
              {media.description}
            </p>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
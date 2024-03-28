import { Media } from "@/types/media";
import { MediaCard } from "../media-card";

export function MediasGrid({
  medias
}: {
  medias: Omit<Media, "movie" | "serie" | "director" | "artists">[]
}) {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {medias.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  )
}
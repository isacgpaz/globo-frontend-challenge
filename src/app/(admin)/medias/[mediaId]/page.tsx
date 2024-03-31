'use client'

import { Loader } from "@/components/loader";
import { useMedia } from "@/modules/medias/get-media";
import { MediaType } from "@/types/media";
import { useParams } from "next/navigation";
import { MediaCover } from "./media-cover";
import { MediaInfo } from "./media-info";
import { SerieInfo } from "./serie-info";

export default function Media() {
  const params = useParams<{ mediaId: string }>()

  const { data: media, isPending } = useMedia(params.mediaId)

  if (isPending) {
    return (
      <div className="bg-gray-900 text-white min-h-screen">
        <Loader />
      </div>
    )
  }

  if (media) {
    let duration = 0

    if (media.movie) {
      duration = media.movie.duration
    }

    if (media.serie) {
      media.serie.seasons.forEach((season) => {
        season.episodes.map((episode) => {
          duration += episode.duration
        })
      })
    }

    return (
      <div className="bg-gray-900 text-white min-h-screen pb-24">
        <MediaCover
          title={media.title}
          duration={duration}
          type={media.type}
          mediaId={media.id}
          rate={media.averageRate}
        />

        <MediaInfo
          artists={media.artists}
          categories={media.categories}
          director={media.director}
          description={media.description}
        />

        {media.type === MediaType.SERIE && media.serie && (
          <SerieInfo serie={media.serie} />
        )}
      </div>
    )
  }

  return null
}
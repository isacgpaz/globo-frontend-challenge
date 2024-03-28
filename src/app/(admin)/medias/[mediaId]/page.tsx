'use client'

import { Loader } from "@/components/loader";
import { useMedia } from "@/modules/medias/get-media";
import { MediaType } from "@/types/media";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { MediaCover } from "./media-cover";
import { MediaInfo } from "./media-info";
import { SerieInfo } from "./serie-info";

export default function Media() {
  const params = useParams<{ mediaId: string }>()

  const { mutate, isPending, data: media } = useMedia()

  const getMedia = useCallback(() => {
    mutate(params.mediaId)
  }, [mutate, params.mediaId])

  useEffect(() => {
    getMedia()
  }, [getMedia])

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
      <div className="bg-gray-900 text-white min-h-screen mb-24">
        <MediaCover
          title={media.title}
          duration={duration}
          type={media.type}
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
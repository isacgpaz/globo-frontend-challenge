import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Serie } from "@/types/media";
import { useState } from "react";

export function SerieInfo({
  serie
}: { serie: Serie }) {
  const [selectedSeasonId, setSelectedSeasonId] = useState(serie.seasons[0].id)

  const selectedSeason = serie.seasons.find((season) => season.id === selectedSeasonId)

  return (
    <div className="px-6 mt-6">
      <span className="font-medium ">
        Temporadas
      </span>

      <Select
        defaultValue={serie.seasons[0].id}
        value={selectedSeasonId}
        onValueChange={setSelectedSeasonId}
      >
        <SelectTrigger className="mt-4 bg-transparent">
          <SelectValue placeholder="Selecionar temporada" />
        </SelectTrigger>
        <SelectContent>
          {serie.seasons.map((season, index) => (
            <SelectItem key={season.id} value={season.id}>
              Temporada {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ul className="flex flex-col gap-3">
        {selectedSeason?.episodes.map((episode, index) => (
          <li key={episode.id}>
            <Card className="p-2 mt-4 flex gap-4 bg-slate-300">
              <div className="w-20 h-20 bg-slate-500 rounded-sm" />

              <div className="py-2">
                <CardTitle className="p-0 text-base">
                  Episódio {index + 1}
                </CardTitle>

                <CardDescription className="p-0 text-xs">
                  {episode.description}
                </CardDescription>

                <span className="text-xs text-slate-500 mt-3 block">
                  {episode.duration} min
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
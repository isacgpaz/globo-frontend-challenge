import { Artist } from "./artist"
import { Category } from "./category"
import { Director } from "./director"

export enum MediaType {
  MOVIE = 'MOVIE',
  SERIE = 'SERIE'
}

export enum ParentalRating {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG_13',
  R = 'R',
  NC_17 = 'NC_17'
}

export type Media = {
  id: string,
  title: string,
  description: string,
  type: MediaType,
  releaseDate: Date,
  parentalRating: ParentalRating,
  createdAt: Date,
  updatedAt: Date,
  directorId: string,
  movieId: string | null,
  serieId: string | null,
  artists: Artist[]
  categories: Category[]
  director: Director
  serie: Serie | null,
  movie: Movie | null
}

export type Serie = {
  id: string,
  seasons: Season[]
}

type Season = {
  id: string,
  episodes: Episode[]
}

type Episode = {
  id: string,
  title: string,
  description: string,
  duration: number
}

export type Movie = {
  id: string,
  duration: number
}
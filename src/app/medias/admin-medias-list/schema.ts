import { MediaType } from "@/types/media";
import { z } from "zod";

export const mediaFiltersType = z.enum([
  'all', MediaType.MOVIE, MediaType.SERIE
], {
  invalid_type_error: 'Tipo de mídia é obrigatório.',
  required_error: 'Tipo de mídia é obrigatório.'
})

export const mediaFiltersSchema = z.object({
  title: z.string({
    required_error: 'Título é obrigatório.',
    invalid_type_error: 'Título é obrigatório.',
  })
    .min(1, 'Título é obrigatório.'),
  type: mediaFiltersType,
  artistsIds: z.array(z.string({
    invalid_type_error: 'Artista é obrigatório.',
    required_error: 'Artista é obrigatório.'
  })
    .min(1, 'Artistas são obrigatórios.'
    ))
    .min(1, 'Artistas são obrigatórios.'),
  categoriesIds: z.array(z.string({
    invalid_type_error: 'Categoria é obrigatório.',
    required_error: 'Categoria é obrigatório.'
  })
    .min(1, 'Categorias são obrigatórios.'
    ))
    .min(1, 'Artistas são obrigatórios.'),
  directorId: z.string({
    invalid_type_error: 'Diretor é obrigatório.',
    required_error: 'Diretor é obrigatório.'
  }).min(1, 'Diretor é obrigatórios.'),
})

export type MediaFiltersSchema = z.infer<typeof mediaFiltersSchema>

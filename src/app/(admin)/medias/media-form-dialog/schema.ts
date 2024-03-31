import { MediaType, ParentalRating } from "@/types/media";
import { z } from "zod";

export const mediaSchema = z.object({
  id: z.string().optional(),
  title: z.string({
    required_error: 'Título é obrigatório.',
    invalid_type_error: 'Título é obrigatório.',
  })
    .min(1, 'Título é obrigatório.'),
  description: z.string({
    required_error: 'Descrição é obrigatória.',
    invalid_type_error: 'Descrição é obrigatória.',
  })
    .min(1, 'Descrição é obrigatória.'),
  releaseDate: z
    .date({
      required_error: 'Data de lançamento é obrigatória.',
      invalid_type_error: 'Data de lançamento é obrigatória.',
    }),
  parentalRating: z.nativeEnum(ParentalRating, {
    invalid_type_error: 'Nível de acesso é obrigatório.',
    required_error: 'Nível de acesso é obrigatório.'
  }),
  type: z.nativeEnum(MediaType, {
    invalid_type_error: 'Tipo de mídia é obrigatório.',
    required_error: 'Tipo de mídia é obrigatório.'
  }),
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
  movie: z.object({
    duration: z.coerce.number()
      .int('A duração deve ser um número inteiro.')
      .positive('A duração deve ser um número positivo'),
  }).optional(),
  serie: z.object({
    seasons: z.array(z.object({
      episodes: z.array(z.object({
        title: z.string({
          required_error: 'Título é obrigatório.',
          invalid_type_error: 'Título é obrigatório.',
        })
          .min(1, 'Título é obrigatório.'),
        description: z.string({
          required_error: 'Descrição é obrigatória.',
          invalid_type_error: 'Descrição é obrigatória.',
        })
          .min(1, 'Descrição é obrigatória.'),
        duration: z.coerce.number()
          .int('A duração deve ser um número inteiro.')
          .positive('A duração deve ser um número positivo')
      }))
    })
    )
  }).optional()
})

export const seasonSchema = z.object({
  episodes: z.array(z.object({
    title: z.string({
      required_error: 'Título é obrigatório.',
      invalid_type_error: 'Título é obrigatório.',
    })
      .min(1, 'Título é obrigatório.'),
    description: z.string({
      required_error: 'Descrição é obrigatória.',
      invalid_type_error: 'Descrição é obrigatória.',
    })
      .min(1, 'Descrição é obrigatória.'),
    duration: z.coerce.number()
      .int('A duração deve ser um número inteiro.')
      .positive('A duração deve ser um número positivo'),
  }))
})

export type MediaSchema = z.infer<typeof mediaSchema>
export type SeasonSchema = z.infer<typeof seasonSchema>
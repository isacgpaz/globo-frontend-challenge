import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string({
    invalid_type_error: 'Nome é obrigatório.',
    required_error: 'Nome é obrigatório.',
  }).min(1, 'Nome é obrigatório.'),
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
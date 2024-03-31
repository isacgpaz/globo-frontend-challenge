import { AccessLevel } from "@/types/user"
import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string({
    invalid_type_error: 'Nome é obrigatório.',
    required_error: 'Nome é obrigatório.',
  }).min(1, 'Nome é obrigatório.'),
  accessLevel: z.nativeEnum(AccessLevel, {
    invalid_type_error: 'Nível de acesso é obrigatório.',
    required_error: 'Nível de acesso é obrigatório.',
  }),
  email: z.string({
    invalid_type_error: 'O email é obrigatório.',
    required_error: 'O email é obrigatório.',
  })
    .email('Email inválido.'),
  password: z.string({
    invalid_type_error: 'A senha é obrigatório.',
    required_error: 'A senha é obrigatório.',
  })
    .min(8, 'A senha deve conter pelo menos 8 caracteres.')
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
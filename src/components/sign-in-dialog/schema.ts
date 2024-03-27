import { z } from "zod"

export const signInSchema = z.object({
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

export type SignInSchema = z.infer<typeof signInSchema>
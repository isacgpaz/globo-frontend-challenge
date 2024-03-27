export enum AccessLevel {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type User = {
  id: string,
  name: string,
  email: string,
  accessLevel: AccessLevel
}
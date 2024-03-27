export enum AccessLevel {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum UserStatus {
  ENABLED = 'ENABLED',
  BLOCKED = 'BLOCKED'
}

export type User = {
  id: string,
  name: string,
  email: string,
  accessLevel: AccessLevel,
  status: UserStatus
}
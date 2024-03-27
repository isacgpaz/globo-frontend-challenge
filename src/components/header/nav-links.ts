import { Clapperboard, Home, Megaphone, Popcorn, Stars, Tag, Users } from "lucide-react";

export const PUBLIC_NAV_LINKS = [
  {
    href: '/',
    label: 'Início',
    icon: Home
  },
  {
    href: '/movies',
    label: 'Filmes',
    icon: Clapperboard
  },
  {
    href: '/series',
    label: 'Séries',
    icon: Popcorn
  },
]

export const ADMIN_NAV_LINKS = [
  {
    href: '/categories',
    label: 'Categorias',
    icon: Tag
  },
  {
    href: '/directors',
    label: 'Diretores',
    icon: Megaphone
  },
  {
    href: '/artists',
    label: 'Artistas',
    icon: Stars
  },
  {
    href: '/users',
    label: 'Usuários',
    icon: Users
  },
]
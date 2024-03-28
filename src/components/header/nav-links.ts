import { Clapperboard, Film, Megaphone, Stars, Tag, Users } from "lucide-react";

export const PUBLIC_NAV_LINKS = [
  {
    href: '/medias',
    label: 'Mídias',
    icon: Clapperboard
  },
]

export const ADMIN_NAV_LINKS = [
  {
    href: '/medias',
    label: 'Mídias',
    icon: Film
  },
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
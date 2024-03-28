import { useAuthContext } from "@/contexts/auth-context";
import { AccessLevel } from "@/types/user";
import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ADMIN_NAV_LINKS, PUBLIC_NAV_LINKS } from "./nav-links";

export function NavList() {
  const { user } = useAuthContext();

  return (
    <nav className="flex-1 mt-4 lg:mt-0 lg:flex-none lg:px-5">
      <ul className="flex flex-col lg:flex-row lg:gap-6">
        <li>
          <Button
            asChild
            variant='link'
            size='sm'
            className="px-0 text-slate-500 transition-all hover:no-underline hover:text-primary hover:scale-110"
          >
            <Link href='/' className="flex">
              <Home className='w-4 h-4 mr-2' />
              Início
            </Link>
          </Button>
        </li>

        {user?.accessLevel === AccessLevel.ADMIN ?
          ADMIN_NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Button
                asChild
                variant='link'
                size='sm'
                className="px-0 text-slate-500 transition-all hover:no-underline hover:text-primary hover:scale-110"
              >
                <Link href={href} className="flex">
                  <Icon className='w-4 h-4 mr-2' />
                  {label}
                </Link>
              </Button>
            </li>
          )) : (
            PUBLIC_NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Button
                  asChild
                  variant='link'
                  size='sm'
                  className="px-0 text-slate-500 transition-all hover:no-underline hover:text-primary hover:scale-110"
                >
                  <Link href={href} className="flex">
                    <Icon className='w-4 h-4 mr-2' />
                    {label}
                  </Link>
                </Button>
              </li>
            ))
          )
        }
      </ul>
    </nav>
  )
}
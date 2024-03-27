import Link from "next/link";
import { Button } from "../ui/button";
import { NAV_LINKS } from "./nav-links";

export function NavList() {
  return (
    <nav className="flex-1 mt-4 sm:mt-0 sm:flex-none sm:px-5">
      <ul className="flex flex-col sm:flex-row sm:gap-6">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
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
        ))}
      </ul>
    </nav>
  )
}
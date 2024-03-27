import { LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { HeaderDrawer } from "./header-drawer";
import { NavList } from "./nav-list";

export function Header() {
  return (
    <header className="h-20 flex items-center bg-gray-800 px-4">
      <HeaderDrawer />

      <div className="max-w-7xl w-full mx-auto flex justify-between">
        <Button asChild variant='link' className="hover:no-underline">
          <Link href='/' className="text-xl font-bold text-primary-foreground block">
            Media Reviews
          </Link>
        </Button>

        <div className="flex gap-2">
          <div className="hidden sm:flex">
            <NavList />
          </div>

          <Button size='sm' className="mr-2 md:mr-0 transition-all hover:scale-95">
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </div>
      </div>
    </header>
  )
}
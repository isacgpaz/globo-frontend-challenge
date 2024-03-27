'use client'

import { useIsClient } from "@uidotdev/usehooks";
import Link from "next/link";
import { SignInDialog } from "../sign-in-dialog";
import { Button } from "../ui/button";
import { HeaderDrawer } from "./header-drawer";
import { NavList } from "./nav-list";

export function Header() {
  const isClient = useIsClient()

  if (isClient === false) {
    return null
  }

  return (
    <header className="h-20 flex items-center bg-gray-800 px-4">
      <HeaderDrawer />

      <div className="max-w-xl sm:max-w-7xl w-full mx-auto flex justify-between">
        <Button asChild variant='link' className="hover:no-underline p-0">
          <Link href='/' className="text-xl font-bold text-primary-foreground block">
            Media Reviews
          </Link>
        </Button>

        <div className="flex gap-2 mr-2 sm:mr-0">
          <div className="hidden sm:flex">
            <NavList />
          </div>

          <SignInDialog />
        </div>
      </div>
    </header>
  )
}
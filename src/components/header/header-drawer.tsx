import { AlignLeft, CircleArrowLeft, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Separator } from "../ui/separator";
import { NavList } from "./nav-list";

export function HeaderDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button size='icon' variant='ghost' className="sm:hidden text-primary-foreground">
          <AlignLeft className="w-4 h-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className="bg-gray-900 py-6 border-gray-800 flex flex-col rounded-none rounded-tr-xl rounded-br-xl max-w-56 md:max-w-56 h-full fixed bottom-0 right-0"
        showIsland={false}
      >
        <div className="flex-1 flex flex-col relative">
          <DrawerClose className="absolute top-10 -right-10 -translate-x-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full transition-all hover:scale-90">
            <CircleArrowLeft className="w-6 h-6" />
          </DrawerClose>

          <DrawerHeader className="items-start text-left">
            <DrawerTitle className="text-primary">
              Media Reviews
            </DrawerTitle>

            <DrawerDescription className="text-xs">
              Seus filmes e séries favoritos
            </DrawerDescription>
          </DrawerHeader>

          <NavList />

          <Button size='sm' className="mx-6 mb-4 transition-all hover:scale-95">
            <LogIn className="w-4 h-4 mr-2" />
            Entrar
          </Button>

          <Separator className="w-[75%] mx-auto bg-slate-800" />

          <DrawerFooter className="justify-center items-center">
            <p className="text-center text-xs text-slate-500 leading-tight">
              Desenvolvido com amor e café
              <br />
              por <Link href="https://github.com/isacgpaz" className="hover:underline">
                Isac Paz
              </Link>
            </p>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
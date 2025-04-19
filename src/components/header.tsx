import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="border-b bg-[#ffe600] dark:bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image alt="logo" width={50} height={30} src={'/mercado-libre.png'}></Image>
          <span className="font-bold text-xl">Administrador de tienda</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

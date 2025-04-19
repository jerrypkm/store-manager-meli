"use client"
import { LuMoon, LuSun } from "react-icons/lu"
import { Button } from "@heroui/button"
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from "@heroui/dropdown"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">
          <LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onPress={() => setTheme('light')} key={'light'}>Claro</DropdownItem>
        <DropdownItem onPress={() => setTheme('dark')} key={'dark'}>Obscuro</DropdownItem>
        <DropdownItem onPress={() => setTheme('auto')} key={"system"}>Automático</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

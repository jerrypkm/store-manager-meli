"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LuCheck, LuChevronDown } from "react-icons/lu"
import { Button } from "@heroui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/services/store.service"
import { Skeleton } from "@heroui/skeleton"
import { categoryNames } from "@/utils/product.utils"

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const currentCategory = searchParams.get("category") || ""

  const { data: categories, isLoading } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
    refetchOnWindowFocus: false,
  })

  const searchCategory = () => {
    if(!currentCategory)
      return categoryNames['default']

    if(!categories) return ''

    const category = categories.find((category) => category.toLowerCase() === currentCategory.toLowerCase()) ||
        'default'

    return categoryNames[category]
  }

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    router.push(`/?${params.toString()}`)
    setOpen(false)
  }

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("category")
    router.push(`/?${params.toString()}`)
  }

  if (isLoading || !categories) {
    return <Skeleton className="rounded-lg w-56">
      <div className="h-10" />
    </Skeleton>
  }

  return (
    <div className="flex items-center gap-2">
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button variant="bordered" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
            {searchCategory()}
            <LuChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 flex flex-col items-start gap-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              onPress={() => {
                handleCategorySelect(category)
                setOpen(false)
              }}
              className={`w-full border-none flex px-2 py-2 text-sm justify-start text-start rounded hover:bg-muted ${currentCategory === category ? "font-semibold" : ''}`}
            >
              <LuCheck
                className={`mr-2 h-4 w-4 ${currentCategory === category ? "opacity-100" : "opacity-0"}`}
              />
              {categoryNames[category]}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      {currentCategory && (
        <Button variant="ghost" onPress={handleClearFilter}>
          Limpiar filtro
        </Button>
      )}
    </div>
  )
}

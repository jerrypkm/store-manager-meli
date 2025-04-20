import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LuSquarePen, LuStar } from "react-icons/lu"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"

import { Category } from "@/interfaces/product.interface"
import { BackButton } from "@/components/back-button"
const categoryNames: {[key: string]: string} = {
  [Category.Electronics]: 'Electrónicos',
  [Category.Jewelery]: 'Joyería',
  [Category.MenSClothing]: 'Ropa de hombre',
  [Category.WomenSClothing]: 'Ropa de mujer',
  default: 'Todas las categorías'
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const {id} = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  console.log(product)

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton></BackButton>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-muted/20 rounded-lg p-8 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain max-h-[400px] w-auto"
            style={{ maxWidth: "100%" }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <Chip variant="bordered" className="mb-2">
              {categoryNames[product.category]}
            </Chip>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <LuStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating.rate) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.rating.rate}) · {product.rating.count} reseñas
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>


          <div>
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={`/products/${product.id}/edit`}>
              <Button variant="bordered">
                <LuSquarePen className="mr-2 h-4 w-4" />
                Editar producto
              </Button>
            </Link>
            <Button variant="solid" color="danger">Eliminar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

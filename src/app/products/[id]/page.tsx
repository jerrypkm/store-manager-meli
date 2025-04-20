import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LuSquarePen, LuStar } from "react-icons/lu"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { BackButton } from "@/components/back-button"
import { getProduct } from "@/services/store.service"
import { categoryNames } from "@/utils/product.utils"
import { Product } from "@/interfaces/product.interface"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({
  params,
}: PageProps) {
  const { id } = await params;
  let product: Product;
  try{
    product = await getProduct(+id)
  }
  catch{
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton></BackButton>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-8 flex items-center justify-center">
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

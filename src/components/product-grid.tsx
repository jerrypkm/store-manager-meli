"use client"
import ProductCard from "./product-card"
import { Skeleton } from "@heroui/skeleton"
import useProducts from "@/hooks/useProducts"

export default function ProductGrid() {
  const { isFetching, localProducts }  = useProducts()

  if (isFetching) {
    return <ProductGridSkeleton />
  }

  if (localProducts?.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No se encontraron productos</h2>
        <p className="text-muted-foreground mt-2">Intenta seleccionar otra categoría o inténtalo de nuevo más tarde</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {localProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-4 space-y-3">
            <Skeleton className="rounded-lg h-40 w-full" />
            <Skeleton className="rounded-lg h-6 w-3/4" />
            <Skeleton className="rounded-lg h-4 w-1/2" />
            <Skeleton className="rounded-lg h-8 w-1/3" />
          </div>
        ))}
    </div>
  )
}

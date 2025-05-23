'use client'
import { notFound, useParams } from "next/navigation"
import ProductForm from "@/components/product-form"
import { BackButton } from "@/components/back-button"
// import { getProduct } from "@/services/store.service"
import { Product } from "@/interfaces/product.interface"
import { useEffect, useState } from "react"
import { getLocalProduct } from "@/utils/localstorage"

export default function EditProductPage() {
  // const { id } = await params;
  // let product: Product;
  // try{
  //   product = await getProduct(+id)
  // }
  // catch{
  //   notFound()
  // }

  const { id } = useParams()
  const [product, setProduct] = useState<Product>()


  useEffect(() => {
    try{
      const product = getLocalProduct(+id!)
      setProduct(product)
    }
    catch{
      notFound()
    }
  }, [id])

  if(!product) {
    return <></>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton></BackButton>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
        <ProductForm product={product} />
      </div>
    </div>
  )
}

import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { Button } from "@heroui/button"
import ProductForm from "@/components/product-form"

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0 border-none px-3">
            <LuArrowLeft className="mr-2 h-4 w-4" />
            Regresar a productos
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Agregar nuevo producto</h1>
        <ProductForm />
      </div>
    </div>
  )
}

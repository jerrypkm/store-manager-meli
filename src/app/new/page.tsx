import ProductForm from "@/components/product-form"
import { BackButton } from "@/components/back-button"

export default function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton></BackButton>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Agregar nuevo producto</h1>
        <ProductForm />
      </div>
    </div>
  )
}

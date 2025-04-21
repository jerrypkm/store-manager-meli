import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { addToast } from '@heroui/toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { addProduct, getCategories, updateProduct } from '@/services/store.service'
import { createLocalProduct, updateLocalProduct } from '@/utils/localstorage'
import { Product } from '@/interfaces/product.interface'

const formSchema = z.object({
  title: z.string().min(3, {
    message: "El título debe tener al menos 3 caracteres.",
  }),
  price: z.coerce.number({message: 'El precio no es válido'}).min(0.01, { message: "Price must be greater than 0." }),
  description: z.string().min(10, {
    message: "La descripción del producto debe tener al menos 10 caracteres",
  }),
  image: z.string().url({ message: "Por favor ingresa una URL válida" }),
  category: z.string().min(1, { message: "Por favor selecciona una categoría" }),
})
type CreateProductValues = z.infer<typeof formSchema>

interface Props {
  product?: Product
}

const useProductForm = ({product}: Props) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: {errors}, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price || undefined,
      description: product?.description || "",
      image: product?.image || "",
      category: product?.category || "",
    },
  })
  const { data: categories } = useQuery({
    queryFn: getCategories,
    queryKey: ['categories'],
    refetchOnWindowFocus: false,
  })
  async function onSubmit(values: CreateProductValues) {

    setIsSubmitting(true)
    try {
      if (product) {
        const updated = await updateProduct(product.id, values)
        updateLocalProduct(updated)
        addToast({
          title: "Producto actualizado",
          description: "El producto se ha actualizado existosamente",
        })
        router.push(`/products/${product.id}`)
      } else {
        const newProduct = await addProduct(values)
        createLocalProduct(newProduct)
        addToast({
          title: "Producto añadido",
          description: "El producto fue añadido exitosamente",
        })
        router.push(`/products/${newProduct.id}`)
      }
    } catch (error) {
      console.error(error)
      addToast({
        title: "Error",
        description: "Error al guardar el producto. Inténtalo de nuevo más tarde",
        color: "warning",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    register,
    onSubmit,
    router,
    categories,
    errors,
    control,
    isSubmitting
  }
}

export default useProductForm
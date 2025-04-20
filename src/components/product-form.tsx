"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { Product } from "@/interfaces/product.interface"
import { Button } from "@heroui/button"
import { Input, Textarea } from "@heroui/input"
import { Form } from "@heroui/form"
import { addToast } from "@heroui/toast"
import { Select, SelectItem } from "@heroui/select"
import { useQuery } from "@tanstack/react-query"
import { addProduct, getCategories } from "@/services/store.service"
import { categoryNames } from "@/utils/product.utils"

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

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof formSchema>>({
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
    queryKey: ['categories']
  })
  async function onSubmit(values: CreateProductValues) {

    setIsSubmitting(true)
    try {
      if (product) {
      } else {
        const newProduct = await addProduct(values)
        addToast({
          title: "Producto añadido",
          description: "El producto fue añadido exitosamente",
        })

        console.log(newProduct)
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 grid grid-cols-1 gap-4">
        <Input
          isRequired
          size="lg"
          label="Título del producto"
          labelPlacement="outside"
          placeholder="Título del producto"
          type="text"
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
          {...register('title')}
        />
        <Input
          isRequired
          size="lg"
          label="Precio"
          labelPlacement="outside"
          placeholder="0.00"
          type="text"
          startContent={<span>$</span>}
          isInvalid={!!errors.price}
          errorMessage={errors.price?.message}
          {...register('price')}
        />
        <Textarea
          isRequired
          size="lg"
          label="Descripción"
          labelPlacement="outside"
          placeholder="Descripción del producto"
          type="text"
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
          {...register('description')}
        />
        <Input
          isRequired
          size="lg"
          label="URL de la imagen"
          labelPlacement="outside"
          placeholder="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
          type="text"
          isInvalid={!!errors.image}
          errorMessage={errors.image?.message}
          {...register('image')}
        />
        <Select 
          isRequired
          size="lg"
          label="Categoría del producto"
          labelPlacement="outside"
          placeholder="Selecciona una categoría"
          isInvalid={!!errors.category}
          errorMessage={errors.category?.message}
          {...register('category')}
        >
          {categories ? categories.map((category) => (
            <SelectItem key={category}>{categoryNames[category]}</SelectItem>
          )): <></>}
        </Select>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="bordered" onPress={() => router.back()}>
            Cancelar
          </Button>
          <Button isLoading={isSubmitting} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (product ? "Actualizando..." : "Creando...") : product ? "Actualizar producto" : "Crear producto"}
          </Button>
        </div>
    </Form>
  )
}

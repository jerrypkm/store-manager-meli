"use client"
import { type Product } from "@/interfaces/product.interface"
import { Button } from "@heroui/button"
import { Input, Textarea } from "@heroui/input"
import { Form } from "@heroui/form"
import { Select, SelectItem } from "@heroui/select"
import { categoryNames } from "@/utils/product.utils"
import { Controller } from "react-hook-form"
import { Skeleton } from "@heroui/skeleton"
import useProductForm from "@/hooks/useProductForm"

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const { categories, control, errors, handleSubmit, isSubmitting, onSubmit, register, router } = useProductForm({product})

  return (
    <Form onSubmit={handleSubmit(onSubmit)} data-testid="form" className="space-y-6 grid grid-cols-1 gap-4">
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
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            categories && categories.length > 0  ? (<Select 
              {...field}
              isRequired
              size="lg"
              label="Categoría del producto"
              defaultSelectedKeys={[product?.category ?? '']}
              labelPlacement="outside"
              placeholder="Selecciona una categoría"
              isInvalid={!!errors.category}
              errorMessage={errors.category?.message}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {categories.map((category) => (
                <SelectItem key={category}>{categoryNames[category]}</SelectItem>
              ))}
            </Select>) : <div className="flex flex-col gap-2 !mt-0 pt-0">
              <Skeleton className="h-4 w-32"></Skeleton>
              <Skeleton className="h-10"></Skeleton>
            </div>
          )}
        />

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

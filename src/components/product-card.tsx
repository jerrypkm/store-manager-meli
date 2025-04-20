"use client"
import Image from "next/image"
import Link from "next/link"
import { LuSquarePen, LuTrash2 } from "react-icons/lu"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Card, CardBody, CardFooter } from "@heroui/card"
import { Modal, ModalContent, useDisclosure, ModalHeader, ModalFooter, ModalBody } from "@heroui/modal"
import type { Product } from "@/interfaces/product.interface"
import { categoryNames } from "@/utils/product.utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "@/services/store.service"
interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const { mutate: deleteProd, isPending } = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['products'] })
    }
  })

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="relative bg-white pt-4 px-4 flex items-center justify-center h-48 bg-muted/20">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          className="object-contain max-h-full w-auto"
          style={{ maxWidth: "100%" }}
        />
      </div>
      <CardBody className="p-4 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium line-clamp-2 text-sm">{product.title}</h3>
          <Chip variant="bordered" className="whitespace-nowrap">
            ${product.price.toFixed(2)}
          </Chip>
        </div>
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
        <Chip variant="flat" className="mt-3">
          {categoryNames[product.category]}
        </Chip>
      </CardBody>
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Link href={`/products/${product.id}`} className="flex-1">
          <Button variant="flat" className="w-full">
            Ver detalles
          </Button>
        </Link>
        <div className="flex gap-2">
          <Link href={`/products/${product.id}/edit`}>
            <Button isIconOnly variant="bordered">
              <LuSquarePen className="h-4 w-4" />
            </Button>
          </Link>
          <Button onPress={onOpen} isIconOnly variant="bordered" className="text-red-500">
            <LuTrash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {
            (onClose) => (
            <>
                <ModalHeader className="flex flex-col">
                  ¿Estás seguro que deseas eliminar el producto {product.title}?               
                </ModalHeader>
                <ModalBody>
                  El producto será eliminado, esta acción no se puede deshacer.
                </ModalBody>
                <ModalFooter>
                  <Button onPress={onClose}>Cancel</Button>
                  <Button isLoading={isPending} onPress={() => deleteProd()} color="danger">{isPending ? 'Eliminando...' : 'Eliminar'}</Button>
                </ModalFooter>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </Card>
  )
}

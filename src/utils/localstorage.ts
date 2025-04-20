'use client'
import { Product } from "@/interfaces/product.interface"
import { ProductsResponse } from "@/interfaces/service.interface"

export const getLocalStorageProducts = (): ProductsResponse => {
  const products = JSON.parse(localStorage.getItem('products') as string ?? '[]' ) as ProductsResponse
  return products
}

export const setLocalStorageProducts = (products: ProductsResponse) => {
  localStorage.setItem('products', JSON.stringify(products))
}

export const deleteLocalProduct = (productId: number) => {
  const products = getLocalStorageProducts()
  if(products.length === 0)
    return

  const updated = products.filter((p: Product) => p.id !== productId)
  setLocalStorageProducts(updated)
}

export const updateLocalProduct = (product: Product) => {
  const products = getLocalStorageProducts()
  if(products.length === 0){
    return
  }
  const updated = products.map((p: Product) => {
    if(p.id === product.id) {
      console.log(p, product)
      return {
        ...p,
        ...product
      }
    }
    else {
      return p
    }
  })

  setLocalStorageProducts(updated)
}

export const createLocalProduct = (product: Product) => {
  const products = getLocalStorageProducts()
  if(products.findIndex((p: Product) => p.title === product.title) !== -1){
    throw new Error('Producto existente')
  }
  products.push(product)

  setLocalStorageProducts(products)
} 

export const getLocalProduct = (productId: number): Product | undefined => {
  const products = getLocalStorageProducts()
  const foundProduct = products.find((p: Product) => p.id === productId)

  if(!foundProduct){
    return undefined
  }

  return foundProduct
}
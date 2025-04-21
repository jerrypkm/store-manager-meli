'use server'
import { Category, Product, ProductInput } from "@/interfaces/product.interface";
import type { ProductsResponse, CategoriesResponse } from "@/interfaces/service.interface";
import { revalidatePath } from "next/cache";
const storeBaseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getProducts = async (category?: Category): Promise<ProductsResponse> => {   
  const categoryPath = category ? `/category/${category}` : ''
  const response = await fetch(
    `${storeBaseURL}/products${categoryPath}`,
    {
      method: 'GET',
    }
  )

  if(!response.ok){
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const products: ProductsResponse = await response.json();

  return products
}

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(
    `${storeBaseURL}/products/${id}`,
    {
      method: 'GET',
      cache: 'no-store'
    },
  )

  if(!response.ok){
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const product: Product = await response.json();

  return product
}

export const getCategories = async (): Promise<CategoriesResponse> => {   
  const response = await fetch(
    `${storeBaseURL}/products/categories`,
    {
      method: 'GET',
    }
  )

  if(!response.ok){
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const categories: CategoriesResponse = await response.json();

  return categories
}

export const addProduct = async(product: ProductInput) => {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const newProduct = await response.json()
  revalidatePath("/")
  return newProduct
}

export async function updateProduct(id: number, productToUpdate: ProductInput): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productToUpdate),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const updatedProduct: Product = await response.json()
  revalidatePath("/")
  revalidatePath(`/products/${id}`)
  
  return updatedProduct
}

export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(
    `${storeBaseURL}/products/${id}`,
    {
      method: 'DELETE'
    },
  )

  if(!response.ok){
    throw new Error('Network response was not ok, status:' + response.status)
  }

  const product = await response.json();
  return product
}
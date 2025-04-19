'use server'
import { Category, ProductInput } from "@/interfaces/product.interface";
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
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error("Failed to add product")
    }

    const newProduct = await response.json()
    revalidatePath("/")
    return newProduct
  } catch (error) {
    console.error("Error adding product:", error)
    throw error
  }
}
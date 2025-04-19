import { ProductsResponse, CategoriesResponse } from "@/interfaces/service.interface";
const storeBaseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getProducts = async (): Promise<ProductsResponse> => {   
  const response = await fetch(
    `${storeBaseURL}/products`,
    {
      method: 'GET',
    }
  )
  if(!response.ok){
    throw new Error('Network response was not ok, status:' + response.status)
  }
  const data: ProductsResponse = await response.json();

  return data
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
  const data: CategoriesResponse = await response.json();

  return data
}
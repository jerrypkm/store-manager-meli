import { useEffect, useState } from 'react'
import { Category, Product } from '@/interfaces/product.interface'
import { getProducts } from '@/services/store.service'
import { getLocalStorageProducts } from '@/utils/localstorage'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const useProducts = () => {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [allowFetch, setAllowFetch] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>()

  const { data: apiProducts, isFetching, isSuccess } = useQuery({
    queryFn: () => getProducts(categoryParam?.toLowerCase() as Category),
    queryKey: ['products'],
    refetchOnWindowFocus: false,
    enabled: allowFetch
  }) 

  useEffect(() => {
    const stored = getLocalStorageProducts()
    setLocalProducts(stored)
    if(stored.length === 0) {
      setAllowFetch(true)
    }
  }, [])

  useEffect(() => {
    const stored = getLocalStorageProducts()
    if(categoryParam){
      setLocalProducts(stored.filter((product) => product.category === categoryParam))
    }
    else {
      setLocalProducts(stored)
    }
  }, [categoryParam])

  useEffect(() => {
    if (isSuccess && apiProducts) {
      localStorage.setItem("products", JSON.stringify(apiProducts))
      setLocalProducts(apiProducts)
    }
  }, [isSuccess, apiProducts])

  return {
    isFetching,
    localProducts,
  }
}

export default useProducts
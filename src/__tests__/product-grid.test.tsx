/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { render, screen } from '@testing-library/react'
import ProductGrid from '@/components/product-grid'
import { describe, expect, it, vi } from 'vitest'
import { Category } from '@/interfaces/product.interface'

vi.mock('@/hooks/useProducts', () => {
  return {
    default: vi.fn(() => ({
      isFetching: false,
      localProducts: []
    }))
  }
})


vi.mock('@/components/product-card', () => ({
  default: ({ product }: any) => <div>{product.title}</div>
}))

const useProducts = vi.mocked(await import('@/hooks/useProducts')).default


describe('ProductGrid', () => {
  it('muestra los skeletons cuando está cargando', () => {
    useProducts.mockReturnValue({
      isFetching: true,
      localProducts: []
    })
  
    render(<ProductGrid />)
  
    const skeletons = screen.queryAllByRole('generic')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('muestra mensaje cuando no hay productos', () => {
    useProducts.mockReturnValue({
      isFetching: false,
      localProducts: []
    })

    render(<ProductGrid />)

    expect(screen.getByText(/No se encontraron productos/i)).toBeInTheDocument()
    expect(screen.getByText(/Intenta seleccionar otra categoría/i)).toBeInTheDocument()
  })

  it('renderiza productos correctamente', () => {
    useProducts.mockReturnValue({
      isFetching: false,
      localProducts: [
        { id: 1, title: 'Producto 1', category: Category.Electronics, description: 'Esta es una descropcion de ejemplo', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg&w=384&q=75', price: 200, rating: {count: 3, rate: 5} },
        { id: 2, title: 'Producto 2', category: Category.Electronics, description: 'Esta es una descropcion de ejemplo', image: 'http://localhost:3000/_next/image?url=https%3A%2F%2Ffakestoreapi.com%2Fimg%2F71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg&w=384&q=75', price: 200, rating: {count: 3, rate: 5} },
      ]
    })

    render(<ProductGrid />)
    expect(screen.getByText('Producto 1')).toBeInTheDocument()
    expect(screen.getByText('Producto 2')).toBeInTheDocument()
  })
})
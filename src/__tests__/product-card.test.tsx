/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '@/components/product-card'
import { describe, expect, it, vi } from 'vitest'
import { Category, Product } from '@/interfaces/product.interface'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 🧪 Mocks
vi.mock('@/services/store.service', () => ({
  deleteProduct: vi.fn(),
}))
vi.mock('@/utils/localstorage', () => ({
  deleteLocalProduct: vi.fn(),
}))
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))
vi.mock('@tanstack/react-query', async () => {
  const actual = await import('@tanstack/react-query') as any

  return {
    ...actual,
    useMutation: () => ({ mutate: vi.fn(), isPending: false }),
    useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  }
})

// 🧪 Producto falso
const mockProduct: Product = {
  id: 1,
  title: 'Camiseta',
  description: 'Cómoda y suave',
  price: 299.99,
  category: Category.MenSClothing,
  image: '/camiseta.png',
  rating: { rate: 4.8, count: 12 },
}

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('ProductCard', () => {
  it('renderiza correctamente el producto', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Camiseta')).toBeInTheDocument()
    expect(screen.getByText('Cómoda y suave')).toBeInTheDocument()
    expect(screen.getByText('$299.99')).toBeInTheDocument()
    expect(screen.getByText('Ver detalles')).toBeInTheDocument()
  })

  it('abre el modal al hacer clic en eliminar', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)

    const deleteBtn = screen.getAllByRole('button').find(btn =>
      btn.className.includes('text-red-500')
    )!

    fireEvent.click(deleteBtn)

    expect(screen.getByText(/¿Estás seguro que deseas eliminar el producto Camiseta\?/)).toBeInTheDocument()
  })
})
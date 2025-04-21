/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/category-filter', () => ({
  default: () => <div data-testid="category-filter" />,
}))

vi.mock('@/components/product-grid', () => ({
  default: () => <div data-testid="product-grid" />,
}))

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

describe('Home Page', () => {
  it('renderiza el título, descripción y botón', () => {
    render(<Home />)

    expect(screen.getByText('Productos')).toBeInTheDocument()
    expect(screen.getByText(/Explora y admistra/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Agregar producto/i })).toBeInTheDocument()

    expect(screen.getByTestId('category-filter')).toBeInTheDocument()
    expect(screen.getByTestId('product-grid')).toBeInTheDocument()
  })
})
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react'
import ProductForm from '@/components/product-form'
import { describe, expect, it, vi } from 'vitest'

vi.mock('react-hook-form', async (importActual) => {
  const actual = await importActual() as any
  return {
    ...actual,
    Controller: ({ render }: any) => render({ field: { onChange: vi.fn(), value: '' } })
  }
})
const onSubmitMock = vi.fn()

vi.mock('@/hooks/useProductForm', () => ({
  default: () => ({
    categories: ['electronics', 'jewelery'],
    control: {
    },
    errors: {
    },
    isSubmitting: false,
    register: vi.fn(() => ({ name: '', onChange: vi.fn(), ref: vi.fn() })),
    handleSubmit: (cb: any) => (e: any) => {
      e.preventDefault()
      cb({
        title: 'Test',
        price: 9.99,
        description: 'Un producto de prueba',
        image: 'https://example.com/image.jpg',
        category: 'electronics'
      })
    },
    onSubmit: onSubmitMock,
    router: { back: vi.fn() }
  }),
}))

describe('ProductForm', () => {
  it('renderiza los campos del formulario', () => {
    render(<ProductForm />)

    expect(screen.getByLabelText(/Título del producto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/URL de la imagen/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Crear producto/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Cancelar/i })).toBeInTheDocument()
  })

  it('envía el formulario correctamente', () => {
    render(<ProductForm />)

    const form = screen.getByTestId('form')
    fireEvent.submit(form)

    expect(screen.getByRole('button', { name: /Crear producto/i })).toBeInTheDocument()
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
    expect(onSubmitMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test',
      price: 9.99,
      category: 'electronics'
    }))
  })
})
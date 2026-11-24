import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { ProductosProvider } from '../context/ProductosContext'
import Inicio from './Inicio'

describe('Página: Inicio', () => {
  it('Renderiza el mensaje de bienvenida y el botón para explorar el catálogo', () => {
    render(
      <MemoryRouter>
        <ProductosProvider>
          <CartProvider>
            <Inicio />
          </CartProvider>
        </ProductosProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('Bienvenido a Sonido Vivo')).toBeInTheDocument()
    expect(screen.getByText(/tu tienda especializada en instrumentos musicales/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /explorar catálogo/i })).toBeInTheDocument()
  })
})
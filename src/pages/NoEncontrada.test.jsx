import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { ProductosProvider } from '../context/ProductosContext'
import NoEncontrada from './NoEncontrada'

describe('Página: NoEncontrada', () => {
  it('Renderiza correctamente el código 404 y el botón de retorno al inicio', () => {
    render(
      <MemoryRouter>
        <ProductosProvider>
          <CartProvider>
            <NoEncontrada />
          </CartProvider>
        </ProductosProvider>
      </MemoryRouter>
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /volver al inicio/i })).toBeInTheDocument()
  })
})
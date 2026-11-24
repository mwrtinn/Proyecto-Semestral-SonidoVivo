import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { ProductosProvider } from '../context/ProductosContext'
import Registro from './MisPedidos'

describe('Página: Registro de Cuenta', () => {
  it('Renderiza correctamente el formulario de registro y el enlace hacia el login', () => {
    render(
      <MemoryRouter>
        <ProductosProvider>
          <CartProvider>
            <Registro />
          </CartProvider>
        </ProductosProvider>
      </MemoryRouter>
    )

    expect(screen.getByText(/¿ya tienes cuenta?/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /inicia sesión/i })).toBeInTheDocument()
  })
})
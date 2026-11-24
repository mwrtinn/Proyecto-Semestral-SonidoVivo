import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import { ProductosProvider } from '../../context/ProductosContext'
import PlantillaPublica from './PlantillaPublica'

describe('Template: PlantillaPublica', () => {
  it('Renderiza correctamente el contenido hijo dentro de la estructura principal', () => {
    render(
      <MemoryRouter>
        <ProductosProvider>
          <CartProvider>
            <PlantillaPublica>
              <div data-testid="contenido-hijo">Contenido de prueba</div>
            </PlantillaPublica>
          </CartProvider>
        </ProductosProvider>
      </MemoryRouter>
    )

    expect(screen.getByTestId('contenido-hijo')).toBeInTheDocument()
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })
})
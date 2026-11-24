
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext';
import { ProductosProvider } from '../context/ProductosContext';
import { CartProvider } from '../context/CartContext';

import MisPedidos from './MisPedidos';

describe('Página: MisPedidos', () => {

  it('Renderiza correctamente la página de pedidos', () => {

    sessionStorage.clear();

    render(
      <MemoryRouter>
        <AuthProvider>
          <ProductosProvider>
            <CartProvider>
              <MisPedidos />
            </CartProvider>
          </ProductosProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: 'Mis pedidos'
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'El historial aún no está conectado a la API.'
      )
    ).toBeInTheDocument();

  });

});

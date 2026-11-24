
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext';
import { ProductosProvider } from '../context/ProductosContext';
import { CartProvider } from '../context/CartContext';

import Registro from './Registro';

describe('Página: Registro de Cuenta', () => {

  it('Renderiza el formulario de registro correctamente', () => {

    sessionStorage.clear();

    render(
      <MemoryRouter>
        <AuthProvider>
          <ProductosProvider>
            <CartProvider>
              <Registro />
            </CartProvider>
          </ProductosProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: /crear cuenta/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Tu nombre')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('tu@correo.com')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /crear mi cuenta/i
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /^inicia sesión$/i
      })
    ).toHaveAttribute('href', '/login');

  });

});

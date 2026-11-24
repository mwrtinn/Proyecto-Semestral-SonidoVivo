import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TarjetaProducto from './TarjetaProducto'

describe('Molécula: TarjetaProducto', () => {
  const productoMock = {
    nombre: 'Guitarra Acústica',
    descripcion: 'Guitarra de 6 cuerdas ideal para estudio y directos',
    precio: 149990,
    stock: 5,
    imagen: '/img/guitarra.jpg'
  }

  it('renderiza correctamente el nombre, la descripción y la imagen del producto', () => {
    render(<TarjetaProducto {...productoMock} />)

    expect(screen.getByText('Guitarra Acústica')).toBeInTheDocument()
    expect(screen.getByText('Guitarra de 6 cuerdas ideal para estudio y directos')).toBeInTheDocument()
    
    const imagen = screen.getByAltText('Guitarra Acústica')
    expect(imagen).toBeInTheDocument()
    expect(imagen).toHaveAttribute('src', '/img/guitarra.jpg')
  })

  it('ejecuta la función onVerDetalle al hacer clic en el botón correspondiente', async () => {
    const handleVerDetalle = vi.fn()
    render(<TarjetaProducto {...productoMock} onVerDetalle={handleVerDetalle} />)

    const botonDetalle = screen.getByRole('button', { name: /ver detalle/i })
    await userEvent.click(botonDetalle)

    expect(handleVerDetalle).toHaveBeenCalledTimes(1)
  })

  it('permite agregar al carrito y habilita el botón cuando hay stock disponible', async () => {
    const handleAgregar = vi.fn()
    render(<TarjetaProducto {...productoMock} stock={3} onAgregarCarrito={handleAgregar} />)

    const botonAgregar = screen.getByRole('button', { name: /agregar al carrito/i })
    expect(botonAgregar).toBeEnabled()

    await userEvent.click(botonAgregar)
    expect(handleAgregar).toHaveBeenCalledTimes(1)
  })

  it('deshabilita la compra y muestra el texto Agotado cuando el stock es menor o igual a 0', () => {
    render(<TarjetaProducto {...productoMock} stock={0} />)

    expect(screen.getByRole('button', { name: /agotado/i })).toBeDisabled()
  })
})
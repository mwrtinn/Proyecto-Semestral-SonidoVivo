import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Boton from './Boton'

describe('Átomo: Boton', () => {
  it('Renderiza correctamente el texto recibido en props.texto', () => {
    render(<Boton texto="Ver Detalle" />)
    
    expect(screen.getByRole('button', { name: /ver detalle/i })).toBeInTheDocument()
  })

  it('Ejecuta la función onClick cuando el usuario hace clic', async () => {
    const onClickMock = vi.fn()
    render(<Boton texto="Agregar" onClick={onClickMock} />)

    const boton = screen.getByRole('button', { name: /agregar/i })
    await userEvent.click(boton)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('Respeta la prop disabled y deshabilita el botón', () => {
    render(<Boton texto="Agotado" disabled={true} />)
    
    expect(screen.getByRole('button', { name: /agotado/i })).toBeDisabled()
  })
})
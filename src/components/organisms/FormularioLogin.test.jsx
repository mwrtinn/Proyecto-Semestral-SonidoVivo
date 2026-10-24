import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioLogin from './FormularioLogin'

describe('Organismo: FormularioLogin', () => {
  it('Renderiza correctamente los campos de inicio de sesión y el botón de acceso', () => {
    render(<FormularioLogin />)

    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('tu@correo.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar a sonido vivo/i })).toBeInTheDocument()
  })

  it('Muestra mensajes de error al intentar enviar el formulario con campos vacíos', async () => {
    render(<FormularioLogin />)

    const botonSubmit = screen.getByRole('button', { name: /entrar a sonido vivo/i })
    await userEvent.click(botonSubmit)

    expect(screen.getByText('El correo es obligatorio.')).toBeInTheDocument()
    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument()
  })

  it('Ejecuta la función onEnviar cuando los datos ingresados son válidos', async () => {
    const handleEnviar = vi.fn()
    render(<FormularioLogin onEnviar={handleEnviar} />)

    const inputCorreo = screen.getByPlaceholderText('tu@correo.com')
    const inputClave = screen.getByPlaceholderText('********')
    const botonSubmit = screen.getByRole('button', { name: /entrar a sonido vivo/i })

    await userEvent.type(inputCorreo, 'contacto@sonidovivo.cl')
    await userEvent.type(inputClave, 'claveSegura123')
    await userEvent.click(botonSubmit)

    expect(handleEnviar).toHaveBeenCalledTimes(1)
  })
})
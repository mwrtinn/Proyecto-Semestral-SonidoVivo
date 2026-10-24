import { describe, it, expect } from 'vitest'
import { validarEmail, validarClave, validarObligatorio } from './validaciones'

describe('Utilidades de validación', () => {
  it('Valida correctamente el correo electrónico', () => {
    expect(validarEmail('')).toBe('El correo es obligatorio.')
    expect(validarEmail('correo-invalido')).toBe('Debes ingresar un correo válido.')
    expect(validarEmail('contacto@sonidovivo.cl')).toBe('')
  })

  it('Valida correctamente la contraseña', () => {
    expect(validarClave('')).toBe('La contraseña es obligatoria.')
    expect(validarClave('12345')).toBe('La contraseña debe tener al menos 6 caracteres.')
    expect(validarClave('claveSegura123')).toBe('')
  })

  it('Valida campos obligatorios genéricos', () => {
    expect(validarObligatorio('   ', 'El campo es obligatorio.')).toBe('El campo es obligatorio.')
    expect(validarObligatorio('Instrumento', 'El campo es obligatorio.')).toBe('')
  })
})
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTituloPagina } from './useTituloPagina'

describe('Hook: useTituloPagina', () => {
  it('Actualiza el título de la página con el formato correcto de Sonido Vivo', () => {
    renderHook(() => useTituloPagina('Catálogo'))

    expect(document.title).toBe('Catálogo | Sonido Vivo')
  })
})
// Import all themes (global)
import * as themes from '@/themes'

type ThemeName = keyof typeof themes
type ThemeFunc = (typeof themes)[ThemeName]

// Minimal, global API per ottenere una variante tema
export const ui = {
  variant(name: ThemeName): ThemeFunc {
    const theme = themes[name]
    if (typeof theme !== 'function') {
      throw new Error(`Theme "${String(name)}" not found`)
    }
    return theme as ThemeFunc
  },
  // Accesso diretto anche come ui.<nomeTema>
  ...themes,
}

// Esportazioni dirette dei temi se necessarie
export * from '@/themes'
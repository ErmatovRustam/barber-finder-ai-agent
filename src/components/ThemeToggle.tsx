import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getPreferredTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'dark' || stored === 'light') return stored
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle color theme">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}



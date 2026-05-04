import type { Metadata, Viewport } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['300', '400', '500', '600', '700'],
})

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'CyberCity Security System 2075'
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  'AI-powered real-time security for megacities — university ICT project'

// 1. Метаданные (SEO и заголовки)
export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: ['cyberpunk', 'AI security', 'smart city', 'surveillance', 'university project'],
}

// 2. Вьюпорт (Настройки отображения в браузере)
export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
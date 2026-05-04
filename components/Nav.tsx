'use client'

import { useState, useEffect } from 'react'
import { Shield, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Services', href: '#pricing' },
  { label: 'Multimedia', href: '#multimedia' },
  { label: 'Monitoring', href: '#monitoring' },
  { label: 'Chatbot', href: '#chatbot' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-neon-blue/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="CyberCity Security System">
          <Shield className="w-6 h-6 text-neon-blue group-hover:animate-pulse-glow transition-all" />
          <span className="font-display text-sm font-bold text-neon-blue tracking-widest uppercase hidden sm:block">
            CCSS<span className="text-foreground/60">2075</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-foreground/60 hover:text-neon-blue transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#monitoring"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-neon-blue/10 border border-neon-blue/40 text-neon-blue text-sm font-semibold rounded tracking-wider uppercase hover:bg-neon-blue/20 hover:border-neon-blue/70 transition-all duration-200 glow-blue font-display"
        >
          Live Monitor
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground/70 hover:text-neon-blue transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-b border-neon-blue/20 px-4 pb-4">
          <ul className="flex flex-col gap-3" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-foreground/70 hover:text-neon-blue transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

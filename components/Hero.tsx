'use client'

import { useRef, useState } from 'react'
import { Volume2, VolumeX, ChevronDown } from 'lucide-react'

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'CyberCity Security System 2075'
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  'AI-powered real-time security for megacities'
const musicUrl = process.env.NEXT_PUBLIC_MUSIC_URL ?? ''

const STATS = [
  { value: '99.7%', label: 'Threat Detection Rate' },
  { value: '2.4ms', label: 'Response Time' },
  { value: '847K', label: 'Cameras Online' },
  { value: '24/7', label: 'Active Monitoring' },
]

export default function Hero() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cyberpunk-city.jpg')" }}
        role="presentation"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0a0a0f]/70" />
      <div className="absolute inset-0 hero-grid-bg opacity-40" />
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div
          className="absolute w-full h-px bg-neon-blue"
          style={{ animation: 'scanline 6s linear infinite' }}
        />
      </div>

      {/* Music button */}
      {musicUrl && (
        <>
          <audio ref={audioRef} src={musicUrl} loop />
          <button
            onClick={toggleMusic}
            className="absolute top-20 right-4 sm:right-6 z-10 flex items-center gap-2 px-3 py-2 glass-card rounded text-neon-blue text-xs font-display tracking-wider hover:glow-blue transition-all"
            aria-label={playing ? 'Pause background music' : 'Play background music'}
          >
            {playing ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{playing ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>
        </>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-glow" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            System Status: Online
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black text-balance leading-tight mb-6">
          <span className="text-foreground">CyberCity</span>
          <br />
          <span className="text-neon-blue glow-text-blue">Security</span>{' '}
          <span className="text-neon-cyan glow-text-cyan">System</span>
          <br />
          <span className="text-foreground/80 text-3xl sm:text-4xl lg:text-5xl">2075</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-10">
          {siteDescription}. Protecting millions of citizens through advanced computer vision,
          autonomous drone fleets, and predictive threat intelligence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a
            href="#overview"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-neon-blue text-[#0a0a0f] font-display font-bold text-sm tracking-widest uppercase rounded hover:bg-neon-cyan transition-all duration-200 glow-blue"
          >
            Explore System
          </a>
          <a
            href="#monitoring"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border border-neon-blue/50 text-neon-blue font-display font-bold text-sm tracking-widest uppercase rounded hover:bg-neon-blue/10 hover:border-neon-blue transition-all duration-200"
          >
            Check Threat Level
          </a>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card rounded p-4 cyber-border">
              <div className="font-display text-2xl font-bold text-neon-blue glow-text-blue">
                {stat.value}
              </div>
              <div className="text-xs text-foreground/50 mt-1 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#overview"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-foreground/30 hover:text-neon-blue transition-colors animate-float"
        aria-label="Scroll to overview"
      >
        <span className="text-xs tracking-widest uppercase font-display">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  )
}

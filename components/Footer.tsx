import { Shield, Github, ExternalLink, GraduationCap } from 'lucide-react'

const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? 'Student Name'
const teacherName = process.env.NEXT_PUBLIC_TEACHER_NAME ?? 'Teacher Name'
const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE ?? 'CyberCity Security System 2075'

const NAV_SECTIONS = [
  { label: 'Overview',   href: '#overview' },
  { label: 'Services',   href: '#pricing' },
  { label: 'Multimedia', href: '#multimedia' },
  { label: 'AI Avatar',  href: '#avatar' },
  { label: 'Monitoring', href: '#monitoring' },
  { label: 'Chatbot',    href: '#chatbot' },
  { label: 'Reflection', href: '#reflection' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-neon-blue/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-neon-blue" aria-hidden="true" />
              <span className="font-display text-sm font-bold text-neon-blue tracking-widest uppercase">
                CCSS<span className="text-foreground/50">2075</span>
              </span>
            </div>
            <p className="text-sm text-foreground/40 leading-relaxed mb-6">
              {siteTitle} — a university ICT project demonstrating AI-powered security systems
              in a futuristic megacity context.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded border border-border inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse-glow" />
              <span className="text-xs font-display text-neon-blue/70 tracking-widest uppercase">
                System Online
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xs text-foreground/40 tracking-[0.3em] uppercase mb-5">
              Sections
            </h3>
            <ul className="flex flex-col gap-2" role="list">
              {NAV_SECTIONS.map(item => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-foreground/50 hover:text-neon-blue transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="font-display text-xs text-foreground/40 tracking-[0.3em] uppercase mb-5">
              Project Info
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-neon-blue/60" aria-hidden="true" />
                  <span className="text-xs font-display text-foreground/30 tracking-widest uppercase">
                    Student
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{authorName}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-neon-blue/60" aria-hidden="true" />
                  <span className="text-xs font-display text-foreground/30 tracking-widest uppercase">
                    Instructor
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{teacherName}</p>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 mt-2">
                <a
                  href={process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/40 hover:text-neon-blue transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  Google Sheets
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_FORM_URL ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/40 hover:text-neon-blue transition-colors"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  Google Form
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/25 font-display tracking-widest uppercase">
            {new Date().getFullYear()} {siteTitle}. University ICT Project.
          </p>
          <p className="text-xs text-foreground/20">
            Built with v0.dev · gemini · AI Tools
          </p>
        </div>
      </div>
    </footer>
  )
}

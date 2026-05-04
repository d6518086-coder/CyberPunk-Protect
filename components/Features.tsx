import { Camera, Plane, ShieldAlert, TrendingUp } from 'lucide-react'

const FEATURES = [
  {
    icon: Camera,
    title: 'AI Surveillance',
    description:
      'Advanced computer vision with real-time facial recognition across 847,000 city-wide cameras. Detects anomalies and identifies persons of interest in milliseconds.',
    tag: 'CV + Biometrics',
    color: 'text-neon-blue',
    borderColor: 'hover:border-neon-blue/60',
    glowClass: 'hover:glow-blue',
  },
  {
    icon: Plane,
    title: 'Drone Patrol System',
    description:
      'Fleet of 12,400 autonomous AI drones continuously monitoring city streets, parks, and critical infrastructure. Adaptive routing based on live threat data.',
    tag: 'Autonomous Fleet',
    color: 'text-neon-cyan',
    borderColor: 'hover:border-neon-cyan/60',
    glowClass: 'hover:shadow-[0_0_30px_rgba(0,255,247,0.15)]',
  },
  {
    icon: ShieldAlert,
    title: 'Cybersecurity Layer',
    description:
      'Multi-layered AI firewall defending city digital infrastructure against cyber attacks. Processes 4.8 billion packets per second with zero-day threat identification.',
    tag: 'Neural Firewall',
    color: 'text-neon-purple',
    borderColor: 'hover:border-neon-purple/60',
    glowClass: 'hover:glow-purple',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description:
      'Machine learning models trained on 50 years of crime data predict incidents before they occur. Accuracy rate of 94.2% in high-risk zone identification.',
    tag: 'ML Forecasting',
    color: 'text-neon-blue',
    borderColor: 'hover:border-neon-blue/60',
    glowClass: 'hover:glow-blue',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-12 bg-neon-blue/50" />
      <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
        {children}
      </span>
      <span className="h-px w-12 bg-neon-blue/50" />
    </div>
  )
}

export default function Features() {
  return (
    <section id="overview" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel>System Overview</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Four Pillars of{' '}
          <span className="text-neon-blue glow-text-blue">Urban Security</span>
        </h2>
        <p className="text-center text-foreground/50 max-w-xl mx-auto mb-16 leading-relaxed">
          Integrated AI systems working in concert to protect every citizen, every street,
          every second of every day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <article
                key={feature.title}
                className={`glass-card rounded-lg p-6 transition-all duration-300 cursor-default ${feature.borderColor} ${feature.glowClass} group`}
              >
                {/* Tag */}
                <span className={`text-[10px] font-display tracking-widest uppercase ${feature.color} opacity-70`}>
                  {feature.tag}
                </span>

                {/* Icon */}
                <div className={`mt-4 mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className={`font-display text-base font-bold mb-3 ${feature.color}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className={`mt-6 h-px bg-current ${feature.color} opacity-20 group-hover:opacity-60 transition-opacity`} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

const formUrl = process.env.NEXT_PUBLIC_FORM_URL ?? '#'

const PLANS = [
  {
    name: 'Basic',
    subtitle: 'Small City',
    price: '$12,400',
    period: '/ month',
    population: 'Up to 500K citizens',
    color: 'neon-blue',
    featured: false,
    features: [
      { label: '5,000 camera nodes', included: true },
      { label: 'AI Surveillance Module', included: true },
      { label: 'Basic threat alerts', included: true },
      { label: 'Web dashboard', included: true },
      { label: 'Drone Patrol (50 drones)', included: true },
      { label: 'Cybersecurity Layer', included: false },
      { label: 'Predictive Analytics', included: false },
      { label: 'Military-grade encryption', included: false },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Large City',
    price: '$89,900',
    period: '/ month',
    population: 'Up to 5M citizens',
    color: 'neon-cyan',
    featured: true,
    features: [
      { label: '50,000 camera nodes', included: true },
      { label: 'AI Surveillance Module', included: true },
      { label: 'Real-time threat alerts', included: true },
      { label: 'Advanced dashboard', included: true },
      { label: 'Drone Patrol (500 drones)', included: true },
      { label: 'Cybersecurity Layer', included: true },
      { label: 'Predictive Analytics', included: true },
      { label: 'Military-grade encryption', included: false },
    ],
  },
  {
    name: 'Military',
    subtitle: 'Advanced AI Control',
    price: 'Custom',
    period: 'contact us',
    population: 'Unlimited scale',
    color: 'neon-purple',
    featured: false,
    features: [
      { label: 'Unlimited camera nodes', included: true },
      { label: 'AI Surveillance Module', included: true },
      { label: 'Priority threat response', included: true },
      { label: 'Command center dashboard', included: true },
      { label: 'Unlimited drone fleet', included: true },
      { label: 'Cybersecurity Layer', included: true },
      { label: 'Predictive Analytics', included: true },
      { label: 'Military-grade encryption', included: true },
    ],
  },
]

function OrderModal({ plan, onClose }: { plan: (typeof PLANS)[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Order ${plan.name} plan`}
    >
      <div
        className="glass-card cyber-border rounded-lg p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold text-neon-blue mb-2">
          Order {plan.name} Plan
        </h3>
        <p className="text-foreground/50 text-sm mb-6">
          Fill out your details and our security specialists will contact you within 24 hours.
        </p>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (formUrl !== '#') window.open(formUrl, '_blank')
            onClose()
          }}
        >
          <div>
            <label className="block text-xs font-display text-foreground/50 tracking-wider uppercase mb-1">
              City / Organization
            </label>
            <input
              type="text"
              required
              placeholder="e.g. New Tokyo Metropolitan"
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-display text-foreground/50 tracking-wider uppercase mb-1">
              Contact Email
            </label>
            <input
              type="email"
              required
              placeholder="security@yourcity.gov"
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-display text-foreground/50 tracking-wider uppercase mb-1">
              Population Size
            </label>
            <input
              type="text"
              placeholder="Estimated population"
              className="w-full bg-secondary border border-border rounded px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/60 transition-colors"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-neon-blue text-[#0a0a0f] font-display font-bold text-sm tracking-wider uppercase rounded hover:bg-neon-cyan transition-all glow-blue"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border text-foreground/50 font-display text-sm tracking-wider uppercase rounded hover:border-neon-blue/40 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof PLANS)[0] | null>(null)

  return (
    <section id="pricing" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            Deployment Plans
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Choose Your{' '}
          <span className="text-neon-blue glow-text-blue">Security Tier</span>
        </h2>
        <p className="text-center text-foreground/50 max-w-xl mx-auto mb-16 leading-relaxed">
          Scalable AI security solutions designed for cities of any size, from
          municipalities to nation-scale megapolis deployments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card rounded-lg p-8 transition-all duration-300 relative ${
                plan.featured
                  ? 'border-neon-cyan/50 glow-blue scale-105'
                  : 'hover:border-neon-blue/40'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-neon-cyan text-[#0a0a0f] text-xs font-display font-bold tracking-widest uppercase rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <p
                  className={`text-xs font-display tracking-widest uppercase mb-1 ${
                    plan.color === 'neon-blue'
                      ? 'text-neon-blue'
                      : plan.color === 'neon-cyan'
                        ? 'text-neon-cyan'
                        : 'text-neon-purple'
                  }`}
                >
                  {plan.subtitle}
                </p>
                <h3
                  className={`font-display text-2xl font-bold ${
                    plan.color === 'neon-blue'
                      ? 'text-neon-blue'
                      : plan.color === 'neon-cyan'
                        ? 'text-neon-cyan'
                        : 'text-neon-purple'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-display font-black text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-foreground/40">{plan.period}</span>
                </div>
                <p className="text-xs text-foreground/40 mt-1">{plan.population}</p>
              </div>

              {/* Features list */}
              <ul className="flex flex-col gap-3 mb-8" role="list">
                {plan.features.map((feat) => (
                  <li key={feat.label} className="flex items-center gap-3 text-sm">
                    {feat.included ? (
                      <Check className="w-4 h-4 text-neon-blue flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <X className="w-4 h-4 text-foreground/20 flex-shrink-0" aria-hidden="true" />
                    )}
                    <span
                      className={feat.included ? 'text-foreground/80' : 'text-foreground/30'}
                    >
                      {feat.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 font-display font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 ${
                  plan.featured
                    ? 'bg-neon-cyan text-[#0a0a0f] hover:bg-neon-blue glow-blue'
                    : 'bg-transparent border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue'
                }`}
              >
                Order System
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPlan && (
        <OrderModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, Zap } from 'lucide-react'

type ThreatLevel = 'Critical' | 'High' | 'Medium' | 'Low'
type Category = 'Cybercrime' | 'Physical Threat' | 'Civil Unrest' | 'Surveillance Alert' | 'Infrastructure'

interface Incident {
  id: number
  date: string
  source: string
  title: string
  category: Category
  threat: ThreatLevel
}

const MOCK_DATA: Incident[] = [
  { id: 1,  date: '2075-05-04 08:14', source: 'Sector-7 CCTV Grid',   title: 'Unidentified drone cluster entering restricted airspace',           category: 'Surveillance Alert', threat: 'High' },
  { id: 2,  date: '2075-05-04 07:52', source: 'CyberNet Monitor',      title: 'DDoS attack on power grid control systems detected',                category: 'Cybercrime',         threat: 'Critical' },
  { id: 3,  date: '2075-05-04 06:30', source: 'Street Sensors S-12',   title: 'Unusual crowd movement near Government District',                    category: 'Civil Unrest',       threat: 'Medium' },
  { id: 4,  date: '2075-05-04 05:01', source: 'AI Facial Recognition', title: 'Flagged individual detected at Nexus Station',                       category: 'Surveillance Alert', threat: 'High' },
  { id: 5,  date: '2075-05-03 23:45', source: 'Water Authority API',   title: 'Anomalous access pattern on water treatment facility network',        category: 'Infrastructure',     threat: 'Medium' },
  { id: 6,  date: '2075-05-03 21:12', source: 'Drone Patrol Unit 44',  title: 'Unauthorized perimeter breach at Energy Core Zone B',                category: 'Physical Threat',    threat: 'Critical' },
  { id: 7,  date: '2075-05-03 19:20', source: 'Social Media AI',       title: 'Coordinated protest movement flagged in Eastern District',           category: 'Civil Unrest',       threat: 'Low' },
  { id: 8,  date: '2075-05-03 17:55', source: 'Traffic AI Layer',      title: 'Suspected vehicle pursuit evasion on Route 88',                      category: 'Physical Threat',    threat: 'Medium' },
  { id: 9,  date: '2075-05-03 15:40', source: 'CyberNet Monitor',      title: 'Zero-day exploit attempt on municipal authentication server',         category: 'Cybercrime',         threat: 'Critical' },
  { id: 10, date: '2075-05-03 14:05', source: 'Sector-3 CCTV Grid',   title: 'Unattended package detected near Transit Hub Alpha',                  category: 'Physical Threat',    threat: 'High' },
  { id: 11, date: '2075-05-03 11:30', source: 'Predictive Analytics',  title: 'Risk score elevation in Market Zone 4 (62% probability)',            category: 'Surveillance Alert', threat: 'Low' },
  { id: 12, date: '2075-05-03 09:15', source: 'Building Sensor Net',   title: 'Structural sensor deviation in Tower Block 12-C',                    category: 'Infrastructure',     threat: 'Medium' },
]

const THREAT_CONFIG: Record<ThreatLevel, { color: string; bg: string; dot: string }> = {
  Critical: { color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/30',    dot: 'bg-red-400' },
  High:     { color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/30', dot: 'bg-orange-400' },
  Medium:   { color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', dot: 'bg-yellow-400' },
  Low:      { color: 'text-neon-blue',  bg: 'bg-neon-blue/10 border-neon-blue/30',   dot: 'bg-neon-blue' },
}

const ALL_CATEGORIES: ('All' | Category)[] = [
  'All', 'Cybercrime', 'Physical Threat', 'Civil Unrest', 'Surveillance Alert', 'Infrastructure'
]
const ALL_THREATS: ('All' | ThreatLevel)[] = ['All', 'Critical', 'High', 'Medium', 'Low']

type SortKey = 'date' | 'threat' | 'category'
type SortDir = 'asc' | 'desc'

const THREAT_ORDER: Record<ThreatLevel, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 }

export default function MonitoringTable() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | Category>('All')
  const [threatFilter, setThreatFilter] = useState<'All' | ThreatLevel>('All')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? ''

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let data = [...MOCK_DATA]
    if (categoryFilter !== 'All') data = data.filter(d => d.category === categoryFilter)
    if (threatFilter !== 'All') data = data.filter(d => d.threat === threatFilter)
    data.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'date') cmp = a.date.localeCompare(b.date)
      else if (sortKey === 'threat') cmp = THREAT_ORDER[a.threat] - THREAT_ORDER[b.threat]
      else if (sortKey === 'category') cmp = a.category.localeCompare(b.category)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return data
  }, [categoryFilter, threatFilter, sortKey, sortDir])

  return (
    <section id="monitoring" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            AI Agent — Live Intel
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Threat{' '}
          <span className="text-neon-blue glow-text-blue">Monitoring Dashboard</span>
        </h2>

        {/* Zapier badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-neon-purple" aria-hidden="true" />
          <span className="text-xs text-foreground/40 font-display tracking-widest uppercase">
            Powered by Zapier + Google Sheets (mock data for demo)
          </span>
        </div>

        {/* AI Agent explanation */}
        <div className="glass-card rounded-lg p-4 mb-8 border-l-2 border-neon-purple max-w-3xl mx-auto text-center">
          <p className="text-sm text-foreground/50 leading-relaxed">
            <span className="text-neon-purple font-semibold">AI Agent Logic:</span> A Zapier
            automation scrapes security news and threat data every 15 minutes, pushes rows
            to Google Sheets via webhook, classifies each incident using a GPT-based classifier,
            assigns a threat level, and triggers real-time dashboard updates.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-foreground/40" aria-hidden="true" />
            <span className="text-xs font-display text-foreground/40 tracking-wider uppercase">Category:</span>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1 text-xs font-display tracking-wider uppercase rounded border transition-all ${
                    categoryFilter === c
                      ? 'border-neon-blue bg-neon-blue/10 text-neon-blue'
                      : 'border-border text-foreground/40 hover:border-neon-blue/40 hover:text-foreground/70'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-display text-foreground/40 tracking-wider uppercase">Threat:</span>
            <div className="flex flex-wrap gap-2">
              {ALL_THREATS.map(t => (
                <button
                  key={t}
                  onClick={() => setThreatFilter(t)}
                  className={`px-3 py-1 text-xs font-display tracking-wider uppercase rounded border transition-all ${
                    threatFilter === t
                      ? 'border-neon-blue bg-neon-blue/10 text-neon-blue'
                      : 'border-border text-foreground/40 hover:border-neon-blue/40 hover:text-foreground/70'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Threat monitoring data table">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('date')}
                      className="flex items-center gap-1 text-xs font-display text-foreground/50 tracking-widest uppercase hover:text-neon-blue transition-colors"
                    >
                      Date / Time <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-display text-foreground/50 tracking-widest uppercase">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-display text-foreground/50 tracking-widest uppercase">Incident</th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center gap-1 text-xs font-display text-foreground/50 tracking-widest uppercase hover:text-neon-blue transition-colors"
                    >
                      Category <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('threat')}
                      className="flex items-center gap-1 text-xs font-display text-foreground/50 tracking-widest uppercase hover:text-neon-blue transition-colors"
                    >
                      Threat <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-foreground/30 font-display text-xs tracking-widest uppercase">
                      No incidents match the selected filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((incident, i) => {
                    const cfg = THREAT_CONFIG[incident.threat]
                    return (
                      <tr
                        key={incident.id}
                        className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${
                          i % 2 === 0 ? '' : 'bg-secondary/10'
                        }`}
                      >
                        <td className="px-4 py-3 text-xs text-foreground/40 font-mono whitespace-nowrap">
                          {incident.date}
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground/60 whitespace-nowrap">
                          {incident.source}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground/80 min-w-[200px]">
                          {incident.title}
                        </td>
                        <td className="px-4 py-3 text-xs text-foreground/50 whitespace-nowrap">
                          {incident.category}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-display tracking-widest uppercase ${cfg.bg} ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${incident.threat === 'Critical' ? 'animate-pulse' : ''}`} />
                            {incident.threat}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-foreground/30">
            <span className="font-display tracking-wider uppercase">
              {filtered.length} incidents shown
            </span>
            {googleSheetUrl && (
              <a
                href={googleSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display tracking-wider uppercase text-neon-blue/50 hover:text-neon-blue transition-colors"
              >
                View Full Sheet
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

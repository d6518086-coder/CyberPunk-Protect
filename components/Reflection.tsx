import { ThumbsUp, AlertTriangle, Lightbulb } from 'lucide-react'

const PROS = [
  'Rapid UI prototyping using AI code generation (v0.dev) saved significant development time',
  'Midjourney produced photorealistic cyberpunk city visuals indistinguishable from real renders',
  'ChatGPT effectively scaffolded component logic and TypeScript type definitions',
  'Zapier automation seamlessly connected Google Sheets to the monitoring dashboard workflow',
  'HeyGen avatar creation gave the project a professional AI spokesperson with minimal effort',
]

const CONS = [
  'AI image generators struggle with accurate text rendering and precise UI element placement',
  'Chatbot keyword matching is brittle compared to real LLM-powered conversational AI',
  'Generated code requires manual review — hallucinations and outdated library patterns occur',
  'AI-generated content lacks factual grounding and needs expert domain verification',
  'Video generation tools (Sora/Runway) produced inconsistent results for technical demos',
]

const INSIGHTS = [
  {
    title: 'Prompt Engineering is a Skill',
    text: 'The quality of AI output is directly proportional to prompt specificity. Vague prompts produced generic results; detailed, structured prompts with style references yielded production-quality assets.',
  },
  {
    title: 'AI Accelerates, Not Replaces',
    text: 'Every AI-generated component required human curation, debugging, and creative direction. The technology amplifies developer capability rather than replacing the design and engineering process.',
  },
  {
    title: 'Multimodal Workflow Integration',
    text: 'Combining text (ChatGPT), image (Midjourney), video (HeyGen), and automation (Zapier) AI tools into a unified project demonstrated the power of orchestrating multiple specialized AI systems.',
  },
]

export default function Reflection() {
  return (
    <section id="reflection" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            Project Reflection
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Conclusion &{' '}
          <span className="text-neon-blue glow-text-blue">Analysis</span>
        </h2>
        <p className="text-center text-foreground/50 max-w-2xl mx-auto mb-16 leading-relaxed">
          A critical evaluation of AI tools used throughout this university ICT project —
          what worked exceptionally well, where limitations emerged, and key personal insights
          gained through hands-on AI workflow integration.
        </p>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* What worked well */}
          <div className="glass-card rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <ThumbsUp className="w-5 h-5 text-neon-blue" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-neon-blue tracking-wider uppercase">
                What Worked Well
              </h3>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {PROS.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-blue flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="glass-card rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-orange-400" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-orange-400 tracking-wider uppercase">
                Limitations of AI Tools
              </h3>
            </div>
            <ul className="flex flex-col gap-4" role="list">
              {CONS.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Personal Insights */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-5 h-5 text-neon-purple" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-neon-purple tracking-wider uppercase">
              Personal Insights
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INSIGHTS.map((insight) => (
              <div key={insight.title} className="glass-card rounded-lg p-6 border-l-2 border-neon-purple/50">
                <h4 className="font-display text-sm font-bold text-neon-purple mb-3 tracking-wide">
                  {insight.title}
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

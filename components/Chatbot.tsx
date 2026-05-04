'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react'

const chatbotName = process.env.NEXT_PUBLIC_CHATBOT_NAME ?? 'ARIA'
const chatbotPersona =
  process.env.NEXT_PUBLIC_CHATBOT_PERSONA ??
  'AI Security Officer specialized in urban threat analysis and smart city protection'
const chatbotPrompt =
  process.env.NEXT_PUBLIC_CHATBOT_PROMPT ??
  'You are ARIA — Advanced Response & Intelligence Assistant, the AI security officer of CyberCity.'

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
  timestamp: string
}

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 0,
    role: 'bot',
    text: `Greetings. I am ${chatbotName}, CyberCity's Advanced Response & Intelligence Assistant. I monitor threats, analyze security data, and provide real-time guidance. How can I assist you today?`,
    timestamp: nowTime(),
  },
]

const SUGGESTED_QUESTIONS = [
  'What is the current threat level?',
  'How does the drone patrol work?',
  'Tell me about the AI surveillance system.',
  'Any recent cyber attacks?',
]

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg: Message = { id: Date.now(), role: 'user', text, timestamp: nowTime() }
    const nextMessages = [...messages, userMsg]

    setMessages(nextMessages)
    setInput('')
    setIsTyping(true)
    setApiError(null)

    // Build conversation history for the API (exclude the initial greeting)
    const history = nextMessages.slice(1).map((m) => ({
      role: m.role,
      content: m.text,
    }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error ?? `Server responded with ${res.status}`)
      }

      const botMsg: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: data.reply,
        timestamp: nowTime(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setApiError(message)
      // Still add a fallback bot message so the UI doesn't stall
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: 'Communication link disrupted. Please check your OPENROUTER_API_KEY configuration and try again.',
          timestamp: nowTime(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <section id="chatbot" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-12 bg-neon-blue/50" />
          <span className="text-xs font-display text-neon-blue tracking-[0.3em] uppercase">
            AI Chatbot
          </span>
          <span className="h-px w-12 bg-neon-blue/50" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-balance mb-4">
          Talk to{' '}
          <span className="text-neon-blue glow-text-blue">{chatbotName}</span>
        </h2>
        <p className="text-center text-foreground/50 max-w-xl mx-auto mb-12 leading-relaxed">
          {chatbotPersona}. Ask about threats, surveillance, drones, or cyber incidents.
        </p>

        {/* API error banner */}
        {apiError && (
          <div className="max-w-3xl mx-auto mb-6 flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-display text-destructive tracking-wider uppercase mb-0.5">
                API Error
              </p>
              <p className="text-xs text-foreground/60 leading-relaxed">{apiError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* System info panel */}
          <div className="flex flex-col gap-5">
            <div className="glass-card rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-neon-blue" aria-hidden="true" />
                <span className="text-xs font-display text-neon-blue tracking-widest uppercase">
                  Chatbot Profile
                </span>
              </div>
              <p className="text-sm font-display text-foreground font-semibold mb-1">
                {chatbotName}
              </p>
              <p className="text-xs text-foreground/50 leading-relaxed">{chatbotPersona}</p>
              <div className="mt-3 pt-3 border-t border-border/40">
                <span className="text-[10px] font-display text-foreground/30 tracking-wider uppercase">
                  Powered by OpenRouter
                </span>
              </div>
            </div>

            <div className="glass-card rounded-lg p-5 border-l-2 border-neon-purple">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-neon-purple" aria-hidden="true" />
                <span className="text-xs font-display text-neon-purple tracking-widest uppercase">
                  System Prompt
                </span>
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed italic">
                &ldquo;{chatbotPrompt}&rdquo;
              </p>
            </div>

            <div className="glass-card rounded-lg p-5">
              <p className="text-xs font-display text-foreground/40 tracking-widest uppercase mb-3">
                Suggested Questions
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-left text-xs text-foreground/50 hover:text-neon-blue transition-colors py-1 border-b border-border/30 last:border-0"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat window */}
          <div className="lg:col-span-2 glass-card cyber-border rounded-lg flex flex-col h-[520px]">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-glow" />
              <span className="font-display text-sm font-bold text-neon-blue tracking-widest uppercase">
                {chatbotName} — Secure Channel
              </span>
              <span className="ml-auto text-[10px] font-display text-foreground/25 tracking-wider uppercase">
                OpenRouter
              </span>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'bot'
                        ? 'bg-neon-blue/20 border border-neon-blue/40'
                        : 'bg-neon-purple/20 border border-neon-purple/40'
                    }`}
                    aria-hidden="true"
                  >
                    {msg.role === 'bot' ? (
                      <Bot className="w-3.5 h-3.5 text-neon-blue" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-neon-purple" />
                    )}
                  </div>
                  <div
                    className={`max-w-[78%] flex flex-col gap-1 ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded text-sm leading-relaxed ${
                        msg.role === 'bot'
                          ? 'bg-secondary/70 text-foreground/80 rounded-tl-none'
                          : 'bg-neon-blue/10 border border-neon-blue/20 text-foreground/90 rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-foreground/25 px-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div
                    className="w-7 h-7 rounded-full bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Bot className="w-3.5 h-3.5 text-neon-blue" />
                  </div>
                  <div
                    className="px-4 py-3 bg-secondary/70 rounded rounded-tl-none flex items-center gap-1.5"
                    aria-label={`${chatbotName} is typing`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neon-blue/60 animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neon-blue/60 animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neon-blue/60 animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-4 border-t border-border">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={`Message ${chatbotName}...`}
                  disabled={isTyping}
                  className="flex-1 bg-secondary border border-border rounded px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/60 transition-colors disabled:opacity-50"
                  aria-label={`Message ${chatbotName}`}
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-2.5 bg-neon-blue text-[#0a0a0f] rounded font-display font-bold text-sm hover:bg-neon-cyan transition-all glow-blue disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

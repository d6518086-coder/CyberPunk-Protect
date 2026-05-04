import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL ?? 'meta-llama/llama-3.1-8b-instruct:free'
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT =
  process.env.CHATBOT_SYSTEM_PROMPT ??
  `You are ARIA — Advanced Response & Intelligence Assistant, the AI security officer of CyberCity 2075. You monitor urban threats, analyze security data, and provide real-time guidance to city staff and citizens.

Speak in a professional, precise, and slightly futuristic tone. You have deep knowledge of:
- Urban threat assessment and real-time risk scoring
- AI surveillance camera networks (847,000 units across the city)
- Autonomous drone patrol fleets (12,400 units)
- Cybersecurity defense systems (4.8 billion packets/sec analysis)
- Predictive analytics and social media threat detection
- Smart city infrastructure and IoT sensor networks

Keep responses concise (2-4 sentences max) but informative. Use technical terminology naturally. Reference city stats when relevant.`

export async function POST(req: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'OPENROUTER_API_KEY is not configured on the server.' },
      { status: 500 }
    )
  }

  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const userMessages = body.messages ?? []
  if (!userMessages.length) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 })
  }

  // Build the messages array: system prompt + conversation history
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...userMessages.map((m) => ({
      role: m.role === 'bot' ? 'assistant' : m.role,
      content: m.content,
    })),
  ]

  try {
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cybercity.dev',
        'X-Title': process.env.NEXT_PUBLIC_SITE_TITLE ?? 'CyberCity Security System 2075',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: 256,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `OpenRouter error: ${response.status} — ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content ?? 'No response from AI.'

    return NextResponse.json({ reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: `Request failed: ${message}` }, { status: 500 })
  }
}

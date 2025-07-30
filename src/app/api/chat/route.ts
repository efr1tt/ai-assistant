import { NextResponse } from 'next/server'
import { systemPrompt } from '@/lib/systemPrompt'

interface Msg { role: 'user' | 'assistant' | 'system'; text: string }

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let messages: Msg[] = []

    if (Array.isArray(body)) {
      messages = body
    } else if (Array.isArray(body.messages)) {
      messages = body.messages
    } else if (typeof body.text === 'string') {
      messages = [{ role: 'user', text: body.text }]
    } else {
      return NextResponse.json({ error: 'Нет сообщений' }, { status: 400 })
    }

    const allMessages = [{ role: 'system', text: systemPrompt }, ...messages]

    const res = await fetch(process.env.YANDEX_GPT_ENDPOINT ?? '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`,
      },
      body: JSON.stringify({
        modelUri: `gpt://${process.env.YANDEX_GPT_FOLDER_ID}/yandexgpt/latest`,
        completionOptions: { stream: false, temperature: 0.6, maxTokens: 2000 },
        messages: allMessages,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('YandexGPT error:', text)
      return NextResponse.json(
        { error: 'Ошибка при обращении к модели' },
        { status: 500 }
      )
    }

    const data = await res.json()
    const answer =
      data.result?.alternatives?.[0]?.message?.text ??
      data.choices?.[0]?.message?.text ??
      ''

    return NextResponse.json({ text: answer })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Не удалось обработать запрос' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'

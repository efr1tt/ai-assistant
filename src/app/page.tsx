'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const greeting = 'Привет! Я твой ИИ-психотерапевт. Готов выслушать тебя.'
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setText(greeting.slice(0, i))
      i += 1
      if (i > greeting.length) {
        clearInterval(id)
      }
    }, 50)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 font-sans bg-background text-foreground">
      <header className="absolute left-4 top-4 text-lg font-medium">
        <Image src="/favicon.ico" alt="logo" width={24} height={24} className="inline-block mr-2" />
        AI Psych
      </header>
      <main className="flex flex-col items-center gap-4 text-center max-w-2xl animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-semibold">
          {text}
          <span className={focused ? '' : 'typewriter-cursor'}>|</span>
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          Онлайн психологическая поддержка с ИИ
        </p>
      </main>
      <div className="w-full max-w-3xl mt-24 animate-fade-in relative">
        {focused && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none animate-blink">|</span>
        )}
        <input
          type="text"
          readOnly
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Спросите что-нибудь..."
          className="w-full p-4 rounded border border-[#565869] bg-[#40414f] placeholder-gray-400 text-white focus:outline-none hover:border-gray-400 transition-colors"
        />
      </div>
    </div>
  )
}

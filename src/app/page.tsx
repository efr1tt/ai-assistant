"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  sender: "user" | "bot"
  text: string
}

export default function Home() {
  const greeting = "Привет! Я твой ИИ-психотерапевт. Готов выслушать тебя."
  const [greetText, setGreetText] = useState("")
  const [focused, setFocused] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const endRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [inputHeight, setInputHeight] = useState(0)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setGreetText(greeting.slice(0, i))
      i += 1
      if (i > greeting.length) clearInterval(id)
    }, 50)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  useEffect(() => {
    adjustHeight()
  }, [])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    const msg: Message = { id: Date.now(), sender: "user", text }
    setMessages((m) => [...m, msg])
    setInput("")
    requestAnimationFrame(adjustHeight)

    const history = [...messages, msg].map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      text: m.text,
    }))

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()
      const reply: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.text || "Извините, не удалось получить ответ",
      }
      setMessages((m) => [...m, reply])
    } catch (err) {
      const reply: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Извините, не удалось получить ответ",
      }
      setMessages((m) => [...m, reply])
    }
  }

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      setInputHeight(textareaRef.current.offsetHeight)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    adjustHeight()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const InputField = (
    <div className="w-full max-w-3xl relative flex items-end">
      {focused && input === "" && (
        <span className="absolute left-4 top-3 pointer-events-none animate-blink">
          |
        </span>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Спросите что-нибудь..."
        className="w-full resize-none overflow-hidden min-h-[3rem] p-4 rounded-lg border border-[#565869] bg-[#40414f] placeholder-gray-400 text-white focus:outline-none hover:border-gray-400 transition-colors pr-12"
      />
      <button
        onClick={sendMessage}
        disabled={input.trim() === ""}
        className={`absolute right-2 bottom-2 p-2 disabled:text-gray-500 disabled:cursor-not-allowed hover:text-white ${
          input.trim() !== "" ? "text-white" : "text-gray-400"
        }`}
        aria-label="Отправить"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M2.94 2.94a.75.75 0 011.06 0l14 14a.75.75 0 01-1.06 1.06L11 12.12l-2.97 5.88a.75.75 0 01-1.39-.28L5.67 10.5 1.06 8.03a.75.75 0 01.28-1.39l17-4.25a.75.75 0 01.9.9l-4.25 17a.75.75 0 01-1.39.28L9.5 14.33 2.94 2.94z" />
        </svg>
      </button>
    </div>
  )

  if (messages.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center w-full font-sans bg-background text-foreground">
        <header className="absolute left-4 top-4 text-lg font-medium">
          <Image
            src="/favicon.ico"
            alt="logo"
            width={24}
            height={24}
            className="inline-block mr-2"
          />
          AI Psych-Help
        </header>
        <main className="flex flex-col items-center justify-center flex-1 text-center px-4 w-full max-w-3xl animate-fade-in gap-6">
          <h1 className="text-3xl sm:text-4xl font-semibold">
            {greetText}
            {input === "" && !focused && (
              <span className="typewriter-cursor">|</span>
            )}
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Онлайн психологическая поддержка с ИИ
          </p>
          {InputField}
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen items-center w-full font-sans bg-background text-foreground">
      <header className="absolute left-4 top-4 text-lg font-medium">
        <Image
          src="/favicon.ico"
          alt="logo"
          width={24}
          height={24}
          className="inline-block mr-2"
        />
        AI Psych
      </header>
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto w-full max-w-3xl px-4 pt-24 space-y-4"
        style={{ paddingBottom: inputHeight + 16 }}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={`flex ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-md text-sm leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-[#343541] text-gray-100"
                      : "bg-[#444654] text-gray-100"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>
      <div className="w-full fixed bottom-0 left-0 right-0 bg-background px-4 pb-4 flex justify-center">
        {InputField}
      </div>
    </div>
  )
}

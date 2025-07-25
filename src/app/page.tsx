import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="bg-white/80 rounded-full shadow px-3 py-1 text-2xl font-semibold text-indigo-600">
          M
        </div>
      </header>
      <main className="flex flex-col items-center flex-1 px-6 text-center gap-24">
        <section className="mt-10 flex flex-col items-center gap-6 max-w-2xl">
          <h1 className="text-4xl font-bold">Твой психологический ИИ-ассистент</h1>
          <button className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition">
            Начать чат
          </button>
        </section>
        <section className="grid gap-6 sm:grid-cols-3 w-full max-w-5xl">
          <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow flex flex-col items-center text-center">
            <span className="text-3xl">💬</span>
            <h3 className="mt-4 font-semibold">Дружелюбный диалог</h3>
          </div>
          <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow flex flex-col items-center text-center">
            <span className="text-3xl">⏱️</span>
            <h3 className="mt-4 font-semibold">Быстрые ответы</h3>
          </div>
          <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow flex flex-col items-center text-center">
            <span className="text-3xl">🔒</span>
            <h3 className="mt-4 font-semibold">Конфиденциально</h3>
          </div>
        </section>
        <section className="grid gap-6 sm:grid-cols-3 w-full max-w-5xl">
          <div className="bg-white/80 p-6 rounded-2xl shadow hover:shadow-md transition text-left">
            <p className="italic">“Очень помогает разобраться в себе.”</p>
            <span className="block mt-4 font-medium text-right">Анна</span>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl shadow hover:shadow-md transition text-left">
            <p className="italic">“Ответы приходят мгновенно, как будто меня слушают.”</p>
            <span className="block mt-4 font-medium text-right">Игорь</span>
          </div>
          <div className="bg-white/80 p-6 rounded-2xl shadow hover:shadow-md transition text-left">
            <p className="italic">“Чувствую поддержку в любое время дня.”</p>
            <span className="block mt-4 font-medium text-right">Елена</span>
          </div>
        </section>
      </main>
      <footer className="py-6 text-center flex flex-col gap-2 items-center">
        <p className="text-sm">© 2024 MindMate</p>
        <div className="flex gap-4 text-xl">
          <a href="#" aria-label="Telegram">📱</a>
          <a href="#" aria-label="VK">📘</a>
        </div>
      </footer>
    </div>
  );
}

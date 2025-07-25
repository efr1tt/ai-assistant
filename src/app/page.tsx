import Image from "next/image";

const features = [
  {
    icon: "🔒",
    title: "Анонимность",
    desc: "Личная информация под защитой",
  },
  {
    icon: "🕒",
    title: "24/7",
    desc: "Помощь в любое время",
  },
  {
    icon: "🤗",
    title: "Без осуждения",
    desc: "Доброжелательный диалог",
  },
  {
    icon: "🤖",
    title: "Технологии ЯндексGPT",
    desc: "Современный ИИ на страже вашего спокойствия",
  },
];

const reviews = [
  {
    name: "Анна",
    text: "Благодаря ассистенту я стала спокойнее относиться к стрессу.",
  },
  {
    name: "Игорь",
    text: "Просто пишешь, и получаешь поддержку без лишних вопросов.",
  },
  {
    name: "Мария",
    text: "Круто, что чат работает круглосуточно!",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header className="p-4 flex justify-center sm:justify-start">
        <Image src="/logo.svg" alt="Логотип" width={120} height={40} />
      </header>
      <main className="flex-grow flex flex-col items-center text-center px-4 max-w-screen-md mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mt-6">
          Психологическая поддержка онлайн — анонимно и с заботой
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Наш ассистент на базе ЯндексGPT поможет справиться с тревогой, стрессом и одиночеством в любое время суток. Просто напиши, и получи поддержку без осуждения.
        </p>
        <button className="mt-6 bg-blue-600 text-white rounded-full px-6 py-3 text-lg hover:bg-blue-700">
          Начать чат
        </button>

        <section className="mt-12 grid gap-6 sm:grid-cols-2 w-full">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="text-3xl" aria-hidden>{f.icon}</span>
              <div className="text-left">
                <h3 className="font-medium">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 w-full">
          <h2 className="text-xl font-semibold mb-6">Отзывы пользователей</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {reviews.map((r, i) => (
              <div key={i} className="border rounded-lg p-4 text-left bg-gray-50 dark:bg-gray-800">
                <p className="text-sm mb-2">{r.text}</p>
                <span className="text-xs text-gray-500">— {r.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2025 Сервис психологической поддержки
      </footer>
    </div>
  );
}

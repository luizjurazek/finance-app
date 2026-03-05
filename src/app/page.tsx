import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-zinc-900 shadow-xl shadow-black/10 dark:shadow-black/40 border-x border-zinc-200 dark:border-zinc-800 sm:items-start">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-4xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome to your <span className="text-emerald-600 dark:text-emerald-400">Finance App</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            A premium experience designed with trust and clarity in mind. Start managing your wealth today with our emerald-themed platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-8 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 text-white transition-all hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] md:w-auto"
            href="#"
          >
            Get Started
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-xl border border-zinc-200 px-8 transition-all hover:border-emerald-600 hover:text-emerald-600 dark:border-zinc-800 dark:hover:border-emerald-500 dark:hover:text-emerald-400 md:w-auto"
            href="#"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}

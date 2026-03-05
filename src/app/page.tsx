import Image from "next/image";

export default function Home() {
  return (
    <div className="layout-center" style={{ backgroundColor: "var(--background)" }}>
      <main className="container-main">
        <Image
          className="dark:invert mb-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="title-large">
            Welcome to your <span className="title-accent">Finance App</span>
          </h1>
          <p className="text-body">
            A premium experience designed with trust and clarity in mind. Start managing your wealth today with our emerald-themed platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-8 text-base font-medium sm:flex-row">
          <a href="/login" className="btn btn-primary" style={{ width: "auto", padding: "0.75rem 2rem" }}>
            Get Started
          </a>
          <a href="#" className="btn btn-outline" style={{ width: "auto", padding: "0.75rem 2rem" }}>
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}

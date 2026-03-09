"use client";
import Image from "next/image";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/components/auth-context";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="layout-center" style={{ backgroundColor: "var(--background)" }}>
        <main className="container-main">
          <div className="absolute top-4 left-4">
             <span className="text-sm font-medium">Olá, {user?.name}</span>
          </div>
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
            <button onClick={logout} className="btn btn-outline" style={{ width: "auto", padding: "0.75rem 2rem" }}>
              Sair
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

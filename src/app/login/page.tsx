"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="layout-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Image
            className="dark:invert mb-6"
            src="/next.svg"
            alt="Logo"
            width={120}
            height={24}
            priority
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Bem vindo
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Gerencie suas finanças com clareza e segurança
          </p>
        </div>

        <div className="card space-y-6">
          <form className="space-y-4" action="#" method="POST">
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="input-label">
                  Endereço de E-mail
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="input-label">
                  Senha
                </label>
                <div className="password-wrapper">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    style={{ paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88l-3.29-3.29m7.53.61A2 2 0 0 1 14.12 14.12l-1.53-1.53a2 2 0 0 1-1.41-1.41l-.9-2.09c.14-.3.35-.49.61-.53l.36-.08c.55-.13 1.13.08 1.48.51z"/><path d="M2 2l20 20M15.47 15.47A9.88 9.88 0 0 1 12 16.5c-5 0-8-3.5-8-3.5a13.12 13.12 0 0 1 1.76-2.18m4.05-1.29A9.9 9.9 0 0 1 12 7.5c5 0 8 3.5 8 3.5a13.3 13.3 0 0 1-1.53 2.11"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  style={{
                    height: "1rem",
                    width: "1rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer"
                  }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground cursor-pointer">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-link">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          <button type="button" className="btn btn-outline">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Entrar com Google
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <a href="/register" className="text-link">
            Crie uma conta gratuitamente
          </a>
        </p>
      </div>
    </div>
  );
}

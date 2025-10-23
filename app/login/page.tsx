'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  function logearse(e: any) {
    const sessionData = {
      user: 'alan',
      role: 'admin',
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('session', JSON.stringify(sessionData));

    handleSubmit(e);
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Panel Izquierdo - Ilustración */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/void-paisaje.png"
          alt="Ilustración"
          fill
          style={{
            objectFit: 'cover'
          }}
          priority
        />
      </div>

      {/* Panel Derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2">
            <Image
              src="/stokontrol-b-02.svg"
              alt="Stokontrol Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-semibold">Stokontrol</span>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400 mb-8">
            Ingresa tus credenciales para continuar
          </p>

          {/* Formulario */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-600"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-600"
              />
            </div>

            {/* Olvidaste contraseña */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 bg-black border-gray-800 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-400"
                >
                  Recordarme
                </label>
              </div>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div> */}

            {/* Botón Submit */}
            <button
              onClick={logearse}
              disabled={isLoading}
              className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-800"></div>
            <span className="px-4 text-sm text-gray-400">O continuar con</span>
            <div className="flex-1 border-t border-gray-800"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            {/* <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-gray-800 rounded-md hover:border-gray-600 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button> */}
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black border border-gray-800 rounded-md hover:border-gray-600 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <button className="text-white hover:underline">Regístrate</button>
          </p>
        </div>
      </div>
    </div>
  );
}

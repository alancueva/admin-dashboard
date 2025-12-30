'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // AQUÍ: Conectar con tu backend Express
      // const res = await fetch('http://localhost:4000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error('Credenciales incorrectas');
      // const data = await res.json();
      // const token = data.token;

      // SIMULACIÓN (Eliminar cuando tengas el backend conectado)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const token = "token-simulado-123456"; 

      // 1. Guardar en LocalStorage (para uso en cliente si es necesario)
      localStorage.setItem('token', token);

      // 2. Guardar en Cookie (CRUCIAL para que el Middleware permita el acceso)
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

      // 3. Redirigir al Dashboard
      router.push('/dashboard');
      router.refresh(); // Actualiza para que el middleware detecte la cookie

    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Panel Izquierdo - Ilustración */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src={"/void-paisaje.png"}
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
              src="/stokontrol-logo.png"
              alt="Stokontrol Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-semibold">Stokontrol</span>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400 mb-8">
            Ingresa tus credenciales para continuar
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div className="space-y-6"> */}
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all placeholder-gray-600"
              />
            </div>

            {/* Botón Submit */}
            <button
              disabled={isLoading}
              className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
            {/* </div> */}
          </form>

          {/* Social Login */}
          <div className="space-y-3">
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link href="/registrarse" className="text-white hover:underline">
              <button className="text-white hover:underline">Regístrate</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import { ArrowRight, Terminal, AlertTriangle, Home, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col items-center justify-center p-0 font-mono antialiased overflow-hidden">
      
      {/* Ruido de fondo sutil / Textura */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="w-full h-full flex flex-col md:flex-row border-t border-white/20">
        
        {/* Sección Izquierda: El gran impacto */}
        <div className="w-full md:w-2/3 p-8 md:p-16 border-b md:border-b-0 md:border-r border-white flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-red-500 font-bold mb-4">
              <AlertTriangle size={20} />
              <span className="uppercase tracking-tighter">Acceso Denegado / No Encontrado</span>
            </div>
            <h1 className="text-[12vw] md:text-[15vw] leading-[0.8] font-black uppercase tracking-tighter italic">
              404
            </h1>
          </div>

          <div className="mt-12 space-y-6">
            <p className="text-2xl md:text-4xl font-bold leading-tight max-w-2xl uppercase italic">
              La ruta solicitada ha dejado de existir o nunca fue creada. Deja de buscar aquí.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-white text-black hover:bg-red-500 hover:text-white px-8 py-4 text-xl font-black uppercase transition-colors flex items-center group"
              >
                <span>Regresar al inicio</span>
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Sección Derecha: Detalles técnicos y Links */}
        <div className="w-full md:w-1/3 bg-white text-black p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <span className="font-black uppercase text-sm">System Logs</span>
              <Terminal size={18} />
            </div>
            
            <div className="space-y-4 font-bold text-sm">
              <p className="flex justify-between"><span>STATUS:</span> <span className="text-red-600">CRITICAL_FAIL</span></p>
              <p className="flex justify-between"><span>LOCATION:</span> <span>UNRESOLVED_PATH</span></p>
              <p className="flex justify-between"><span>ACTION:</span> <span>TERMINATE_SEARCH</span></p>
              <div className="pt-4 border-t border-black/10">
                <p className="text-xs opacity-50 mb-4 font-normal uppercase leading-tight">
                  "El vacío es la única respuesta a tu petición. No intentes forzar el protocolo."
                </p>
              </div>
            </div>

            <nav className="space-y-2 pt-8">
              <span className="block text-xs font-black uppercase mb-4 opacity-40">Navegación Forzada</span>
              {[
                { name: 'Dashboard', url: '/dashboard' },
                // { name: 'Soporte', url: '/support' },
                // { name: 'Seguridad', url: '/security' }
              ].map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  className="flex items-center justify-between group py-2 border-b border-black/10 hover:border-black transition-all"
                >
                  <span className="font-black uppercase">{link.name}</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-12">
            <div className="h-2 w-full bg-black mb-2 animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Critical Error System // {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>

      {/* Marquee inferior decorativo (Opcional, muy brutalista) */}
      <div className="w-full bg-red-600 py-2 overflow-hidden whitespace-nowrap border-t-2 border-black hidden md:block">
        <div className="flex animate-[marquee_20s_linear_infinite] font-black uppercase text-xs">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 flex items-center">
              Página no encontrada — Error 404 — Acceso denegado — Volver atrás — 
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
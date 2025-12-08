# Next.js 15 — Plantilla Admin Dashboard

Plantilla de inicio para aplicaciones admin construida con Next.js (App Router) y TypeScript. Pensada para despliegue en Vercel y uso con Postgres.

Demo: https://next-admin-dash.vercel.app/

## Stack principal

- Framework: Next.js (App Router)
- Lenguaje: TypeScript
- Autenticación: Auth.js
- Base de datos: Postgres (Vercel Postgres)
- Estilos: Tailwind CSS + Shadcn UI
- Despliegue: Vercel
- Formato: Prettier

## Contenido del repositorio

- Código de la app: `app/`  
- Componentes: `components/`  
- Archivos públicos: `public/`  
- Configuración: [next.config.ts](next.config.ts), [tailwind.config.ts](tailwind.config.ts)  
- Scripts y dependencias: [package.json](package.json)

## Requisitos previos

- Node.js (v18+ recomendado)
- pnpm (o npm/yarn)
- Cuenta y proyecto en Vercel (para Postgres integrado)

## Configuración local

1. Copia el ejemplo de variables de entorno:
   - [.env.example](.env.example) -> `.env.local` y completa los valores (incluye credenciales de GitHub OAuth).

2. Instala dependencias y ejecuta en desarrollo:
```bash
pnpm install
pnpm dev
```

La app estará en: http://localhost:3000

## Scripts útiles

- Desarrollo: `pnpm dev`
- Build: `pnpm build`
- Start (producción local): `pnpm start`
(Ver [package.json](package.json) para detalles)

## Despliegue en Vercel

1. Conecta el repositorio en Vercel.
2. Durante la creación del proyecto, añade una instancia de Vercel Postgres.
3. Añade las variables de entorno desde Vercel o usa `vercel env pull` localmente.

Comandos útiles:
```bash
npm i -g vercel
vercel link
vercel env pull
```

## Solución de problemas rápida

- Error de OAuth: revisa que `GITHUB_ID` y `GITHUB_SECRET` estén correctos en `.env.local`.
- Conexión a Postgres: verifica la URL en `DATABASE_URL` y permisos en Vercel Postgres.
- Problemas de CSS: corre `pnpm dev` y revisa la consola por errores de PostCSS/Tailwind.

## Contribuir

- Abrir PRs con descripciones claras.
- Ejecutar linters y formateadores antes de commitear.

## Licencia

Proyecto abierto; añade tu licencia en el repositorio si corresponde.

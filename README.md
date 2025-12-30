# Stokontrol - Dashboard de Gestión de Inventario

Este es un panel de administración (dashboard) construido con Next.js 15 (App Router) y TypeScript, diseñado como una solución completa para la gestión de inventario y operaciones comerciales.

<!-- Aquí puedes añadir una captura de pantalla de tu dashboard -->
<!-- ![Stokontrol Dashboard](https://i.imgur.com/link-a-tu-imagen.png) -->

## Características Clave

- **Autenticación Segura**: Sistema de inicio de sesión con email/contraseña y protección de rutas mediante Middleware (basado en cookies).
- **Dashboard Intuitivo**: Interfaz principal con navegación lateral responsive, breadcrumbs para una fácil ubicación y un menú de usuario funcional.
- **Módulos de Gestión**:
  - **Administración**: Configuración de parámetros clave del sistema (ej. Tipos de Negocio).
  - **Catálogo**: Gestión de productos y servicios.
  - **Gestión de Existencia**: Control de inventario y stock.
  - **Operaciones Comerciales**: Manejo de transacciones de entrada y salida.
- **UI Moderna y Adaptable**: Construido con [Shadcn UI](https://ui.shadcn.com/) sobre [Tailwind CSS](https://tailwindcss.com/) para una experiencia de usuario limpia y consistente en cualquier dispositivo.
- **Despliegue Optimizado**: Configurado para un despliegue sencillo y eficiente en [Vercel](https://vercel.com).

## Stack Tecnológico

- **Framework**: Next.js 15 (con App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS y Shadcn UI
- **Autenticación**: Middleware propio con cookies (simulado, listo para conectar a un backend con JWT).
- **Base de Datos**: Preparado para Vercel Postgres o cualquier otra base de datos SQL.
- **Despliegue**: Vercel
- **Formato de Código**: Prettier

## Requisitos previos

- Node.js (v18 o superior)
- `pnpm` como gestor de paquetes (aunque puedes usar `npm` o `yarn`)

## Configuración local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/stokontrol.git
    cd stokontrol
    ```

2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto. Por ahora, no se necesitan variables para el login simulado, pero aquí irían las credenciales de tu base de datos y backend.
    ```bash
    # .env.local
    # DATABASE_URL="postgresql://..."
    # JWT_SECRET="tu_secreto"
    ```

4.  **Ejecutar el proyecto en modo desarrollo:**
    ```bash
    pnpm dev
    ```

La aplicación estará disponible en http://localhost:3000.

## Scripts útiles

- Desarrollo: `pnpm dev`
- Build: `pnpm build`
- Start (producción local): `pnpm start`
(Ver `package.json` para más detalles)

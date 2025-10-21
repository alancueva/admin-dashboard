import { auth } from '@/lib/auth';

export default auth;

export const config = {
  // Proteger todas las rutas excepto las de la API, las de Next.js,
  // los assets públicos y la propia página de login.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|placeholder-user.jpg).*)'
  ]
};
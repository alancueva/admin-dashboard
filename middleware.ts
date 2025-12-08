// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value; // o localStorage simulado en cookie

//   const { pathname } = req.nextUrl;

//   // ✅ Rutas públicas (no requieren login)
//   const publicPaths = ["/login", "/registrarse", "/forgot-password"];

//   // Si no está logueado y no está en /login → redirigir al login
//   if (!token && !publicPaths.includes(pathname)) {
//     const loginUrl = new URL("/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Si ya está logueado y trata de ir a /login → enviarlo al /
//   if (token && !publicPaths.includes(pathname)) {
//     const homeUrl = new URL("/", req.url);
//     return NextResponse.redirect(homeUrl);
//   }

//   // Caso normal → continuar
//   return NextResponse.next();
// }
import { auth } from '@/lib/auth';

// export default auth((req) => {
//   // You can add custom logic here if needed
//   // For now, just continue with the default auth behavior
// });

import { NextResponse } from 'next/server';

export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;

  // const isAuthPage = nextUrl.pathname === '/login' || nextUrl.pathname === '/registrarse';
  // const isProtectedPage = nextUrl.pathname.startsWith('/inicio') ||
  //   nextUrl.pathname.startsWith('/Administracion') ||
  //   nextUrl.pathname.startsWith('/Almacen-Inventario') ||
  //   nextUrl.pathname.startsWith('/Operaciones-Comerciales') ||
  //   nextUrl.pathname.startsWith('/Reportes') ||
  //   nextUrl.pathname.startsWith('/Configuracion');
  // // Si está logueado e intenta ir a login/registro → mandar a /inicio
  // if (isLoggedIn && isAuthPage) {
  //   return NextResponse.redirect(new URL('/', nextUrl));
  // }

  // // Si NO está logueado e intenta entrar a cualquier página del dashboard → login
  // if (!isLoggedIn && isProtectedPage) {
  //   const loginUrl = new URL('/login', nextUrl);
  //   loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // // Todo lo demás → dejar pasar
  // return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

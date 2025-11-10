import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // o localStorage simulado en cookie

  const { pathname } = req.nextUrl;

  // ✅ Rutas públicas (no requieren login)
  const publicPaths = ["/login", "/registrarse", "/forgot-password"];

  // Si no está logueado y no está en /login → redirigir al login
  if (!token && !publicPaths.includes(pathname)) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya está logueado y trata de ir a /login → enviarlo al /
  if (token && !publicPaths.includes(pathname)) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  // Caso normal → continuar
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

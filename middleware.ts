import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const publicRoutes = ['/login', '/registrarse']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  const token = request.cookies.get('token')?.value

  // 1. Usuario autenticado
  if (token) {
    // Si un usuario autenticado intenta acceder a una ruta pública (login/registro)
    // o a la página de inicio, redirígelo al dashboard.
    if (isPublicRoute || pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // 2. Usuario no autenticado
  if (!token) {
    // Si un usuario no autenticado intenta acceder a una ruta que NO es pública,
    // redirígelo a la página de login.
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Por defecto, si ninguna de las condiciones anteriores se cumple, permite que la solicitud continúe.
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};

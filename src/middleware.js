import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const jwt = req.cookies.get('loginToken');
  const codeJwt = req.cookies.get('codeToken');
  const recoveryJwt = req.cookies.get('recoveryPasswordToken');
  const url = req.nextUrl.pathname;

  if (url === '/') {
    return NextResponse.next(); // Permitir acceso a la página de inicio sin autenticación
  }

  if (url === '/home') {
    if (!jwt || !(await verifyJwt(jwt.value))) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redireccionar a login si no hay token o no es válido
    }
    return NextResponse.next(); // Permitir acceso a la página de home si el token es válido
  }

  if (url.startsWith('/auth-token/')) {
    if (!codeJwt || !(await verifyJwt(codeJwt.value))) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redireccionar a login si no hay token o no es válido
    }
    return NextResponse.next(); // Permitir acceso a la página de auth-token si el token es válido
  }

  if (url.startsWith('/new-password')) {
    if (!recoveryJwt || !(await verifyJwt(recoveryJwt.value))) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redireccionar a login si no hay token o no es válido
    }
    return NextResponse.next(); // Permitir acceso a la página de auth-token si el token es válido
  }

  if (url === '/login' || url === '/signup' || url === '/reset-password') {
    if (jwt && await verifyJwt(jwt.value)) {
      return NextResponse.redirect(new URL('/home', req.url)); // Redireccionar a home si ya hay una sesión iniciada
    }
    return NextResponse.next(); // Permitir acceso a la página de login o signup si no hay sesión iniciada
  }

  return NextResponse.next(); // Permitir acceso a otras páginas sin autenticación
}

async function verifyJwt(token) {
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch (error) {
    return false;
  }
}

export const config = {
  matcher: ['/home/:path*', '/login', '/signup', '/auth-token/:path*', '/reset-password', '/new-password/:token*'],
};
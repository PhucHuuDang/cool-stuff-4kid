import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routes } from './routes/routes'
import jwt from 'jsonwebtoken';
import { DecodedToken } from './interface';

function decodeToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('cool_cookie')?.value
  const adminRoutes = ['/dash-board', '/product-management', '/orders-page', '/staff-management', '/revenue-page', '/admin-account', '/vouchers-management']
  const staffRoutes = ['/dashboard', '/productManagement', '/orders', '/feedback', '/vouchers']

  if (!token) {
    return NextResponse.redirect(new URL('/404', request.url))
  }

  const decodedToken = decodeToken(token)
  if (!decodedToken) {
    return NextResponse.redirect(new URL('/404', request.url))
  }

  // Xử lý routes cho admin
  if (adminRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    if (decodedToken.role.toLowerCase() !== 'admin') {
      return NextResponse.redirect(new URL('/404', request.url))
    }
  }

  // Xử lý routes cho staff
  if (staffRoutes.some(route => request.nextUrl.pathname === route)) {
    if (decodedToken.role.toLowerCase() !== 'staff') {
      return NextResponse.redirect(new URL('/404', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dash-board/:path*', 
    '/product-management/:path*', 
    '/orders-page/:path*', 
    '/staff-management/:path*', 
    '/revenue-page/:path*', 
    '/admin-account/:path*', 
    '/vouchers-management/:path*',
    '/dashboard',
    '/productManagement',
    '/orders',
    '/feedback',
    '/vouchers'
  ],
}
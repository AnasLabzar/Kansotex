import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale
    const locale = pathname.split('/')[1];
    
    // Create response and set header for next-intl
    const response = NextResponse.next();
    response.headers.set('x-next-intl-locale', locale);
    return response;
  }

  // Redirect if there is no locale
  const response = NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  response.headers.set('x-next-intl-locale', defaultLocale);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};


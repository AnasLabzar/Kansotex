import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always', // Always redirect to /fr or /en to avoid rewrite bugs on Vercel
  localeDetection: true // Auto-detect based on browser (Accept-Language)
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

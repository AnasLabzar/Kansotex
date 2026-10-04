import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed', // Only adds /en for english, keeps / for french
  localeDetection: true // Auto-detect based on browser (Accept-Language)
});

export default function proxy(req: any) {
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

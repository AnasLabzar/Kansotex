import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['fr', 'en'],

  // Used when no locale matches
  defaultLocale: 'fr',
  
  // Optional: define locale prefix (always, as-needed, never)
  localePrefix: 'always' // or 'as-needed' if we want / to remain / without prefix, but the user requested /en /fr explicitly
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};

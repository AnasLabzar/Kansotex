import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['fr', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  const currentLocale = locale || 'fr';
  if (!locales.includes(currentLocale as any)) notFound();
  
  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default
  };
});

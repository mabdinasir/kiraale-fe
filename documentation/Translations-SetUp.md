# Language Translations Setup with `next-intl`

## 1. Translation Files

Create a `translations` folder and add JSON files for each language. Example: `en.json`:

```json
{
    "welcome": "Welcome",
    "description": "This is a sample translation."
}
```

Add similar files for other locales, e.g., `so.json`, `sw.json`.

---

## 2. Locale Request Handling

Create `i18n/request.ts`:

```typescript
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale
    if (!locale) notFound()

    return {
        locale,
        messages: (await import(`../translations/${locale}.json`)).default,
    }
})
```

- Dynamically detects and loads the requested locale.
- Redirects to a 404 page if the locale is invalid.

---

## 3. Middleware for Locale Routing

Create `middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['en', 'so', 'sw'],
    defaultLocale: 'en',
})

export const config = {
    matcher: ['/', '/(en|so|sw)/:path*'],
}
```

- **Locales**: Supported locales are `'en'`, `'so'`, and `'sw'`.
- **Default Locale**: Set to `'en'`.

---

## 4. Root Layout

Create `app/[locale]/layout.tsx`:

```typescript
import React from 'react';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Rubik } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Kiraale',
    description: 'Kiraale is a platform for property rentals and bookings in Somalia and Kenya.',
};

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    style: ['italic', 'normal'],
    preload: true,
    weight: ['500', '600', '700', '800', '900'],
});

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${rubik.className} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Analytics />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
```

- Wraps the app in `NextIntlClientProvider` for translations.
- Dynamically loads the locale and messages.

---

## 5. Using Translations in Components

To use translations, call `useTranslations` in any component:

```typescript
import { useTranslations } from 'next-intl';

const Example = () => {
    const t = useTranslations();

    return <h1>{t('welcome')}</h1>; // Displays the translated "welcome" message.
}
```

---

## Summary

This setup:

- Dynamically detects locales.
- Loads translations from JSON files.
- Provides locale routing and global translation support.

You can add more locales by expanding the `translations/` folder and updating the middleware configuration.

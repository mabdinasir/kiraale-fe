import React from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { League_Spartan } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Navbar from '@components/Layout/Navbar'
import Switcher from '@components/UI/Switcher'
import Footer from '@components/Layout/Footer'
import { Toaster } from 'react-hot-toast'

import '../globals.css'
import '@assets/css/materialdesignicons.min.css'
import '@assets/css/tailwind.css'

const league_Spartan = League_Spartan({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
    variable: '--font-league_Spartan',
})

export const metadata: Metadata = {
    title: 'Kiraale',
    description: `Kiraale is a platform that connects property owners with renters and travelers in Somalia and Kenya. We simplify the process of renting homes, finding tenants, and booking hotels, making it easier for everyone to find their perfect space.`,
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params
    const messages = await getMessages()

    return (
        <html lang={locale} className="light scroll-smooth" dir="ltr">
            <body className={`${league_Spartan.className} dark:bg-slate-900 antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {children}
                    <Switcher />
                    <Analytics />
                    <Footer />
                    <Toaster position="bottom-left" />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

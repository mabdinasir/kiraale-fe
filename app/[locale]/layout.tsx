import React from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { Rubik } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
    style: ['italic', 'normal'],
    preload: true,
    weight: ['500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: 'Eastleigh Real Estate',
    description: `Eastleigh Real Estate is a platform that connects property owners with renters and travelers in Kenya. We simplify the process of renting homes, finding tenants, and booking hotels, making it easier for everyone to find their perfect space.`,
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
        <html lang={locale}>
            <body className={`${rubik.className} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Analytics />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

'use client' // This is a client component 👈🏽

import Sidebar from '@components/Layout/Sidebar'
import React, { useState } from 'react'
import '@assets/css/globals.css'
import '@assets/css/tailwind2.css'
import '@assets/css/materialdesignicons2.min.css'
import TopHeader from '@components/Layout/TopHeader'
import Switcher from '@components/UI/DashboardSwitcher'
import DashboardFooter from '@components/Layout/DashboardFooter'
import StoreProvider from '../StoreProvider'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <div className={`${toggle ? '' : 'toggled'} page-wrapper`}>
                <Sidebar />
                <main className="page-content bg-gray-50 dark:bg-slate-800 min-h-screen">
                    <StoreProvider>
                        <TopHeader toggle={toggle} setToggle={setToggle} />
                    </StoreProvider>
                    <div className="mx-4">{children}</div>
                    <DashboardFooter />
                    <Switcher />
                </main>
            </div>
        </>
    )
}

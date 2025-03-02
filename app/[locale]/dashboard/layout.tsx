import Sidebar from '@components/Layout/Sidebar'
import React from 'react'
import TopHeader from '@components/Layout/TopHeader/TopHeader'
import Switcher from '@components/UI/DashboardSwitcher'
import DashboardFooter from '@components/Layout/DashboardFooter'
import StoreProvider from '../StoreProvider'

import '../../globals.css'
import '@assets/css/tailwind2.css'
import '@assets/css/materialdesignicons2.min.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <div className={'toggled page-wrapper'}>
                <Sidebar />
                <main className="page-content bg-gray-50 dark:bg-slate-800 min-h-screen">
                    <StoreProvider>
                        <TopHeader />
                    </StoreProvider>
                    <div className="container-fluid relative pb-16">
                        <div className="mx-4 className layout-spacing">{children}</div>
                    </div>
                    <DashboardFooter />
                    <Switcher />
                </main>
            </div>
        </>
    )
}

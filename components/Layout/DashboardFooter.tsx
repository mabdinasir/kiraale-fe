import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const DashboardFooter = () => {
    const t = useTranslations()

    return (
        <footer className="shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 px-8 py-4 fixed bottom-0 w-full">
            <div className="container-fluid">
                <div className="grid grid-cols-1">
                    <div className="sm:text-start text-center mx-md-2">
                        <p className="mb-0 text-slate-400">
                            ©{new Date().getFullYear()} {t('developed-by')}{' '}
                            <Link
                                href="https://btj.so/"
                                target="_blank"
                                className="text-reset text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                            >
                                BTJ Software
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default DashboardFooter

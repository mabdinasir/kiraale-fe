'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import Accordion from '@components/UI/Accordion'
import PropertyFilters from '../components/PropertyFilters'
import StoreProvider from 'app/[locale]/StoreProvider'
import PropertyListItem from '../components/PropertyListItem'
import { useEffect, useState } from 'react'

const PropertyList = () => {
    const t = useTranslations()
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 992)
        }

        // Set initial value
        checkScreenSize()

        // Add event listener
        window.addEventListener('resize', checkScreenSize)

        // Clean up
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <div className="mt-20">
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            {t('property-listings')}
                        </h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className={`flex gap-6 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
                        <div className="lg:w-[300px] xl:w-[350px] flex-shrink-0">
                            <Accordion
                                collapsibleComponent={<PropertyFilters />}
                                defaultComponentActive={isDesktop}
                                componentTitle={t('property-filters')}
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className=""
                                        fill="currentColor"
                                    >
                                        <path d="M14.9 9h2V7h4V5h-4V3h-2zm6 4v-2h-10v2zm-14-4v2H3v2h4v2h2V9zm6 12v-2h8v-2h-8v-2h-2v6zM2.9 5v2h10V5zm0 12v2h6v-2z"></path>
                                    </svg>
                                }
                            />
                        </div>

                        {/* Listings section */}
                        <div className="flex-1 min-w-0">
                            <StoreProvider key={'search-properties'}>
                                <PropertyListItem />
                            </StoreProvider>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PropertyList

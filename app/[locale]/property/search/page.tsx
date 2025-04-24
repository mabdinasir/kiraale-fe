'use client' // This is a client component 👈🏽

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Accordion from '@components/UI/Accordion'
import PropertyFilters from '../components/PropertyFilters'
import StoreProvider from 'app/[locale]/StoreProvider'
import PropertyListItem from '../components/PropertyListItem'
import { FaSliders } from 'react-icons/fa6'

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
                                isResponsive={true}
                                isDesktop={isDesktop}
                                componentTitle={t('property-filters')}
                                icon={<FaSliders size={18} />}
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

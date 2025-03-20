'use client' // This is a client component 👈🏽

import React from 'react'
import Feature from '@components/UI/Feature'
import GetInTuch from '@components/UI/GetInTouch'
import FeaturedProperties from 'app/[locale]/property/components/FeaturedProperties'
import { Search } from 'react-feather'
import BuyTab from '@components/UI/BuyTab'
import { useTranslations } from 'next-intl'
import StoreProvider from '../StoreProvider'
import { useParams } from 'next/navigation'

const Buy = () => {
    const t = useTranslations()
    const { locale } = useParams()
    const path = `/${locale}/property/search`

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
                            {t('find-home')}
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
            <section className="relative md:pb-24 pb-16">
                <div className="container relative -mt-[25px]">
                    <div className="grid grid-cols-1">
                        <div className="subcribe-form z-1">
                            <form className="relative max-w-2xl mx-auto" action={path}>
                                <Search className="w-5 h-5 absolute top-[47%] -translate-y-1/2 start-4"></Search>
                                <input
                                    type="text"
                                    id="search_query"
                                    name="query"
                                    className="rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 ps-12"
                                    placeholder={t('Search-address-property')}
                                />
                                <input type="hidden" name="listingType" value={'SALE'} />
                                <button
                                    type="submit"
                                    className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                                >
                                    {t('search')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <StoreProvider key={'featured-properties-buy'}>
                    <FeaturedProperties />
                </StoreProvider>
                <Feature />
                <BuyTab />
                <GetInTuch />
            </section>
        </div>
    )
}

export default Buy

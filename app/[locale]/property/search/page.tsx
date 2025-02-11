import React from 'react'
import { FiSearch } from 'react-icons/fi'
import Navbar from '@components/Layout/Navbar'
import { useTranslations } from 'next-intl'
import StoreProvider from 'app/[locale]/StoreProvider'
import PropertyListItem from '../components/PropertyListItem'

const PropertyList = () => {
    const t = useTranslations()

    return (
        <>
            <Navbar navClass="navbar-white" topnavClass={''} tagline={false} />
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
                    <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-4 md:col-span-6">
                            <div className="shadow dark:shadow-gray-700 p-6 rounded-xl bg-white dark:bg-slate-900 sticky top-20">
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label htmlFor="searchname" className="font-medium">
                                                {t('search-properties')}
                                            </label>
                                            <div className="relative mt-2">
                                                <FiSearch className="absolute top-[8px] start-3" width={18} />
                                                <input
                                                    name="search"
                                                    id="searchname"
                                                    type="text"
                                                    className="form-input border border-slate-100 dark:border-slate-800 ps-10"
                                                    placeholder={t('search')}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-medium">Categories</label>
                                            <select className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                <option value="re">Residential</option>
                                                <option value="la">Land</option>
                                                <option value="co">Commercial</option>
                                                <option value="ind">Industrial</option>
                                                <option value="inv">Investment</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium">Location</label>
                                            <select className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                <option value="NY">New York</option>
                                                <option value="MC">North Carolina</option>
                                                <option value="SC">South Carolina</option>
                                            </select>
                                        </div>

                                        <div>
                                            <input
                                                type="submit"
                                                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md w-full"
                                                value={t('apply-filters')}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <StoreProvider key={'search-properties'}>
                            <PropertyListItem />
                        </StoreProvider>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PropertyList

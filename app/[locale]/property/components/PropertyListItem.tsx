'use client' // This is a client component 👈🏽

import ReusableLink from '@components/Links/ReusableLink'
import { useSearchPropertiesQuery } from '@store/services/properties'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { LiaCompressArrowsAltSolid } from 'react-icons/lia'
import { LuBedDouble, LuBath } from 'react-icons/lu'

const PropertyListItem = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const { data, isLoading, error } = useSearchPropertiesQuery(query)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading PropertyListItem</div>

    return (
        <div className="lg:col-span-8 md:col-span-6">
            <div className="grid grid-cols-1 gap-[30px]">
                {data?.properties?.map((item) => (
                    <div
                        key={item.id}
                        className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto xl:max-w-4xl"
                    >
                        <div className="md:flex">
                            <div className="relative">
                                <Image
                                    className="h-full w-full object-cover lg:w-64"
                                    src={item.media[0].url}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <div className="absolute top-4 end-4">
                                    <ReusableLink
                                        href="#"
                                        className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"
                                    >
                                        <i className="mdi mdi-heart mdi-18px"></i>
                                    </ReusableLink>
                                </div>
                            </div>
                            <div className="p-6 w-full">
                                <div className="md:pb-4 pb-6">
                                    <ReusableLink
                                        href={`/property-detail/${item.id}`}
                                        className="text-lg hover:text-green-600 font-medium ease-in-out duration-500"
                                    >
                                        {item.title}
                                    </ReusableLink>
                                </div>

                                <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none justify-between">
                                    <li className="flex items-center me-4">
                                        <LiaCompressArrowsAltSolid
                                            width={20}
                                            className="me-2 text-green-600 text-2xl"
                                        />
                                        <span>
                                            {item.features.area} {t('sqf')}
                                        </span>
                                    </li>

                                    <li className="flex items-center me-4">
                                        <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                        <span>
                                            {item.features.bedrooms} {t('beds')}
                                        </span>
                                    </li>

                                    <li className="flex items-center">
                                        <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                        <span>
                                            {item.features.bathrooms} {t('baths')}
                                        </span>
                                    </li>
                                </ul>

                                <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                                    <li>
                                        <span className="text-slate-400">{t('price')}</span>
                                        <p className="text-lg font-medium">${item.price}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                <div className="md:col-span-12 text-center">
                    <nav>
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <ReusableLink
                                    href="#"
                                    className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                >
                                    <FiChevronLeft className="text-[20px]" />
                                </ReusableLink>
                            </li>
                            <li>
                                <ReusableLink
                                    href="#"
                                    className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                >
                                    1
                                </ReusableLink>
                            </li>
                            <li>
                                <ReusableLink
                                    href="#"
                                    className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                >
                                    2
                                </ReusableLink>
                            </li>
                            <li>
                                <ReusableLink
                                    href="#"
                                    aria-current="page"
                                    className="z-10 w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-white bg-green-600 shadow-sm dark:shadow-gray-700"
                                >
                                    3
                                </ReusableLink>
                            </li>
                            <li>
                                <ReusableLink
                                    href="#"
                                    className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                >
                                    4
                                </ReusableLink>
                            </li>
                            <li>
                                <ReusableLink
                                    href="#"
                                    className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                >
                                    <FiChevronRight className="text-[20px]" />
                                </ReusableLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default PropertyListItem

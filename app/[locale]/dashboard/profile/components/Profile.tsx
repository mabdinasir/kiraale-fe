'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import useCurrentUser from '@hooks/useCurrentUser'
import { useGetUserByIdQuery } from '@store/services/users'
import Link from 'next/link'
import Image from 'next/image'
import { FiMail, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import { FaPassport } from 'react-icons/fa6'
import { FaRegIdCard } from 'react-icons/fa'
import { RiEyeOffLine } from 'react-icons/ri'
import { RiRadioButtonLine } from 'react-icons/ri'
import Property from '@components/UI/Property/Property'
import { useGetPropertiesByUserQuery } from '@store/services/properties'

const Profile = () => {
    const t = useTranslations()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data } = useGetUserByIdQuery(id || '')
    const { data: propertiesData } = useGetPropertiesByUserQuery(id || '')

    return (
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="grid grid-cols-1">
                    <div className="profile-banner relative text-transparent rounded-md shadow dark:shadow-gray-700 overflow-hidden">
                        <div className="relative shrink-0">
                            <Image
                                src="/images/bg/profile-avatar.jpg"
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                className="h-80 w-full object-cover"
                                id="profile-banner"
                                alt=""
                            />
                            <div className="absolute inset-0 bg-black/70"></div>
                            <label className="absolute inset-0 cursor-pointer" htmlFor="pro-banner"></label>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 grid-cols-1">
                    <div className="xl:col-span-3 lg:col-span-4 md:col-span-4 mx-6">
                        <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 -mt-48">
                            {/* <UplodProfileImg /> */}

                            <div className="border-t border-gray-100 dark:border-gray-700">
                                <h5 className="text-xl font-semibold mt-4">{t('personal-details')} :</h5>
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <FiUser className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('name')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.firstName} {data?.user?.lastName}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FiMail className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('email')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.email}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FiMapPin className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('location')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.address || 'N/A'}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FiPhone className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('phone')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.mobile}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FaPassport className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('agency-name')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.agencyName || 'N/A'}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FaPassport className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('passport-number')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.passportNumber || 'N/A'}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        <FaRegIdCard className="fea icon-ex-md text-slate-400 me-3 w-6 h-6" />
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('national-id')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.nationalIdNumber ?? 'N/A'}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-3">
                                        {data?.user?.isSignedIn ? (
                                            <RiRadioButtonLine className="fea icon-ex-md text-green-600 me-3 w-6 h-6" />
                                        ) : (
                                            <RiEyeOffLine className="fea icon-ex-md text-red-600 me-3 w-6 h-6" />
                                        )}
                                        <div className="flex-1">
                                            <h6 className="text-green-600 dark:text-white font-medium mb-0">
                                                {t('status')} :
                                            </h6>
                                            <Link href="" className="text-slate-400">
                                                {data?.user?.isSignedIn ? t('online') : t('offline')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-9 lg:col-span-8 md:col-span-8 mt-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <h5 className="text-xl font-semibold">
                                    {data?.user?.firstName} {data?.user?.lastName}
                                </h5>

                                <p className="text-slate-400 mt-3">{data?.user?.bio || 'N/A'}</p>
                            </div>

                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <h5 className="text-xl font-semibold">{t('my-properties')} :</h5>
                                <Property properties={propertiesData?.properties || []} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

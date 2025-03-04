'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FiUser, FiUserCheck, FiMail, FiPhone, FiKey, FiEdit } from 'react-icons/fi'
import { FaPassport, FaIdCard } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GrOrganization } from 'react-icons/gr'
import { TbSortAscendingNumbers } from 'react-icons/tb'
import UplodProfileImg from '@components/UI/UploadProfileImg'
import useCurrentUser from '@hooks/useCurrentUser'
import { useGetUserByIdQuery } from '@store/services/users'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import Button from '@components/UI/Button'

const ProfileSettings = () => {
    const t = useTranslations()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData, isLoading } = useGetUserByIdQuery(id || '')

    if (isLoading) return <LoadingIndicator />

    return (
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="grid grid-cols-1">
                    <div className="profile-banner relative text-transparent rounded-md shadow dark:shadow-gray-700 overflow-hidden">
                        <input id="pro-banner" name="profile-banner" type="file" className="hidden" />
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

                <div className="grid md:grid-cols-12 grid-cols-1 gap-6 mt-6">
                    <div className="xl:col-span-3 lg:col-span-4 md:col-span-4">
                        <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                            <UplodProfileImg hasInput user={userData?.user} />
                        </div>
                    </div>

                    <div className="xl:col-span-9 lg:col-span-8 md:col-span-8">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <h5 className="text-lg font-semibold mb-4">{t('personal-details')} :</h5>
                                <form>
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                        <div>
                                            <label className="form-label font-medium">
                                                {t('firstName')} : <span className="text-red-600">*</span>
                                            </label>
                                            <div className="form-icon relative mt-2">
                                                <FiUser className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    type="text"
                                                    className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                    placeholder={t('firstName')}
                                                    id="firstname"
                                                    name="firstname"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">
                                                {t('lastName')} : <span className="text-red-600">*</span>
                                            </label>
                                            <div className="form-icon relative mt-2">
                                                <FiUserCheck className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    type="text"
                                                    className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                    placeholder={t('lastName')}
                                                    id="lastname"
                                                    name="lastname"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">
                                                {t('your-email')} : <span className="text-red-600">*</span>
                                            </label>
                                            <div className="form-icon relative mt-2">
                                                <FiMail className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    type="email"
                                                    className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                    placeholder={t('email')}
                                                    name="email"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="form-label font-medium">{t('phone')} :</label>
                                            <div className="form-icon relative mt-2">
                                                <FiPhone className="w-4 h-4 absolute top-3 start-4" />
                                                <input
                                                    name="mobile"
                                                    id="number"
                                                    type="tel"
                                                    className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                    placeholder={t('phone')}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <div className="mt-5">
                                            <label className="form-label font-medium">{t('profile-desc')} : </label>
                                            <div className="form-icon relative mt-2">
                                                <FiEdit className="w-4 h-4 absolute top-3 start-4" />
                                                <textarea
                                                    name="profileDescription"
                                                    id="profile-description"
                                                    className="form-input ps-11 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                    placeholder={t('profile-desc')}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <input
                                        type="submit"
                                        id="submit"
                                        name="save-changes"
                                        className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5"
                                        value={t('save-changes')}
                                    />
                                </form>
                            </div>

                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                    <div>
                                        <h5 className="text-lg font-semibold mb-4">{t('other-details')} :</h5>
                                        <form>
                                            <div className="grid grid-cols-1 gap-5">
                                                <div>
                                                    <label className="form-label font-medium">{t('address')} : </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FaLocationDot className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            name="address"
                                                            id="address"
                                                            type="text"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('address')}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('passport-number')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FaPassport className="w-4 h-4 absolute top-3 start-4"></FaPassport>
                                                        <input
                                                            name="passport-number"
                                                            id="passport-number"
                                                            type="text"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('passport-number')}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('national-id')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FaIdCard className="w-4 h-4 absolute top-3 start-4"></FaIdCard>
                                                        <input
                                                            name="national-id"
                                                            id="national-id"
                                                            type="text"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('national-id')}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('agency-name')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <GrOrganization className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            type="text"
                                                            name="agencyName"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('agency-name')}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('years-of-experience')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <TbSortAscendingNumbers className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            type="number"
                                                            name="yearsOfExperience"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('years-of-experience')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5">
                                                {t('save-changes')}
                                            </button>
                                        </form>
                                    </div>

                                    <div>
                                        <h5 className="text-lg font-semibold mb-4">{t('change-password')} :</h5>
                                        <form>
                                            <div className="grid grid-cols-1 gap-5">
                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('old-password')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FiKey className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            type="password"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('old-password')}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('new-password')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FiKey className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            type="password"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('new-password')}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="form-label font-medium">
                                                        {t('confirm-password')} :
                                                    </label>
                                                    <div className="form-icon relative mt-2">
                                                        <FiKey className="w-4 h-4 absolute top-3 start-4" />
                                                        <input
                                                            type="password"
                                                            className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                                            placeholder={t('confirm-password')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5">
                                                {t('save-password')}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <h5 className="text-lg font-semibold mb-4 text-red-600">{t('delete-account')} :</h5>

                                <p className="text-slate-400 mb-4">{t('delete-account-desc')} </p>

                                <Button
                                    title={isLoading ? t('deleting-account') : t('delete-account')}
                                    isLoading={false}
                                    disabled={false}
                                    fullWidth={false}
                                    redVariant
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings

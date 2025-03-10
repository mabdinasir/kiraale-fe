'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import UplodProfileImg from '@components/UI/UploadProfileImg'
import useCurrentUser from '@hooks/useCurrentUser'
import { useDeactivateUserAccountMutation, useGetUserByIdQuery } from '@store/services/users'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import Button from '@components/UI/Button'
import PersonalDetailsForm from '../Forms/PersonalDetailsForm'
import OtherDetailsForm from '../Forms/OtherDetailsForm'
import ChangePasswordForm from '../Forms/ChangePasswordForm'
import { useSignOutMutation } from '@store/services/auth'
import { useAppDispatch } from '@hooks/rtkHooks'
import { clearToken } from '@store/slices/tokenSlice'

const ProfileSettings = () => {
    const t = useTranslations()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData, isLoading } = useGetUserByIdQuery(id || '')
    const [deactivateUserAccount, { isLoading: isDeactivating }] = useDeactivateUserAccountMutation()
    const [signout, { isLoading: isSigningOut }] = useSignOutMutation()
    const dispatch = useAppDispatch()

    const handleDeactivateAccount = async () => {
        if (id) {
            await deactivateUserAccount(id).unwrap()
            await signout()
            dispatch(clearToken())
        }
    }

    if (isLoading) return <LoadingIndicator />

    return (
        <div className="container-fluid relative px-3">
            <div className="layout-specing">
                <div className="grid grid-cols-1">
                    <div className="profile-banner relative text-transparent rounded-md shadow dark:shadow-gray-700 overflow-hidden">
                        <input id="pro-banner" name="profile-banner" type="file" className="hidden" disabled />
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
                            <PersonalDetailsForm user={userData?.user} />
                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                                    <OtherDetailsForm user={userData?.user} />
                                    <ChangePasswordForm user={userData?.user} />
                                </div>
                            </div>

                            <div className="p-6 relative rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900">
                                <h5 className="text-lg font-semibold mb-4 text-red-600">{t('deactivate-account')} :</h5>
                                <p className="text-slate-400 mb-4">{t('deactivate-account-desc')} </p>
                                <Button
                                    title={isLoading ? t('deactivating-account') : t('deactivate-account')}
                                    isLoading={isDeactivating || isSigningOut}
                                    disabled={isDeactivating || isSigningOut}
                                    fullWidth={false}
                                    redVariant
                                    onClick={handleDeactivateAccount}
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

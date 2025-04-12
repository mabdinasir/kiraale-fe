'use client' // This is a client component 👈🏽

import React, { FC } from 'react'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import ReusableLink from '@components/Links/ReusableLink'
// import Notifications from '@components/Layout/TopHeader/Notifications'
import LanguageSelector from '@components/Layout/TopHeader/LanguageSelector'
import TopHeaderProfileMenu from './TopHeaderProfileMenu'
import StoreProvider from 'app/[locale]/StoreProvider'

const TopHeader: FC = () => (
    <div className="top-header">
        <div className="header-bar flex justify-between">
            <div className="flex items-center space-x-1">
                <ReusableLink href="/" className="xl:hidden block me-2">
                    <Image src="/images/logo-icon-32.png" width={32} height={32} className="md:hidden block" alt="" />
                    <span className="md:block hidden">
                        <Image
                            src="/images/logo-dark.png"
                            width={98}
                            height={28}
                            className="inline-block dark:hidden"
                            alt=""
                        />
                        <Image
                            src="/images/logo-light.png"
                            width={98}
                            height={28}
                            className="hidden dark:inline-block"
                            alt=""
                        />
                    </span>
                </ReusableLink>

                <div
                    id="close-sidebar"
                    className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md cursor-pointer"
                    onClick={() => {
                        const sidebar = document.querySelector('.page-wrapper')
                        sidebar?.classList.toggle('toggled')
                    }}
                >
                    <FiMenu className="h-4 w-4" />
                </div>

                {/* <div className="ps-1.5">
                    <div className="form-icon relative sm:block hidden">
                        <i className="mdi mdi-magnify absolute top-1/2 -translate-y-1/2 mt-[1px] start-3"></i>
                        <input
                            type="text"
                            className="form-input w-56 ps-9 py-2 px-3 h-8 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded-md outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 bg-white"
                            name="searchBox"
                            id="searchItem"
                            placeholder="Search..."
                        />
                    </div>
                </div> */}
            </div>

            <ul className="list-none mb-0 space-x-1">
                <LanguageSelector />

                {/* <Notifications /> */}

                <StoreProvider key={'profile'}>
                    <TopHeaderProfileMenu />
                </StoreProvider>
            </ul>
        </div>
    </div>
)

export default TopHeader

'use client'
import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

const Switcher = () => {
    const changeMode = (mode: 'mode' | 'layout') => {
        switch (mode) {
            case 'mode':
                if (document.documentElement.className.includes('dark')) {
                    document.documentElement.className = 'light'
                } else {
                    document.documentElement.className = 'dark'
                }
                break
            // case 'layout':
            //     if (event.target?.innerText === 'LTR') {
            //         document.documentElement.dir = 'ltr'
            //     } else {
            //         document.documentElement.dir = 'rtl'
            //     }
            //     break

            default:
                break
        }
    }
    return (
        <>
            <div className="fixed top-[30%] -end-2 z-50">
                <span className="relative inline-block rotate-90">
                    <input
                        type="checkbox"
                        className="checkbox opacity-0 absolute"
                        id="chk"
                        onClick={() => changeMode('mode')}
                    />
                    <label
                        className="label bg-slate-900 dark:bg-white shadow dark:shadow-gray-700 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
                        htmlFor="chk"
                    >
                        <FiMoon className="h-[18px] w-[18px] text-yellow-500" />
                        <FiSun className="h-[18px] w-[18px] text-yellow-500" />
                        <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
                    </label>
                </span>
            </div>
            {/* <div className="fixed top-[40%] -end-3 z-50">
                <Link href="#" id="switchRtl">
                    <span
                        className="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold rtl:block ltr:hidden"
                        onClick={() => changeMode('layout')}
                    >
                        LTR
                    </span>
                    <span
                        className="py-1 px-3 relative inline-block rounded-b-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow dark:shadow-gray-800 font-semibold ltr:block rtl:hidden"
                        onClick={() => changeMode('layout')}
                    >
                        RTL
                    </span>
                </Link>
            </div> */}
        </>
    )
}

export default Switcher

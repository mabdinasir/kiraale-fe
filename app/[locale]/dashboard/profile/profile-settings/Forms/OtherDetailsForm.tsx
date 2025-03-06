import React from 'react'
import { FaPassport, FaIdCard } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { GrOrganization } from 'react-icons/gr'
import { TbSortAscendingNumbers } from 'react-icons/tb'
import { useTranslations } from 'next-intl'

const OtherDetailsForm = () => {
    const t = useTranslations()

    return (
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
                        <label className="form-label font-medium">{t('passport-number')} :</label>
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
                        <label className="form-label font-medium">{t('national-id')} :</label>
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
                        <label className="form-label font-medium">{t('agency-name')} :</label>
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
                        <label className="form-label font-medium">{t('years-of-experience')} :</label>
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
    )
}

export default OtherDetailsForm

import React from 'react'
import { FiUser, FiMail, FiPhone, FiUserCheck, FiEdit } from 'react-icons/fi'
import { useTranslations } from 'next-intl'

const PersonalDetailsForm = () => {
    const t = useTranslations()

    return (
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
    )
}

export default PersonalDetailsForm

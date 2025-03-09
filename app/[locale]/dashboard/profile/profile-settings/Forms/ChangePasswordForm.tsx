import React from 'react'
import { FiKey } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import { User } from '@models/user'

type ChangePasswordFormProps = {
    user?: User
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ user }) => {
    const t = useTranslations()

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">{t('change-password')} :</h5>
            <form>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="form-label font-medium">{t('old-password')} :</label>
                        <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="password"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('old-password')}
                                id="old-password"
                                name="old-password"
                                defaultValue={user?.password}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label font-medium">{t('new-password')} :</label>
                        <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="password"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('new-password')}
                                id="new-password"
                                name="new-password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label font-medium">{t('confirm-password')} :</label>
                        <div className="form-icon relative mt-2">
                            <FiKey className="w-4 h-4 absolute top-3 start-4" />
                            <input
                                type="password"
                                className="form-input ps-12 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-800 dark:focus:border-green-600 focus:ring-0"
                                placeholder={t('confirm-password')}
                                id="confirm-password"
                                name="confirm-password"
                            />
                        </div>
                    </div>
                </div>

                <button className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5">
                    {t('save-password')}
                </button>
            </form>
        </div>
    )
}

export default ChangePasswordForm

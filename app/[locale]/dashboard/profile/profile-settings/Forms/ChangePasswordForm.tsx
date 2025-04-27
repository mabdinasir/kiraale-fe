import React, { useCallback, useState } from 'react'
import { useTranslations } from 'next-intl'
import { User } from '@models/user'
import Button from '@components/UI/Button'
import PasswordInput from '@components/UI/PasswordInput'
import { useUpdateUserPasswordMutation } from '@store/services/users'
import { ProfilePassword, profilePasswordSchema } from 'schemas'
import { z } from 'zod'
import showToast from '@utils/showToast'
import isApiError from '@utils/isApiError'
import Error from '@components/UI/Error'
import { ApiError } from '@models/apiError'

type ChangePasswordFormProps = {
    user?: User
}

type FormErrors = Partial<Record<keyof ProfilePassword, string>>

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ user }) => {
    const t = useTranslations()
    const [errors, setErrors] = useState<FormErrors>({})
    const [updateUserPassword, { isLoading, error }] = useUpdateUserPasswordMutation()

    const [formData, setFormData] = useState<ProfilePassword>({
        oldPassword: user?.password || '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const validateFields = useCallback(async () => {
        try {
            await profilePasswordSchema.parseAsync(formData)
            setErrors({})
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors: FormErrors = {}
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof ProfilePassword
                    newErrors[field] = issue.message
                })
                setErrors(newErrors)
            }
            return false
        }
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            try {
                await updateUserPassword({ id: user?.id || '', passwords: formData }).unwrap()
                showToast('success', t('password-updated-successfully'))
                setFormData({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
            } catch (err) {
                if (isApiError(err)) {
                    showToast('error', err.data.message)
                } else {
                    const errorMessage = (err as ApiError)?.data?.message
                    showToast('error', `${t('something-went-wrong')}: ${errorMessage}`)
                }
            }
        },
        [validateFields, updateUserPassword, user?.id, formData, t],
    )

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">{t('change-password')} :</h5>
            <form noValidate onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-5">
                    <PasswordInput
                        label={t('old-password')}
                        name="oldPassword"
                        value={formData.oldPassword}
                        placeholder={t('old-password')}
                        error={errors.oldPassword}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        label={t('new-password')}
                        name="newPassword"
                        value={formData.newPassword}
                        placeholder={t('new-password')}
                        error={errors.newPassword}
                        onChange={handleInputChange}
                    />
                    <PasswordInput
                        label={t('confirm-password')}
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        placeholder={t('confirm-password')}
                        error={errors.confirmNewPassword}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Error Message */}
                {error && isApiError(error) && (
                    <div className="mt-4">
                        <Error error={error.data.message} />
                        {error.data.errors?.map((err, index) => (
                            <Error key={index} error={`${err.field}: ${err.message}`} />
                        ))}
                    </div>
                )}

                <Button
                    title={isLoading ? t('saving-password') : t('save-password')}
                    className="mt-5"
                    isLoading={isLoading}
                    disabled={isLoading || Object.values(errors).some((err) => !!err)}
                />
            </form>
        </div>
    )
}

export default ChangePasswordForm

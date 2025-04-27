'use client' // This is a client component 👈🏽

import { MdDelete } from 'react-icons/md'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useSoftDeletePropertyMutation } from '@store/services/properties'
import showToast from '@utils/showToast'
import { useTranslations } from 'next-intl'
import { ApiError } from '@models/apiError'

type AdminDeleteButtonProps = {
    propertyId: string
}

const AdminDeleteButton: React.FC<AdminDeleteButtonProps> = ({ propertyId }) => {
    const t = useTranslations()
    const [softDeleteProperty, { isLoading }] = useSoftDeletePropertyMutation()

    const handleDeleteProperty = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await softDeleteProperty(propertyId).unwrap()
            showToast('success', t('property-deleted'))
        } catch (error) {
            const errorMessage = (error as ApiError)?.data?.message
            showToast('error', `${t('property-deletion-failed')}: ${errorMessage}`)
        }
    }

    return (
        <button
            className="btn btn-icon p-2 bg-white dark:bg-gray-600 shadow dark:shadow-gray-700 rounded-full border border-gray-600 flex items-center justify-center w-10 h-10 top-2 end-4 absolute z-10"
            onClick={handleDeleteProperty}
            disabled={isLoading}
        >
            {isLoading && <LoadingIndicator redVariant />}
            {!isLoading && <MdDelete className="text-red-600 text-2xl" />}
        </button>
    )
}

export default AdminDeleteButton

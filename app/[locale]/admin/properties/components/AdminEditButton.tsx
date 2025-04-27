import React from 'react'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type AdminEditButtonProps = {
    propertyId: string
}

const AdminEditButton: React.FC<AdminEditButtonProps> = ({ propertyId }) => {
    const router = useRouter()

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(`/admin/properties/${propertyId}/edit`)
    }

    return (
        <button
            className="btn btn-icon p-2 bg-white dark:bg-gray-600 shadow dark:shadow-gray-700 rounded-full border border-gray-600 flex items-center justify-center w-10 h-10 top-16 end-4 absolute z-10"
            onClick={handleEditClick}
        >
            {<MdEdit className="text-red-600 text-2xl" />}
        </button>
    )
}

export default AdminEditButton

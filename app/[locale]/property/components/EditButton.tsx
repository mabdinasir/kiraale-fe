import React from 'react'
import { MdEdit } from 'react-icons/md'
import { useRouter } from 'next/navigation'

type EditButtonProps = {
    propertyId: string
}

const EditButton: React.FC<EditButtonProps> = ({ propertyId }) => {
    const router = useRouter()

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push(`/dashboard/properties/edit-property/${propertyId}`)
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

export default EditButton

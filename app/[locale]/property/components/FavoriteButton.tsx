'use client' // This is a client component 👈🏽

import React from 'react'
import { useToggleFavoritePropertyMutation } from '@store/services/properties'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import LoadingIndicator from '@components/UI/LoadingIndicator'

type FavoriteButtonProps = {
    propertyId: string
    isFavorited: boolean
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ propertyId, isFavorited }) => {
    const [toggleFavoriteProperty, { isLoading }] = useToggleFavoritePropertyMutation()
    const [localFavorited, setLocalFavorited] = React.useState(isFavorited)

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault()
        setLocalFavorited((prev) => !prev)
        try {
            await toggleFavoriteProperty(propertyId).unwrap()
        } catch {
            setLocalFavorited((prev) => !prev)
        }
    }

    return (
        <button
            className="btn btn-icon p-2 bg-white dark:bg-gray-600 shadow dark:shadow-gray-700 rounded-full border border-gray-600 flex items-center justify-center w-10 h-10 top-4 end-4 absolute z-10"
            onClick={handleToggleFavorite}
            disabled={isLoading}
        >
            {isLoading && <LoadingIndicator redVariant />}
            {!isLoading && localFavorited && <MdFavorite className="text-red-600 text-2xl" />}
            {!isLoading && !localFavorited && <MdFavoriteBorder className="text-red-600 text-2xl" />}
        </button>
    )
}

export default FavoriteButton

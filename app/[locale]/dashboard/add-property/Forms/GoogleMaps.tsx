/* eslint-disable no-unused-vars */

import { useTranslations } from 'next-intl'
import React, { FC, useRef, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { FormErrors } from './AddPropertyForm'
import Error from '@components/UI/Error'
import { useJsApiLoader, StandaloneSearchBox, Libraries } from '@react-google-maps/api'
import useDebouncedEffect from 'use-debounced-effect'
import { AddPropertyForm } from '@models/properties/addPropertyForm'

type GoogleMapsProps = {
    propertyData: AddPropertyForm
    errors: FormErrors
    handleChange: (
        e:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
            | { target: { name: string; value: string } },
    ) => void
}

const GoogleMaps: FC<GoogleMapsProps> = ({ propertyData, errors, handleChange }) => {
    const t = useTranslations()
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
    const [address, setAddress] = useState(propertyData.address)
    const [libraries] = useState<Libraries>(['places'])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries,
    })

    useDebouncedEffect(
        () => {
            if (address) {
                handleChange({ target: { name: 'address', value: address } })
            }
        },
        500,
        [address],
    )

    const handlePlaceSelect = () => {
        const places = searchBoxRef.current?.getPlaces()
        if (places && places.length > 0) {
            const selectedAddress = places[0].formatted_address || ''
            setAddress(selectedAddress)
        }
    }

    return (
        <div className="col-span-12">
            <label htmlFor="address" className="font-medium">
                {t('address')}:
            </label>
            <div className="form-icon relative mt-2">
                <FiMapPin className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                {isLoaded && (
                    <StandaloneSearchBox
                        onLoad={(ref) => {
                            searchBoxRef.current = ref
                        }}
                        onPlacesChanged={handlePlaceSelect}
                    >
                        <input
                            name="address"
                            id="address"
                            type="text"
                            className="form-input ps-11"
                            placeholder={t('address')}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </StandaloneSearchBox>
                )}
            </div>
            {errors?.address && <Error error={errors.address} />}
        </div>
    )
}

export default GoogleMaps

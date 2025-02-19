import React from 'react'
import StoreProvider from 'app/[locale]/StoreProvider'
import PropertyDetail from '../components/PropertyDetail'

const Property = () => (
    <StoreProvider key={'propertyDetail'}>
        <PropertyDetail />
    </StoreProvider>
)

export default Property

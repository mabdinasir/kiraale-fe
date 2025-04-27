import React from 'react'
import StoreProvider from 'app/[locale]/StoreProvider'
import AdminPropertyDetail from '../components/AdminPropertyDetail'

const Property = () => (
    <StoreProvider key={'AdminPropertyDetail'}>
        <AdminPropertyDetail />
    </StoreProvider>
)

export default Property

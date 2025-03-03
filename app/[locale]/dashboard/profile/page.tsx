import React from 'react'
import Profile from './components/Profile'
import StoreProvider from 'app/[locale]/StoreProvider'

const page = () => (
    <StoreProvider key={'user-profile'}>
        <Profile />
    </StoreProvider>
)

export default page

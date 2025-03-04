import React from 'react'

import StoreProvider from 'app/[locale]/StoreProvider'
import ProfileSettings from './components/ProfileSettings'

const page = () => (
    <StoreProvider key={'profile-settings'}>
        <ProfileSettings />
    </StoreProvider>
)

export default page

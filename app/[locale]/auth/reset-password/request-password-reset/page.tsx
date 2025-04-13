import React from 'react'
import RequestResetPassword from '../Forms/RequestResetPasswordForm'
import StoreProvider from 'app/[locale]/StoreProvider'

const page = () => (
    <StoreProvider>
        <RequestResetPassword />
    </StoreProvider>
)

export default page

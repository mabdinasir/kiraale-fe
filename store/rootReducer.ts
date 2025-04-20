import { combineReducers } from '@reduxjs/toolkit'
import { todosApi } from './services/todos'
import { authApi } from './services/auth'
import tokenSlice from './slices/tokenSlice'
import { usersApi } from './services/users'
import { propertiesApi } from './services/properties'
import { mediaAPi } from './services/media'
import stepValidationReducer from '@store/slices/stepValidation'
import { subscriberApi } from './services/subscriber'
import { contactAPi } from './services/contact'
import { fileUploadsApi } from './services/fileUploads'
import { paymentsAPi } from './services/payments'

const rootReducer = combineReducers({
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [mediaAPi.reducerPath]: mediaAPi.reducer,
    [subscriberApi.reducerPath]: subscriberApi.reducer,
    [contactAPi.reducerPath]: contactAPi.reducer,
    [fileUploadsApi.reducerPath]: fileUploadsApi.reducer,
    [paymentsAPi.reducerPath]: paymentsAPi.reducer,
    token: tokenSlice,
    stepValidation: stepValidationReducer,
})

export default rootReducer

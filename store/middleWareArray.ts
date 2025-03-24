import { authApi } from './services/auth'
import { contactAPi } from './services/contact'
import { fileUploadsApi } from './services/fileUploads'
import { mediaAPi } from './services/media'
import { paymentsAPi } from './services/payments'
import { propertiesAPi } from './services/properties'
import { subscriberApi } from './services/subscriber'
import { todosApi } from './services/todos'
import { usersApi } from './services/users'

const middlewareArray = [
    todosApi.middleware,
    authApi.middleware,
    usersApi.middleware,
    propertiesAPi.middleware,
    mediaAPi.middleware,
    subscriberApi.middleware,
    contactAPi.middleware,
    fileUploadsApi.middleware,
    paymentsAPi.middleware,
]

export default middlewareArray

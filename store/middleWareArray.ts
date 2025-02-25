import { authApi } from './services/auth'
import { contactAPi } from './services/contact'
import { mediaAPi } from './services/media'
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
]

export default middlewareArray

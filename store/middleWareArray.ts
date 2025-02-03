import { authApi } from './services/auth'
import { propertiesAPi } from './services/properties'
import { todosApi } from './services/todos'
import { usersApi } from './services/users'

const middlewareArray = [todosApi.middleware, authApi.middleware, usersApi.middleware, propertiesAPi.middleware]

export default middlewareArray

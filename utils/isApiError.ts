import { ApiError } from '@models/apiError'

const isApiError = (error: unknown): error is ApiError =>
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'success' in error.data &&
    'message' in error.data

export default isApiError

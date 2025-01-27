import { allowedFileTypes } from '@config/index'

const isValidFile = (file: File) => file.size <= 10 * 1024 * 1024 && allowedFileTypes.includes(file.type)

export default isValidFile

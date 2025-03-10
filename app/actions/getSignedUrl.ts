'use server'

import crypto from 'crypto'
import { GetSignedURLParams, SignedURLResponse } from '@models/properties/signedUrl'
import { allowedFileTypes, maxFileSize } from '@config/index'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createS3Client, createPutObjectCommand } from '@utils/s3Client'

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const getSignedURL = async ({ fileType, fileSize, checksum, user }: GetSignedURLParams): SignedURLResponse => {
    if (!allowedFileTypes.includes(fileType)) {
        return { failure: `File type ${fileType} is not allowed` }
    }

    if (fileSize > maxFileSize) {
        return { failure: 'File size too large' }
    }

    const fileName = generateFileName()

    const url = await getSignedUrl(
        createS3Client(process.env.AWS_BUCKET_REGION!, process.env.AWS_ACCESS_KEY!, process.env.AWS_SECRET_ACCESS_KEY!),
        createPutObjectCommand(process.env.AWS_BUCKET_NAME!, fileName, fileType, fileSize, checksum, user.id),
        { expiresIn: 3600 }, // 1 hour
    )

    return { success: { url, id: fileName } }
}

export default getSignedURL

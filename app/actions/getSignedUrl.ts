'use server'

import crypto from 'crypto'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { GetSignedURLParams, SignedURLResponse } from '@models/properties/signedUrl'
import { allowedFileTypes, maxFileSize } from '@config/index'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const getSignedURL = async ({ fileType, fileSize, checksum }: GetSignedURLParams): SignedURLResponse => {
    if (!allowedFileTypes.includes(fileType)) {
        return { failure: `File type ${fileType} is not allowed` }
    }

    if (fileSize > maxFileSize) {
        return { failure: 'File size too large' }
    }

    const fileName = generateFileName()

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
    })

    const url = await getSignedUrl(s3Client, putObjectCommand, { expiresIn: 3600 }) // 1 hour

    return { success: { url, id: fileName } }
}

export default getSignedURL

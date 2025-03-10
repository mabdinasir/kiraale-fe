import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const createS3Client = (region: string, accessKeyId: string, secretAccessKey: string) =>
    new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    })

const createPutObjectCommand = (
    bucketName: string,
    fileName: string,
    fileType: string,
    fileSize: number,
    checksum: string,
    userId: string,
) =>
    new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
        Metadata: {
            userId,
        },
    })

export { createS3Client, createPutObjectCommand }

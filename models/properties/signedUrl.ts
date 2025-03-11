import { User } from '@models/user'

export type SignedURLResponse = Promise<
    { failure?: undefined; success: { url: string; id: string } } | { failure: string; success?: undefined }
>

export type GetSignedURLParams = {
    bucketName: string
    bucketRegion: string
    accessKeyId: string
    secretAccessKey: string
    fileType: string
    fileSize: number
    checksum: string
    user: User
}

import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kiraale-properties-bucket.s3.ap-southeast-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'kiraale-profile-pic-bucket.s3.ap-southeast-2.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
}

export default withNextIntl(nextConfig)

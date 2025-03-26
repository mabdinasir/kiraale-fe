import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'eastleigh-real-estate-properties.s3.ap-southeast-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'eastleigh-real-estate-profile-pic-bucket.s3.ap-southeast-2.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://3.25.52.143:8080/api/:path*',
            },
        ]
    },
}

export default withNextIntl(nextConfig)

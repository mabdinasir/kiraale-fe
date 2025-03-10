import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
    images: {
        domains: ['eastleigh-real-estate-properties.s3.ap-southeast-2.amazonaws.com'],
    },
}

export default withNextIntl(nextConfig)

import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale
    if (!locale) notFound()

    return {
        locale,
        messages: (await import(`../translations/${locale}.json`)).default,
    }
})

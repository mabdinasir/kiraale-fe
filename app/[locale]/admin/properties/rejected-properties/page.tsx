import Starter from '@components/UI/Starter'
import StoreProvider from 'app/[locale]/StoreProvider'
import { useTranslations } from 'next-intl'
import RejectedProperties from '../components/RejectedProperties'

const Page = () => {
    const t = useTranslations()

    return (
        <Starter title={t('rejected-properties')} description={t('rejected-properties-description')}>
            <StoreProvider>
                <RejectedProperties />
            </StoreProvider>
        </Starter>
    )
}

export default Page

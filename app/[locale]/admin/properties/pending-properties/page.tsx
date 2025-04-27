import Starter from '@components/UI/Starter'
import StoreProvider from 'app/[locale]/StoreProvider'
import { useTranslations } from 'next-intl'
import PendingProperties from '../components/PendingProperties'

const Page = () => {
    const t = useTranslations()

    return (
        <Starter title={t('pending-properties')} description={t('pending-properties-description')}>
            <StoreProvider>
                <PendingProperties />
            </StoreProvider>
        </Starter>
    )
}

export default Page

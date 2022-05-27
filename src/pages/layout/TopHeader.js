import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../components/DropdownMenu';
import { SUPPORT_LOCALES } from '../../config';

export default function TopHeader() {
    const { t } = useTranslation();
    const { language } = useSelector((state) => state.setting);

    useEffect(() => {

    }, []);
    return (
        <div className="flex justify-between">
            <div className="flex gap-4">
                <Link to='/support'>{t('words.support')}</Link>
                <Link to='/featured-products'>{t('words.features-products')}</Link>
                <Link to='/FAQ'>{t('words.faq')}</Link>
            </div>
            <div className='hidden md:flex'>
                <DropdownMenu
                    direction='dropdown-end'
                    header={
                        <button className='btn btn-sm border-0 bg-none p-0'>
                            <Icon icon={language?.flag} width={20}></Icon >{language.value}
                        </button>
                    }
                    items={
                        SUPPORT_LOCALES.map((locale, index) => (
                            <button className='btn btn-sm border-0 bg-none p-0' key = {locale.key}>
                                <Icon icon={locale?.flag} width={20}></Icon >{locale.value}
                            </button>
                        ))
                    }
                />
            </div>
        </div>
    )
}
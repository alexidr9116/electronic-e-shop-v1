import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../components/DropdownMenu';
import { SUPPORT_LOCALES } from '../../config';
import { setThemeModeToStore } from '../../store/action/settingAction'

export default function TopHeader() {
    const { t } = useTranslation();
    const { language, themeMode } = useSelector((state) => state.setting);
    const handleThemeMode = async()=>{
     
        if(themeMode === 'light'){
            await setThemeModeToStore('night')
        }
        else{
            await setThemeModeToStore('light')
        }
    }
    useEffect(() => {

    }, []);
    return (
        <div className={`flex justify-between px-2 items-center border-b ${themeMode==='light'?'border-stone-300':'border-gray-800'}`}>
            <div className="flex gap-4">
                <Link to='/support'>{t('words.support')}</Link>
                <Link to='/featured-products'>{t('words.featured-products')}</Link>
                <Link to='/FAQ'>{t('words.faq')}</Link>
            </div>
            <div className='flex items-center'>
                <div className='flex gap-2'>
                    <button className='rounded-full btn-sm btn-ghost btn p-2 ' onClick={handleThemeMode}>
                        {themeMode === "light" &&
                            <Icon icon = {'ic:baseline-mode-night'} width={14}></Icon>
                        }
                        {themeMode === 'night' && 
                            <Icon icon = {'icomoon-free:sun'}  width={14}></Icon>
                        }
                    </button>
                </div>
                <div className='hidden sm:flex'>
                    <DropdownMenu
                        contentClass='w-32'
                        direction='dropdown-end'
                        header={
                            <button className='btn btn-sm border-0 bg-none px-2 btn-ghost'>
                                <Icon icon={language?.flag} width={20} className="mr-2"></Icon >{language.value}
                            </button>
                        }
                        items={
                            SUPPORT_LOCALES.map((locale, index) => (
                                <button className='btn btn-sm border-0 bg-none p-0  btn-ghost justify-start ' key={locale.key}>
                                    <Icon icon={locale?.flag} width={20} className="mx-2"></Icon >{locale.value}
                                </button>
                            ))
                        }
                    />
                </div>
            </div>

        </div>
    )
}
import { useSelector } from 'react-redux';
import { SUPPORT_MEMORY_SIZE } from '../../config';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import ProductFilter from '../../sections/products/ProductFilter';
import useResponsive from '../../hook/useResponsive';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Drawer from '../../components/Drawer';


export default function Shopping() {
    const { isMobile } = useResponsive();
    const { t } = useTranslation();
    const { themeMode } = useSelector((state) => state.setting);
    const { categories } = useSelector((state) => state.shopping);
    const [viewMode,setViewMode] = useState('grid');
    const [showFilter,setShowFilter] = useState(false);

    const handleViwMode = ()=>{
        setViewMode((viewMode==='grid'?'list':'grid'));
    }
    return (
        <Page title="Products" className="flex p-4 gap-4 mt-24 w-full">
            {/* filter  */}
            <div className='hidden md:flex'>
                <ProductFilter mobile={isMobile} categories={categories} memories={SUPPORT_MEMORY_SIZE} />
            </div>
            {/* product contents */}
            <div className='flex flex-col w-full'>
                {/* filter, sort, layout */}
                <div className={`flex justify-between items-center gap-2 p-2 border ${themeMode === 'light' ? 'border-stone-300' : 'border-gray-800'} w-full rounded-lg`}>
                    <button className='btn btn-active btn-sm px-6 md:hidden' onClick={()=>(setShowFilter(true))}>Filter</button>

                    <select className='select select-bordered select-sm'>
                        <option value={""}>{t('sort.default-setting')}</option>
                        <option value={"popular"}>{t('sort.popular')}</option>
                        <option value={"latest"}>{t('sort.latest')}</option>
                        <option value={"asc"}>{t('sort.asc')}</option>
                        <option value={"desc"}>{t('sort.desc')}</option>
                    </select>
                    <div className='hidden sm:flex '>
                        <button className={`btn btn-ghost rounded-r-none btn-sm ${viewMode==='grid'?'btn-active':''}`}  onClick={handleViwMode} >
                            <Icon icon="bi:grid" width={20} ></Icon>
                        </button>
                        <button className={`btn btn-ghost rounded-l-none btn-sm ${viewMode!=='grid'?'btn-active':''}`} onClick={handleViwMode}>
                            <Icon icon="bi:grid-1x2" width={20}></Icon>
                        </button>
                    </div>
                </div>
            </div>
            {showFilter && 
            <Drawer 
                open  = {showFilter}
                onClose = {()=>setShowFilter(false)}
                className='min-w-[320px]'
                children={<ProductFilter  mobile={isMobile} categories={categories} memories={SUPPORT_MEMORY_SIZE} />}
            >

            </Drawer>
            }
        </Page>
    )
}
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import { SUPPORT_MEMORY_SIZE } from '../../config';
import ProductFilter from '../../sections/products/ProductFilter';
import useResponsive from '../../hook/useResponsive';
import Drawer from '../../components/Drawer';
import { ALL_PRODUCTS } from '../_mocks/Product';
import ProductItem from '../../components/ProductItem';

// product model {
//     _id,
//     modelId,    
//     title,
//     description,
//     rating,
//     usdLow,
//     usdHigh,
//     color,
//     tags,
//     stockAmount,   
//     image,
//     images,
// }

export default function Shopping() {
    const { isMobile } = useResponsive();
    const [products, setProducts] = useState({
        all: [],
        filtered: [],
    });
    const { t } = useTranslation();
    const { themeMode } = useSelector((state) => state.setting);
    const borderColor = ((themeMode === 'light') ? 'border-stone-300' : 'border-gray-800');

    const { categories } = useSelector((state) => state.shopping);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilter, setShowFilter] = useState(false);

    const handleViwMode = () => {
        setViewMode((viewMode === 'grid' ? 'list' : 'grid'));
    }

    useEffect(() => {
        setProducts({
            all: ALL_PRODUCTS,
            filtered: ALL_PRODUCTS,
        })
    }, []);

    return (
        <Page title="Products" className="flex p-4 gap-4 mt-24 w-full">
            {/* filter  */}
            <div className='hidden md:flex md:flex-col '>
                
                    <ProductFilter mobile={isMobile} categories={categories} memories={SUPPORT_MEMORY_SIZE} />
                    

            </div>
            {/* product contents */}
            <div className='flex flex-col w-full static h-full'>
                {/* filter, sort, layout */}
                <div className={`flex justify-between items-center gap-2 p-2 border ${borderColor} bg-base-200 w-full rounded-lg  `}>
                    <button className='btn btn-active btn-sm px-6 md:hidden' onClick={() => (setShowFilter(true))}>Filter</button>

                    <select className='select select-bordered select-sm'>
                        <option value={""}>{t('sort.default-setting')}</option>
                        <option value={"popular"}>{t('sort.popular')}</option>
                        <option value={"latest"}>{t('sort.latest')}</option>
                        <option value={"asc"}>{t('sort.asc')}</option>
                        <option value={"desc"}>{t('sort.desc')}</option>
                    </select>
                    <div className='hidden sm:flex '>
                        <button className={`btn btn-ghost rounded-r-none btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`} onClick={handleViwMode} >
                            <Icon icon="bi:grid" width={20} ></Icon>
                        </button>
                        <button className={`btn btn-ghost rounded-l-none btn-sm ${viewMode !== 'grid' ? 'btn-active' : ''}`} onClick={handleViwMode}>
                            <Icon icon="bi:grid-1x2" width={20}></Icon>
                        </button>
                    </div>
                </div>
                {/* product list */}
                <div className={`py-2 grid gap-2 md:gap-4 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 ' : ''}`}>
                    {products.filtered.map((item, index) => (
                        <ProductItem
                            product={item}
                            currency='$'
                            currencyRate={1}
                            key={index}
                            index = {index}
                            layout={viewMode}
                            borderColor={borderColor}
                        />
                    ))}
                </div>
            </div>
            {showFilter &&
                <Drawer
                    open={showFilter}
                    onClose={() => setShowFilter(false)}
                    className='min-w-[320px]'
                    children={<ProductFilter mobile={isMobile} categories={categories} memories={SUPPORT_MEMORY_SIZE} />}
                >

                </Drawer>
            }
        </Page>
    )
}
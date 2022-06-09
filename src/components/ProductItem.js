
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { Icon } from '@iconify/react';
import { ASSETS_URL } from '../utils/API';
import { fOffCostPercent, strPrice } from '../utils/uFormatter';
import Rating from './Ratings';
import TextMaxLine from './TextMaxLine';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

ProductItem.PropType = {
    product: PropTypes.object,
    layout: PropTypes.string,
    currency: PropTypes.string,
    currencyRate: PropTypes.number,
    borderColor: PropTypes.string,
}

// product model {
//     _id,
//     modelId,    
//     title,
//     description,
//     rating,
//     usdLow,
//     usdHigh,
//     color,
//     price,
//     currency,
//     tags,
//     stockAmount,   
//     image,
//     images,
// }

export default function ProductItem({ borderColor = 'border-gray-300', product, layout = 'grid', currency = '$', currencyRate = 1, index = 1 }) {

    const navigate = useNavigate();

    const handleClick = ()=>{
        // navigate(`/product-detail/${product._id}`);
        navigate(`/product-detail/123456`);
    }
    return (
        <>
            <div className={`border ${borderColor} rounded-lg w-full hover:border-accent flex   ${layout === 'grid' ? 'flex-col max-w-sm' : 'flex-col sm:flex-row'}  p-2 relative cursor-pointer `} onClick = {handleClick}>
                <div className={`flex gap-2 justify-center`}>

                    {/* <Image src = {`${ASSETS_URL.products}${product.image}`} ></Image> */}
                    <LazyLoadImage alt={`lazy-image`}
                        effect={`blur`} 
                        src={`${product.image}`} 
                        wrapperClassName={`${layout === 'list' ? 'w-[150px] lg:w-[250px]' : 'w-[300px]'}  ${product.stockAmount <= 0 ? 'opacity-40' : ''}`}
                        placeholder={<div className={`animate-pulse bg-base-300 ${layout === 'list' ? 'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]' : 'w-[300px] h-[300px]'} h-32`} ></div>}
                    >

                        </LazyLoadImage>
                    {
                        (product.usdLow > 0 && product.usdLow < product.usdHigh) &&
                        <label className='badge text-white badge-error absolute top-4 left-4 '>
                            {fOffCostPercent(product.usdHigh, product.usdLow)}
                        </label>
                    }
                    {
                        (product.stockAmount <= 0) &&
                        <label className={`badge text-white  absolute  ${layout === 'grid' ? 'top-1/2 left-1/3' : 'top-[75px] lg:top-[125px] left-4 '} `}>
                            {t('shopping.out-stock')}
                        </label>
                    }
                </div>
                <div className={`flex flex-col justify-center p-2 ${layout === 'grid' ? 'p-2' : 'p-4'}`}>
                    <TextMaxLine maxLine={1} text={product.title} className='font-bold'></TextMaxLine>
                    {(layout === 'list') && <TextMaxLine text={product.description} className='hidden md:block md:mt-2' />
                    }
                    <div className='mt-1'>
                        <Rating value={product.rating} readOnly={true} name={`product-rating-${index}`} />
                    </div>
                    <div className='flex gap-2 items-center'>
                        {(product.usdLow > 0 && product.usdLow < product.usdHigh) &&
                            <label className='line-through '>{strPrice(product.usdHigh * currencyRate, currency)}</label>
                        }
                        <label className='text-accent font-bold text-lg'>{strPrice(product.usdLow * currencyRate, currency)}</label>
                    </div>
                    {(layout === 'list') && <div className='flex mt-2 gap-2'>
                        <button className='btn btn-accent text-white' ><Icon icon='carbon:shopping-cart-arrow-down' width={20}></Icon>{t('shopping.add-cart')}</button>
                        <button className='btn btn-ghost rounded-full h-12 w-12 px-0'><Icon icon='akar-icons:heart' width={20}></Icon></button>
                        <button className='btn btn-ghost rounded-full h-12 w-12 px-0'><Icon icon='akar-icons:eye' width={20}></Icon></button>

                    </div>}
                </div>
            </div>


        </>
    )
}
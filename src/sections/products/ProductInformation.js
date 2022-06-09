import { Icon } from '@iconify/react';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import AmountInput from '../../components/AmountInput';
import Rating from '../../components/Ratings';
import { ProductInformationSkeleton } from '../../components/skeleton/ProductDetailSkeleton';
import TextMaxLine from '../../components/TextMaxLine';
import { strNumber } from '../../utils/uFormatter';

ProductInformation.PropType = {
    product: PropTypes.object,
    fetching: PropTypes.bool,
}

export default function ProductInformation({ product, fetching }) {
    return (
        <>
            {
                fetching &&
                <ProductInformationSkeleton />
            }
            {
                !fetching &&
                <div className="flex flex-col px-2 justify-center">
                    <label className="text-2xl font-bold mb-4">{product?.title}</label>
                    <label className="mb-4">
                        <span className="text-stone-400 font-bold">{t('words.category')}: </span>
                        {product?.category?.value} |
                        <span className="text-stone-400 font-bold ml-2">{t('words.sku')}: </span>
                        {product?.sku?.value}
                    </label>
                    <div className="flex w-full mb-4 gap-2">
                        <Rating name="product-detail-rating" value={product?.rating} readOnly={true} />
                        {product?.reviews?.length > 0 &&
                            <label className="text-stone-400 ">({strNumber(product?.reviews?.length)} {t('words.reviews')})</label>
                        }
                    </div>
                    <TextMaxLine maxLine={5} text={product?.description} className='mb-4' />

                    {product?.memory?.size > 0 &&
                        <label className="mb-4">
                            <span className="text-stone-400">{t('words.memory')}: </span>
                            {product?.memory?.size}
                            {product?.memory?.unit}
                        </label>
                    }
                    <div className="divider"></div>
                    {/* tags */}
                    <div className="flex gap-2 items-center w-full mb-8">
                        <Icon icon="bi:tag" width={20}></Icon>{t('words.tags')}:
                        {product?.tags?.map((tag, index) => (
                            <label className="" key={index}>{tag},</label>
                        ))}
                    </div>

                    {/* cart button */}
                    <div className="grid gap-2 grid-cols-2 items-center justify-center mb-4">
                        <AmountInput />
                        <div className="flex gap-1">
                            <button className='btn btn-accent text-white btn-sm md:btn-md' ><Icon icon='carbon:shopping-cart-arrow-down' width={16}></Icon><span className="hidden md:flex">{t('shopping.add-cart')}</span></button>
                            <button className='btn btn-sm btn-ghost  rounded-full h-8 w-8 px-0  md:btn-md md:h-12 md:w-12 md:p-0'><Icon icon='akar-icons:heart' width={20}></Icon></button>
                            <button className='btn btn-sm btn-ghost rounded-full h-8 w-8 px-0  md:btn-md md:h-12 md:w-12 md:p-0'><Icon icon='bx:refresh' width={20}></Icon></button>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import AmountInput from "../../components/AmountInput";

import Page from "../../components/Page";
import ProductCarousel from "../../components/ProductCarousel";
import Rating from "../../components/Ratings";
import TextMaxLine from "../../components/TextMaxLine";
import { strNumber } from "../../utils/uFormatter";
import { ALL_PRODUCTS } from "../_mocks/Product";

export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState();

    const { themeMode } = useSelector((state) => state.setting);
    const borderColor = ((themeMode === 'light') ? 'border-stone-300' : 'border-gray-800');

    useEffect(() => {

        setProduct(
            ALL_PRODUCTS[0]
        )
    }, [productId])
    return (

        <Page title={`${product?.title || productId}`} className='flex flex-col gap-2 mt-24 w-full'>
            {/* breadcrumbs */}
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 ">
                <ul>
                    <li>
                        <Link to="/" >{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to="/shopping">{t('words.shopping')}</Link>
                    </li>
                </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mt-12 p-2">
                {/* carousel */}
                <ProductCarousel product={product} />
                {/* product information */}
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
                        <AmountInput size = {'sm'} />
                        <div className="flex gap-1">
                            <button className='btn btn-accent text-white btn-sm md:btn-md' ><Icon icon='carbon:shopping-cart-arrow-down' width={16}></Icon><span className="hidden md:flex">{t('shopping.add-cart')}</span></button>
                            <button className='btn btn-sm btn-ghost  rounded-full h-8 w-8 px-0  md:btn-md md:h-12 md:w-12 md:p-0'><Icon icon='akar-icons:heart' width={20}></Icon></button>
                            <button className='btn btn-sm btn-ghost rounded-full h-8 w-8 px-0  md:btn-md md:h-12 md:w-12 md:p-0'><Icon icon='bx:refresh' width={20}></Icon></button>
                        </div>
                    </div>

                </div>
            </div>

        </Page>
    )
}
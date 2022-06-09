
import { t } from "i18next";
import { useEffect, useState } from "react";

import { Link, useParams } from 'react-router-dom';


import Page from "../../components/Page";
import ProductCarousel from "../../components/ProductCarousel";

import { CarouselSkeleton } from "../../components/skeleton/ProductDetailSkeleton";
import { ProductAddition, ProductNote, ProductReviews } from "../../sections/products/ProductDetailing";

import ProductInformation from "../../sections/products/ProductInformation";

import { ALL_PRODUCTS } from "../_mocks/Product";


export default function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState({
        fetching: false,
        saving: false,
    })
    const [currentTab, setCurrentTab] = useState(1);

    useEffect(() => {
        setLoading({ ...loading, fetching: true });
        setTimeout(() => {
            setLoading({ ...loading, fetching: false });
            setProduct(
                ALL_PRODUCTS[0]
            )
        }, 1000);

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
                {
                    loading.fetching &&
                    <CarouselSkeleton />
                }
                {
                    !loading.fetching &&
                    <ProductCarousel product={product} />
                }

                {/* product information */}
                <ProductInformation fetching={loading.fetching} product={product} />

            </div>
            {/* tab  */}
            <div className="grid gap-2 p-2">
                <div className="tabs flex w-full mb-2">
                    <label className={`tab tab-bordered ${currentTab === 1 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(1)}>{t('product.note')}</label>
                    <label className={`tab tab-bordered ${currentTab === 2 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(2)}>{t('product.addition')}</label>
                    <label className={`tab tab-bordered ${currentTab === 3 ? 'tab-active' : ''}`} onClick={() => setCurrentTab(3)}>{t('words.reviews')}</label>
                    <label className="tab tab-bordered flex-1">&nbsp;</label>
                </div>
                {currentTab === 1 &&
                    <ProductNote product={product} />
                }
                {currentTab === 2 &&
                    <ProductAddition product={product} />
                }
                {currentTab === 3 &&
                    <ProductReviews product={product} />
                }
            </div>
        </Page>
    )
}
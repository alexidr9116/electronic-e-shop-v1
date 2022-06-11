
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

import Page from "../../components/Page";
import useCurrencyRate from "../../hook/useCurrencyRate";
import BillingAddress from "../../sections/basket/BillingAddress";
import PaymentOptions from "../../sections/basket/PaymentOptions";

import ProductCarts from "../../sections/basket/ProductCarts";
import { clearBasketFromStore, pushToBasketToStore, removeFromBasketFromStore } from "../../store/action/basketAction";
import { API_CLIENT, SEND_POST_REQUEST } from "../../utils/API";

export default function ShoppingBasket() {
    const { currency, time } = useCurrencyRate();

    const { carts } = useSelector((state) => state.basket);
    const [baskets, setBaskets] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [billingAddress, setBillingAddress] = useState({});
    const [orderInfo, setOrderInfo] = useState({});

    const handleChangeAmount = (amount, product) => {
        product.basketAmount = amount;
        pushToBasketToStore({ id: product.id, amount });

    }
    const handleRemoveAll = async () => {
        setBaskets([]);
        await clearBasketFromStore();

    }

    const handelRemoveOne = async (product) => {
        setBaskets(baskets.filter((p) => p.id !== product.id));
        await removeFromBasketFromStore(product.id);

    }
    useEffect(() => {
        const ids = [];

        for (const cart of carts)
            ids.push(cart.id);
        if (ids.length > 0) {
            setLoading(true);
            SEND_POST_REQUEST(API_CLIENT.product.getProductsByIds, { ids }).then(res => {
                setLoading(false);
                if (res.status === 200 && res.data) {
                    const _baskets = [];
                    for (const product of res.data) {

                        product.basketAmount = Math.min((carts.filter(c => c.id === product.id)[0].amount), Math.max(0, product.stockAmount));
                        _baskets.push(product);

                    }
                    setBaskets(_baskets);
                }
            }).catch(err => {
                setLoading(false);
            })
        }

    }, []);

    useEffect(() => {

        for (const product of baskets) {
            product.basketAmount = Math.min((carts.filter(c => c.id === product.id)[0].amount), Math.max(0, product.stockAmount));
        }

    }, [carts]);

    useEffect(() => {
        const _orderInfo = {
            price: (baskets.reduce((a, b) => (a + b.usdLow * time * b.basketAmount), 0)),
            currency,
            shippingPrice: 0,
            total: 0,
        }
        _orderInfo.total = _orderInfo.price;
        setOrderInfo(_orderInfo);

    }, [baskets, currency,time])

    return (
        <Page title="Checkout" className="flex flex-col w-full gap-2 sm:gap-4 ">
            <div className="breadcrumbs  bg-base-300 absolute w-full left-0 px-6 overflow-x-hidden mt-24">
                <ul>
                    <li>
                        <Link to='/'>{t('words.home')}</Link>
                    </li>
                    <li>
                        <Link to='/shopping'>{t('words.shopping')}</Link>
                    </li>
                    <li>
                        <label >{t('shopping.basket')}</label>
                    </li>
                </ul>
            </div>
            <div className="mt-40 w-full"></div>
            <div className="w-full flex justify-center">
                <ul className="steps sm:w-1/2">
                    <li className={`step ${currentStep >= 1 ? 'step-info' : ''}`} data-content={`${currentStep === 1 ? "✕" : "✓"}`}>Cart</li>
                    <li className={`step ${currentStep >= 2 ? 'step-info' : ''}`} data-content={`${currentStep <= 2 ? "✕" : "✓"}`}>Billing & Address</li>
                    <li className={`step ${currentStep >= 3 ? 'step-info' : ''}`} data-content={`${currentStep <= 3 ? "✕" : "✓"}`}>Payment</li>
                </ul>

            </div>


            {currentStep === 1 &&
                <ProductCarts
                    baskets={baskets}
                    carts={carts}
                    handleChangeAmount={handleChangeAmount}
                    loading={loading}
                    t={t}
                    removeAllFromBasket={handleRemoveAll}
                    removeFromBasket={handelRemoveOne}
                />
            }
            {currentStep === 2 &&
                <div className="w-full flex justify-center"><BillingAddress onSelected={(address) => {setBillingAddress(address); setCurrentStep(currentStep+1); }} /></div>

            }
            {currentStep === 3 &&
                <div className="w-full flex justify-center py-4"><PaymentOptions billingAddress={billingAddress} orderInfo={orderInfo} /></div>
            }
            <div className="w-full flex justify-center mb-10 gap-8">
                {currentStep > 1 &&
                    <Link onClick={() => (setCurrentStep(currentStep - 1))} to={'#'} className="hover:text-accent flex items-center"><Icon width={20} icon='eva:arrow-ios-back-outline'></Icon>&nbsp;{t('words.prev')}</Link>
                }
                <Link to={'/shopping'} className="hover:text-accent flex items-center"><Icon icon='arcticons:amazon-shopping' width={20}></Icon>&nbsp;{t('shopping.continue-shopping')}</Link>
                {carts?.length > 0 && currentStep === 1 && 
                    <Link onClick={() => (setCurrentStep(currentStep + 1))} to={'#'} className="hover:text-accent flex items-center">{t('words.next')}&nbsp;<Icon width={20} icon='ic:baseline-navigate-next'></Icon></Link>
                }
            </div>
        </Page>
    )
}
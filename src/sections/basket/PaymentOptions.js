import { t } from "i18next";
import PropTypes from 'prop-types';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { strPrice } from "../../utils/uFormatter";
import useAuth from '../../hook/useAuth';
PaymentOptions.propTypes = {
    billingAddress: PropTypes.object,
    orderInfo: PropTypes.object,
}

const DELIVERY_OPTIONS = [
    { key: 'Free', title: 'shopping.standard-delivery', desc: 'shopping.standard-delivery-desc' },
    { key: 'Fast', title: 'shopping.fast-delivery', desc: 'shopping.fast-delivery-desc' },
]
const PAYMENT_OPTIONS = [
    { key: 'Crypto', title: 'shopping.crypto', desc: 'shopping.crypto-desc' },
    { key: 'PayPal', title: 'shopping.paypal', desc: 'shopping.paypal-desc' },
    { key: 'QPay', title: 'shopping.qpay', desc: 'shopping.qpay-desc' },

]
export default function PaymentOptions({ billingAddress, orderInfo }) {
    const {user} = useAuth();
    const [deliveryOption, setDeliveryOption] = useState('Free');
    const [paymentOption, setPaymentOption] = useState('Crypto');
    const navigate = useNavigate();
    const onCompleteOrder = ()=>{
        if(!user.emailVerified){
            navigate('/auth/verify-email',{replace:true});
        }
    }
    return (
        <div className="flex w-full flex-col sm:flex-row max-w-4xl gap-2 justify-between p-4">
            <div className="flex flex-col gap-8 flex-1">
                {/* Delivery Option */}
                <label className="font-bold">{t('shopping.delivery-option')}</label>
                <div className="flex gap-2 w-full flex-col sm:flex-row justify-between mb-8">
                    {DELIVERY_OPTIONS.map((option, index) => (
                        <div onClick={() => (setDeliveryOption(option.key))} key={index} className={` bg-base-200 rounded-lg flex gap-4 p-4 items-center sm:w-1/2 cursor-pointer`}>
                            <input onChange={() => { }} checked={option.key === deliveryOption}
                                value={option.key} type="radio" className="radio radio-accent" name="delivery-option"></input>
                            <div className="flex-col flex ">
                                <label className="font-bold">
                                    {t(option.title)}
                                </label>
                                <label className="text-sm">
                                    {t(option.desc)}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Payment Method Option */}
                <label className="font-bold">{t('shopping.payment-option')}</label>
                <div className="flex gap-2 w-full flex-col mb-4">
                    {PAYMENT_OPTIONS.map((option, index) => (
                        <div onClick={() => (setPaymentOption(option.key))} key={index} className={`bg-base-200 rounded-lg flex gap-4 p-4 items-center cursor-pointer`}>
                            <input value={option.key} checked={option.key === paymentOption} onChange={() => { }} type="radio" className="radio radio-accent" name="payment-option"></input>
                            <div className="flex-col flex">
                                <label className="font-bold">
                                    {t(option.title)}
                                </label>
                                <label className="text-sm">
                                    {t(option.desc)}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-72 pl-2">
                {/* billing info */}
                <label className="text-lg font-bold mb-4">{t('shopping.billing-address')}</label>
                <label className="">{billingAddress?.fullName}({billingAddress?.type})</label>
                <label className="">{billingAddress?.address}({billingAddress?.country})</label>
                <label className="">{billingAddress?.mobile}</label>
               
                <div className="w-full border-b border-base-300 h-4 mb-12"></div>
                 {/* order summary */}
                <label className="text-lg font-bold mb-4">{t('shopping.order-summary')}</label>
                <div className="flex flex-col w-full gap-2 border-b border-base-300 pb-4">
                    <div className="flex justify-between">
                        <label className="">{t('shopping.sub-total')}</label>
                        <label className="">{strPrice(orderInfo.total, orderInfo.currency)}</label>
                    </div>
                    <div className="flex justify-between">
                        <label className="">{t('shopping.shipping')}</label>
                        <label className="">{deliveryOption}</label>
                    </div>
                    <div className="flex justify-between">
                        <label className="">{t('shopping.payment-option')}</label>
                        <label className="">{paymentOption}</label>
                    </div>
                </div>
                <div className="flex justify-between mb-4">
                    <label className="">{t('shopping.total')}</label>
                    <div className="flex flex-col gap-2">
                        <label className="text-right">{strPrice(orderInfo.total, orderInfo.currency)}</label>
                        {deliveryOption.toLocaleLowerCase() !== "free" &&
                            <label className="italic text-xs">
                                need money for shipping
                            </label>
                        }
                    </div>

                </div>
                <div className="flex w-full justify-center py-4">
                    <button onClick = {onCompleteOrder} className="btn btn-accent text-white">{t('shopping.complete-order')}</button>
                </div>
            </div>
        </div>
    )
}
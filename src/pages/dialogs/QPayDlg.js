import { PayPalButton } from "react-paypal-button-v2";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import Modal from "../../components/Modal";
import useCurrencyRate from "../../hook/useCurrencyRate";
import { t } from "i18next";
import { fShortDate, strNumber } from "../../utils/uFormatter";
import { API_PAYMENT, SEND_PUT_REQUEST } from "../../utils/API";
import { clearBasketFromStore } from "../../store/action/basketAction";
import { LazyLoadImage } from "react-lazy-load-image-component";

QPayDlg.propTypes = {
    onSuccess: PropTypes.func,
    bankList: PropTypes.array,
}
export default function QPayDlg({ onSuccess, bankList }) {
    return (
        <Modal title={'Pay With QPay'} onCancel={onSuccess} >
            <div className="flex flex-col gap-4 ">
                <div className="w-[340px] sm:w-[400px]">
                {bankList.map((item, index) =>
                    <div className={`flex gap-5 items-center mb-3 border-b cursor-pointer}`}
                        key={index}
                    // onClick={() => { item.enable && handleCheck(item) }}
                    >
                        <div>
                            <LazyLoadImage src={item.logo}
                                alt = 'logo-image' wrapperClassName="w-12 h-12"
                            />
                        </div>
                        <a className="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap" href={item.link}>

                            <label>{item.name}</label><br />
                            <label className="text-sm">{item.description}</label>
                        </a>
                    </div>
                )}
                </div>
                
                <div className="w-full flex justify-center">
                    <button className={`btn btn-ghost btn-sm h-8 `} onClick={onSuccess}>Close</button>
                </div>
            </div>
        </Modal>
    )
}
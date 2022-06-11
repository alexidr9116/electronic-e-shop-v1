import { t } from "i18next"
import PropTypes from 'prop-types';
const BILLING_ADDRESS = [
    {
        type: "Home",
        fullName: "Webmaster Daniel",
        mobile: "990-588-5716",
        address: "36901 Elmer Spurs Apt",
        city: "Miramar",
        state: "",
        postal: "WV/50337",
        country: "China",
        default: false
    },
    {
        type: "Office",
        fullName: "Kar James",
        mobile: "990-588-5716",
        address: "36901 Elmer Spurs Apt",
        city: "New York",
        state: "",
        postal: "MC/50337",
        country: "United State",
        default: true
    },
    {
        type: "Office",
        fullName: "Webmaster Daniel",
        mobile: "120-588-5716",
        address: "36901 Elmer Spurs Apt",
        city: "Kostroma",
        state: "Kostromskaya oblast",
        postal: "WV/11123",
        country: "Russia",
        default: false
    }
]
BillingAddress.propTypes = {
    onSelected:PropTypes.func,
}
export default function BillingAddress({onSelected}) {
    return (
        <div className="flex flex-col max-w-xl w-full p-4 gap-4">
            {BILLING_ADDRESS.map((address, index) => (
                <div key = {index} className="flex flex-col gap-4 border-b border-base-300 pb-4">
                    <label className="text-lg text-bold">{address.fullName}
                        <span className="text-sm text-accent">({address.type})</span>
                        {address.default &&
                            <span className="badge badge-sm badge-accent text-white ml-4">Default</span>
                        }
                    </label>
                    <label >{address.address}&nbsp;{address.city}&nbsp;{address.postal}

                    </label>
                    <div className="flex justify-between w-full flex-col sm:flex-row">
                        <label className="mb-4">{address.mobile}</label>
                        <div className="flex gap-2">
                            {!address.default &&
                                <button className="btn btn-sm btn-outline btn-ghost">{t('words.delete')}</button>
                            }
                            <button onClick={()=>(onSelected(address))} className="btn btn-sm btn-outline btn-accent">{t('shopping.delivery-address')}</button>

                        </div>
                    </div>

                </div>

            ))
            }
        </div>
    )
}
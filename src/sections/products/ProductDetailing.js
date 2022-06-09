import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Rating from '../../components/Ratings';
import { strNumber, strPercent } from '../../utils/uFormatter';
import { t } from "i18next";

export function ProductReviews({ product }) {
    return (
        <div className="flex flex-col gap-4">
            {/* rating */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <Rating readOnly={true} name="product-rating" value={product?.rating}></Rating>
                <div className="hidden md:divider md:divider-horizontal"></div>
                <div className="flex flex-col gap-2 items-center justify-center mb-4">
                    {[5, 4, 3, 2, 1].map((value, index) => (
                        <div className="flex gap-2 items-center" key={index}>
                            <Rating readOnly={true} name={`star-rating-${value}`} value={value}></Rating>
                            <progress className="progress progress-accent w-32 h-4 rounded-none"
                                value={product?.reviews?.filter((review) => (Math.round(review?.rating) === value)).length}
                            />
                            <label className="text-accent">
                                {strPercent(product?.reviews?.filter((review) => (Math.round(review?.rating) === value)).length, product?.reviews.length)}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="hidden md:divider md:divider-horizontal"></div>
                <button className="btn btn-outline btn-xl btn-accent">{t('words.write-review')}</button>
            </div>
            {/* reviews */}
            <div className="grid md:grid-cols-2 gap-2">
                {/* list */}
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-bold border-b border-0 border-base-300 mb-4">
                        {product?.reviews?.length}{t('words.reviews')}
                    </label>
                    {/* review details */}
                    <div className="flex flex-col gap-2  mb-2">
                        <div className="flex gap-2">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                    <span>MX</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <span>Writer</span>
                                        <span className="text-stone-400">Report Time</span>
                                    </div>
                                    <Rating value={3} readOnly={true} name="customer-review"></Rating>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full px-4">
                            <p className="bg-base-200 rounded-lg w-full p-4">
                                {product.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  mb-2">
                        <div className="flex gap-2">
                            <div className="avatar placeholder">
                                <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
                                    <span>MX</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <span>Writer</span>
                                        <span className="text-stone-400">Report Time</span>
                                    </div>
                                    <Rating value={3} readOnly={true} name="customer-review"></Rating>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full px-4">
                            <p className="bg-base-200 rounded-lg w-full p-4">
                                {product.description}
                            </p>
                        </div>
                    </div>
                </div>
                {/* write */}
                <div className="flex flex-col p-6 gap-4 bg-base-200 rounded-2xl">
                    <label className="text-lg font-bold">{t('reviews.add-review')}</label>
                    <label className="">{t('reviews.add-review-validation-description')}
                    </label>
                    <label className="text-lg font-bold">{t('reviews.your-rating')}</label>
                    <Rating value={0} name="your-review" ></Rating>
                    <label className="text-lg font-bold">{t('reviews.customer-review')}</label>
                    <textarea className="textarea textarea-bordered " rows={10}></textarea>
                    <button className="btn btn-accent">{t('reviews.add-review')}</button>
                </div>
            </div>
        </div>
    )
}

export function ProductAddition({ product }) {

    return (
        <div className="flex w-full overflow-x-hidden">
            <table className="table border border-base-300 table-compact">
                <tbody>
                    {product?.technical?.map((category, index) => (
                        <React.Fragment key={index}>
                            <tr className="hidden sm:table-row">
                                <td className="bg-base-200">{category.key}</td>
                                <td>{category.value}</td>
                            </tr>
                            <tr className="sm:hidden">
                                <td className="bg-base-200 text-accent">
                                    {category.key}
                                </td>
                            </tr>
                            <tr className="sm:hidden">
                                <td>
                                    {category.value}
                                </td>
                            </tr>

                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div >
    )
}


export function ProductNote({ product }) {
    return (
        <div className="flex flex-col gap-2">
            {
                product?.note?.map((note, index) => (
                    <React.Fragment key={index}>
                        {(note?.type === 'html') &&

                            <div className="flex flex-col gap-2" >
                                <label className="font-bold ">{note.key}</label>
                                <p>
                                    {note.value}
                                </p>
                            </div>
                        }
                        {
                            (note?.type === 'image') &&
                            <div className="flex w-full h-full p-2">
                                <LazyLoadImage
                                    src={`${note.value}`}
                                    wrapperClassName="h-full w-full"
                                    alt={`${product.title}`}
                                    effect="blur"
                                >
                                </LazyLoadImage>
                            </div>
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
}
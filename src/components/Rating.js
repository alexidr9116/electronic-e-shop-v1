export default function Rating() {
    return (
        <div className="rating rating-half">
            <input type="radio" name="rating-1" className={`rating-hidden`} />
            {
                [1, 2, 1, 2, 1, 2, 1, 2, 1, 2].map((value, index) => (
                    <input type="radio" key={index} name="rating-1" className={`mask mask-star-2 mask-half-${value} bg-warning`} />

                ))
            }
        </div>
    )
}
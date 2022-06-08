import PropTypes from 'prop-types';
import { useState } from 'react';

Rating.PropType = {
    value: PropTypes.number,
    readOnly: PropTypes.bool,
}
export default function Rating({ value = 4, readOnly = false, name = 'rating-' }) {
    
    const [val, setVal] = useState(parseFloat(value).toFixed(1));
    
    const handleChange = (e, index) => {
        
        if (!readOnly) {
            setVal(parseFloat(index/2).toFixed(1));
        }
    }
    
    return (<div className="rating rating-half">
        {!readOnly && <input type="radio" name={`${name}`} className="rating-hidden" />}
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (1))} checked={(val>0 && val<=0.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (2))} checked={(val>0.5 && val<=1)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (3))} checked={(val>1 && val<=1.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (4))} checked={(val>1.5 && val<=2)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (5))} checked={(val>2 && val<=2.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (6))} checked={(val>2.5 && val<=3)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (7))} checked={(val>3 && val<=3.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (8))} checked={(val>3.5 && val<=4)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-1" onChange={(e) => handleChange(e, (9))} checked={(val>4 && val<=4.5)} />
        <input type="radio" name={`${name}`} className="bg-warning mask mask-star-2 mask-half-2" onChange={(e) => handleChange(e, (10))} checked={(val>4.5)} />{val}
    </div>)
}
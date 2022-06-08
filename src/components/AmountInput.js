import PropTypes from 'prop-types';
import { useState } from 'react';

AmountInput.PropType = {
    minValue:PropTypes.number,
    maxValue:PropTypes.number,
    size:PropTypes.string,
}

export default function AmountInput({minValue = 0, maxValue = 100, size = "md"}){
    const [value,setValue] = useState(0);
    const decrease = ()=>{
        setValue(Math.max(0, value-1));
    }
    const increase = ()=>{
        setValue(Math.max(0, value+1));
    }
    const handleValue = (e)=>{
        const v = parseInt(e.target.value);
        if(v >= minValue && v<=maxValue){
            setValue(v);
        }
    }
    return (
        <div className={`input-group  ` }>
            <button className={`btn btn-accent btn-square btn-${size}`} onClick={decrease}>-</button>
            <input className={`input input-bordered w-20 text-right input-${size}`} value={value} onChange={handleValue}></input>
            <button className={`btn btn-accent btn-square btn-${size}`} onClick={increase}>+</button>
        </div>
    )
}
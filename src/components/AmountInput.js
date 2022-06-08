import PropTypes from 'prop-types';
import { useState } from 'react';

AmountInput.PropType = {
    minValue:PropTypes.number,
    maxValue:PropTypes.number,
    
}

export default function AmountInput({minValue = 0, maxValue = 100}){
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
            <button className={`btn btn-accent btn-square btn-sm md:btn-md`} onClick={decrease}>-</button>
            <input className={`input input-bordered w-20 text-right input-sm md:input-md`} value={value} onChange={handleValue}></input>
            <button className={`btn btn-accent btn-square  btn-sm md:btn-md`} onClick={increase}>+</button>
        </div>
    )
}
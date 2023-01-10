import React from 'react';

export default function CurrencyInput({ value, handler, paste }) {

    function prohibitInput(e) {
        (e.key === 'e' || e.key === '+' || e.key === '-') && e.preventDefault();
    }
    
    return (
        <input 
            type='number'
            value={value}
            min='0'
            step='0.01'
            onPaste={e => paste(e, handler)}
            onKeyDown={prohibitInput}
            onChange={handler}
        />
    );
}
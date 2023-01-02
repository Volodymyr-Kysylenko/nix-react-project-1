import React from 'react';

export default function CurrencyInput({ value, handler }) {

    function prohibitInput(e) {
        (e.key === 'e' || e.key === '+' || e.key === '-') && e.preventDefault();
    }
    
    return (
        <input 
            type='number'
            value={value}
            min='0'
            onKeyDown={prohibitInput}
            onChange={handler} 
        />
    );
}
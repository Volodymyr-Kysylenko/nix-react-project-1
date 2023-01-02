import React from 'react';

export default function FrequentValues({ value, toCurrency, fromCurrency, setQuickValue, exchangeRate }) {
    return (
        <div key={value}>
            <button
                className='quick-value'
                onClick={() => setQuickValue(value)}>
                {value} {toCurrency}
            </button>
            <div>
                <img src='/images/icons/up.svg' alt='' />
            </div>
            <div>
                {(value * exchangeRate[toCurrency][fromCurrency]).toFixed(2)} {fromCurrency}
            </div>
        </div>
    );
}
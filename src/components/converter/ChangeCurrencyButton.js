import React from 'react';

export default function ChangeCurrencyButton({ currency, changeCurrency, exchangeRate }) {
    return (
        <button onClick={() => changeCurrency(currency)}>
            <img src={'/images/flags/' + currency + '.png'} alt={currency} />
            {currency} - {exchangeRate[currency].fullName}
        </button>
    );
}
import { useState } from 'react';

import Header from '../components/Header';
import Chart from '../components/Chart';

import getExchangeRate from '../app/exchangeRate';

export default function CurrencyConverterPage() {
    const exchangeRate = getExchangeRate();
    const frequentValues = [1, 2, 3, 4, 5, 10, 20, 50, 100, 1000];

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UAH');

    const [fromValue, setFromValue] = useState(1);
    const [toValue, setToValue] = useState(exchangeRate.USD.UAH);

    const [fromSelect, setFromSelect] = useState('none');
    const [toSelect, setToSelect] = useState('none');

    function from(e) {
        let value = parseFloat(e.target.value);

        if (e.target.value.split('.')[1] && (String(e.target.value.split('.')[1])).length > 2) return;

        if (isNaN(value)) {
            setToValue(0);
            setFromValue('');
            return;
        }

        setFromValue((value < 0) ? 0 : value);
        setToValue(parseFloat(+((value < 0) ? 0 : value * exchangeRate[fromCurrency][toCurrency]).toFixed(2)));
    }

    function to(e) {
        let value = parseFloat(e.target.value);

        if (e.target.value.split('.')[1] && (String(e.target.value.split('.')[1])).length > 4) return;

        if (isNaN(value)) {
            setFromValue(0);
            setToValue('');
            return;
        }

        setToValue((value < 0) ? 0 : value);
        setFromValue(parseFloat(+((value < 0) ? 0 : value * exchangeRate[toCurrency][fromCurrency]).toFixed(2)));
    }

    function changeCurrency(e, value = fromValue) {
        setToCurrency(fromCurrency);
        setFromCurrency(toCurrency);

        setToValue(parseFloat(+(value * exchangeRate[toCurrency][fromCurrency]).toFixed(2)));

        if (e) e.currentTarget.classList.toggle('rotate');
    }

    function changeFromCurrency(currency) {
        if (currency === fromCurrency) return setFromSelect('none');

        if (currency === toCurrency) {
            setToCurrency(fromCurrency);
            setToValue(parseFloat((fromValue * exchangeRate[currency][fromCurrency]).toFixed(2)));
        } else {
            setToValue(parseFloat((fromValue * exchangeRate[currency][toCurrency]).toFixed(2)));
        }
        setFromCurrency(currency);
        setFromSelect('none');
        setToSelect('none');
    }

    function changeToCurrency(currency) {
        if (currency === toCurrency) return setToSelect('none');

        if (currency === fromCurrency) {
            setFromCurrency(toCurrency);
            setFromValue(parseFloat((toValue * exchangeRate[currency][toCurrency]).toFixed(2)));
        } else {
            setToValue(parseFloat((fromValue * exchangeRate[fromCurrency][currency]).toFixed(2)));
        }

        setToCurrency(currency);
        setFromSelect('none');
        setToSelect('none');
    }

    function hideSelect(e) {
        if (!e.target.classList.contains('converter-control-button')) {
            setFromSelect('none');
            setToSelect('none');
        }
    }

    function setQuickFromValue(value) {
        setFromValue(value);
        setToValue(parseFloat((value * exchangeRate[fromCurrency][toCurrency]).toFixed(2)));

        document.querySelector('.converter').scrollTo(0, 0);
    }

    function setQuickToValue(value) {
        setFromValue(value);
        changeCurrency(null, value);

        document.querySelector('.converter').scrollTo(0, 0);
    }

    return (
        <>
            <Header
                title='Currency Converter'
                bgColor='#5f7aff'
                color='#fff' />
            <div
                style={{ backgroundImage: 'url("/images/converter-background.jpg")' }}
                className='converter'
                onClick={hideSelect}>
                <h1>
                    Currency Converter
                </h1>
                <div className='converter-control-container'>
                    <h2>
                        {exchangeRate[fromCurrency].fullName} to {exchangeRate[toCurrency].fullName}
                    </h2>
                    <div>
                        <div>
                            <h3>
                                From
                            </h3>
                            <div className='converter-control'>
                                <input
                                    type='number'
                                    value={fromValue}
                                    min='0'
                                    data-currency={fromCurrency}
                                    onChange={from} />
                                <button
                                    className='copy-value'
                                    onClick={() => { navigator.clipboard.writeText(fromValue) }}>
                                    <img src='/images/icons/copy.svg' alt='Copy icon' />
                                </button>
                                <button className='converter-control-button' onClick={() => setFromSelect('block')}>
                                    <img src={`/images/flags/${fromCurrency}.png`} alt={fromCurrency} />
                                    {fromCurrency} - {exchangeRate[fromCurrency].fullName}
                                </button>
                                <div style={{ display: fromSelect }} className='control'>
                                    <button onClick={() => changeFromCurrency('USD')}>
                                        <img src='/images/flags/USD.png' alt='USD' />
                                        USD - {exchangeRate.USD.fullName}
                                    </button>
                                    <button onClick={() => changeFromCurrency('EUR')}>
                                        <img src='/images/flags/EUR.png' alt='EUR' />
                                        EUR - {exchangeRate.EUR.fullName}
                                    </button>
                                    <button onClick={() => changeFromCurrency('UAH')}>
                                        <img src='/images/flags/UAH.png' alt='UAH' />
                                        UAH - {exchangeRate.UAH.fullName}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <button className='switch' onClick={changeCurrency}>
                                    <img src='/images/icons/switch.svg' alt='Switch icon' />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h3>
                                To
                            </h3>
                            <div className='converter-control'>
                                <input
                                    type='number'
                                    value={toValue}
                                    min='0'
                                    data-currency={toCurrency}
                                    onChange={to} />
                                <button
                                    className='copy-value'
                                    onClick={() => { navigator.clipboard.writeText(toValue) }}>
                                    <img src='/images/icons/copy.svg' alt='Copy icon' />
                                </button>
                                <button className='converter-control-button' onClick={() => setToSelect('block')}>
                                    <img src={`/images/flags/${toCurrency}.png`} alt={toCurrency} />
                                    {toCurrency} - {exchangeRate[toCurrency].fullName}
                                </button>
                                <div style={{ display: toSelect }} className='control'>
                                    <button onClick={() => changeToCurrency('USD')}>
                                        <img src='/images/flags/USD.png' alt='USD' />
                                        USD - {exchangeRate.USD.fullName}
                                    </button>
                                    <button onClick={() => changeToCurrency('EUR')}>
                                        <img src='/images/flags/EUR.png' alt='EUR' />
                                        EUR - {exchangeRate.EUR.fullName}
                                    </button>
                                    <button onClick={() => changeToCurrency('UAH')}>
                                        <img src='/images/flags/UAH.png' alt='UAH' />
                                        UAH - {exchangeRate.UAH.fullName}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2>
                        {fromValue || 0} <span>{fromCurrency}</span> = {toValue || 0} <span>{toCurrency}</span>
                    </h2>
                </div>
                <div>
                    <div className='currency-chart'>
                        <div>
                            <Chart
                                period='Days'
                                from={exchangeRate[fromCurrency][toCurrency]}
                                fromCurrency={fromCurrency}
                                toCurrency={toCurrency}
                            />
                        </div>
                        <div>
                            <Chart
                                period='Months'
                                from={exchangeRate[fromCurrency][toCurrency]}
                                fromCurrency={fromCurrency}
                                toCurrency={toCurrency}
                            />
                        </div>
                    </div>
                </div>
                <div className='frequent-values'>
                    <div>
                        <h3>
                            Convert {exchangeRate[fromCurrency].fullName} to {exchangeRate[toCurrency].fullName}
                        </h3>
                        {frequentValues.map((value) => {
                            return <div key={value}>
                                <button
                                    className='quick-value'
                                    onClick={() => setQuickFromValue(value)}>
                                    {value} {fromCurrency}
                                </button>
                                <div>
                                    <img src='/images/icons/up.svg' alt='' />
                                </div>
                                <div>
                                    {+(value * exchangeRate[fromCurrency][toCurrency]).toFixed(4)} {toCurrency}
                                </div>
                            </div>
                        })}
                    </div>
                    <div>
                        <h3>
                            Convert {exchangeRate[toCurrency].fullName} to {exchangeRate[fromCurrency].fullName}
                        </h3>
                        {frequentValues.map((value) => {
                            return <div key={value}>
                                <button
                                    className='quick-value'
                                    onClick={() => setQuickToValue(value, changeCurrency)}>
                                    {value} {toCurrency}
                                </button>
                                <div>
                                    <img src='/images/icons/up.svg' alt='' />
                                </div>
                                <div>
                                    {+(value * exchangeRate[toCurrency][fromCurrency]).toFixed(2)} {fromCurrency}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
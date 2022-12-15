import { useState } from 'react'; 

import Header from '../components/Header'; 

import Chart from '../components/Chart';

import getExchangeRate from '../app/exchangeRate';

export default function CurrencyConverterPage() {
    

    const exchangeRate = getExchangeRate();

    const frequentValues = [1, 2, 3, 4, 5, 10, 20, 50, 100, 1000];

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UAH');

    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState(exchangeRate.USD.UAH);

    const [fromSelect, setFromSelect] = useState('none');
    const [toSelect, setToSelect] = useState('none');

    function from(e) {
        let value = parseFloat(e.target.value);
        
        if (isNaN(value)) {
            setToValue(0);
            setFromValue('');
            return;
        } else if (value < 0) {
            setFromValue(0);
        }
        setFromValue(value);
        setToValue(parseFloat((value * exchangeRate[fromCurrency][toCurrency]).toFixed(4)));
    }

    function to(e) {
        let value = parseFloat(e.target.value);

        if (isNaN(value)) {
            setFromValue(0);
            setFromValue('');
            return;
        } else if (value < 0) {
            setFromValue(0);
        }
        setToValue(value);
        setFromValue(parseFloat((value * exchangeRate[toCurrency][fromCurrency]).toFixed(4)));
    }

    function change() {
        let temp1 = toCurrency;
        setToCurrency(fromCurrency);
        setFromCurrency(temp1);

        let temp2 = toValue;
        setToValue(fromValue);
        setFromValue(temp2);
    }

    function changeFromCurrency(currency) {
        if (currency === fromCurrency) return setFromSelect('none');

        if (currency === toCurrency) {
            setToCurrency(fromCurrency);
            setToValue(parseInt(fromValue) * exchangeRate[currency][fromCurrency]);
        } else {
            setToValue(parseInt(fromValue) * exchangeRate[currency][toCurrency]);
        }
        setFromCurrency(currency);
        setFromSelect('none');
        setToSelect('none');
    }

    function changeToCurrency(currency) {
        if (currency === toCurrency) return setToSelect('none');

        if (currency === fromCurrency) {
            setFromCurrency(toCurrency);
            setFromValue(parseInt(toValue) * exchangeRate[currency][toCurrency]);
        } else {
            setFromValue(parseInt(toValue) * exchangeRate[currency][fromCurrency]);
        }
        setToCurrency(currency);
        setFromSelect('none');
        setToSelect('none');
    }

    function hideSelect(e) {
        if (e.target.tagName !== 'BUTTON') {
            setFromSelect('none');
            setToSelect('none');
        }
    }

    return (
        <>
            <Header title='Currency converter' color='#000'/>
            <div className='converter' onClick={hideSelect}>
                {console.log('render')}
                <h1>
                    Currency Converter
                </h1>
                <h2>
                    {fromValue} {fromCurrency} to {toCurrency}
                </h2>
                <div className='converter-control'>
                    <div>
                        <h3>
                            From
                        </h3>
                        <div>
                            <input type='number' onChange={from} value={fromValue} data-currency={fromCurrency} min='0' />
                            <button className='converter-control-button' onClick={() => setFromSelect('block')}>
                                <img src={`./images/flags/${fromCurrency}.png`} alt={fromCurrency} />
                                {fromCurrency}
                            </button>
                            <div style={{ display: fromSelect }} className='control'>
                                <button onClick={() => changeFromCurrency('USD')}>
                                    <img src='./images/flags/USD.png' alt='USD' />
                                    USD
                                </button>
                                <button onClick={() => changeFromCurrency('EUR')}>
                                    <img src='./images/flags/EUR.png' alt='EUR' />
                                    EUR
                                </button>
                                <button onClick={() => changeFromCurrency('UAH')}>
                                    <img src='./images/flags/UAH.png' alt='UAH' />
                                    UAH
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button className='switch' onClick={change}>
                                <img src='./images/icons/switch.svg' alt='switch' />
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3>
                            To
                        </h3>
                        <div>
                            <input type='number' onChange={to} value={toValue} data-currency={toCurrency} />
                            <button className='converter-control-button' onClick={() => setToSelect('block')}>
                                <img src={`./images/flags/${toCurrency}.png`} alt={toCurrency} />
                                {toCurrency}
                            </button>
                            <div style={{ display: toSelect }} className='control'>
                                <button onClick={() => changeToCurrency('USD')}>
                                    <img src='./images/flags/USD.png' alt='USD' />
                                    USD
                                </button>
                                <button onClick={() => changeToCurrency('EUR')}>
                                    <img src='./images/flags/EUR.png' alt='EUR' />
                                    EUR
                                </button>
                                <button onClick={() => changeToCurrency('UAH')}>
                                    <img src='./images/flags/UAH.png' alt='UAH' />
                                    UAH
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='currency-chart'>
                    <Chart 
                    from={exchangeRate[fromCurrency][toCurrency]} 
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency} 
                    />
                </div>
                <div className='frequent-values'>
                    <div>
                        {frequentValues.map((value) => {
                            return <div key={value}>
                                <div>
                                    {value} {fromCurrency}
                                </div>
                                <div>
                                    <img src='./images/icons/up.svg' alt='' />
                                </div>
                                <div>
                                    {(value * exchangeRate[fromCurrency][toCurrency]).toFixed(4)} {toCurrency}
                                </div>
                            </div>
                        })}
                    </div>
                    <div>
                        {frequentValues.map((value) => {
                            return <div key={value}>
                                <div>
                                    {value} {toCurrency}
                                </div>
                                <div>
                                    <img src='./images/icons/up.svg' alt='' />
                                </div>
                                <div>
                                    {(value * exchangeRate[toCurrency][fromCurrency]).toFixed(4)} {fromCurrency}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
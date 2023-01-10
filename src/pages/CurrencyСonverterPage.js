import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/Header';
import CurrencyInput from '../components/converter/CurrencyInput';
import CopyValueButton from '../components/converter/CopyValueButton';
import ChangeCurrencyButton from '../components/converter/ChangeCurrencyButton';
import Chart from '../components/converter/Chart';
import FrequentValues from '../components/converter/FrequentValues';

export default function CurrencyConverterPage() {
    const frequentValues = [1, 2, 3, 4, 5, 10, 20, 50, 75, 100];
    const performanceMode = false;

    const [loading, setLoading] = useState(true);

    const [exchangeRate, setExchangeRate] = useState({});

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UAH');

    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('');

    const [fromSelect, setFromSelect] = useState('none');
    const [toSelect, setToSelect] = useState('none');

    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/exchange-rate')
            .then(res => res.json())
            .then(exchangeRateRes => {
                setExchangeRate(exchangeRateRes);
                setToValue(exchangeRateRes.USD.UAH);
            })
            .then(() => setLoading(false));
    }, []);

    function fromValueHandler(e, value) {
        let fromValueString = e ? e.target.value : value;
        let fromValueNumber = parseFloat(fromValueString);

        if (isNaN(fromValueNumber)) {
            setToValue(0);
            setFromValue('');
            return;
        }

        if (fromValueString.split('.')[0].length > 12) return;
        if (fromValueString.split('.')[1]?.length > 2) return;
       
        setFromValue(String((fromValueNumber < 0) ? 0 : fromValueString));
        setToValue(String(((fromValueNumber < 0) ? 0 : fromValueNumber * exchangeRate[fromCurrency][toCurrency]).toFixed(2)));
    }

    function toValueHandler(e, value) {
        let toValueString = e ? e.target.value : value;
        let toValueNumber = parseFloat(toValueString);

        if (isNaN(toValueNumber)) {
            setFromValue(0);
            setToValue('');
            return;
        }
        
        if (toValueString.split('.')[0].length > 12) return;
        if (toValueString.split('.')[1]?.length > 2) return;

        setToValue(String((toValueNumber < 0) ? 0 : toValueString));
        setFromValue(String(((toValueNumber < 0) ? 0 : toValueNumber * exchangeRate[toCurrency][fromCurrency]).toFixed(2)));
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

    function showCurrencySelector(selector) {
        if (selector === 'fromSelector') {
            setFromSelect('block');
            setToSelect('none');
        } else {
            setFromSelect('none');
            setToSelect('block');
        }
    }

    function hideCurrencySelector(e) {
        const targetElement = e.target;
        const targetElementParent = targetElement.parentElement;
        
        if (!targetElement.classList.contains('converter-control-button') 
            && !targetElementParent.classList.contains('converter-control-button')) {
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

    function paste(e, handler) {
        e.preventDefault();
        let clipboardData = (parseFloat(e?.clipboardData.getData('Text'))).toFixed(2);
        
        if (clipboardData) {
            handler(null, clipboardData);
        } else {
            handler(null, '');
        }
    }

    return (
        <>
            <Helmet>
                <title>Currency Converter page</title>
            </Helmet>

            <Header
                title='Currency Converter'
                bgColor='#5f7aff'
                color='#fff'
            />

            {loading
                ? <div className='converter-spinner'></div>
                : <div
                    style={{ backgroundImage: 'url("/images/converter-background.jpg")' }}
                    className='converter'
                    onClick={hideCurrencySelector}>
                    <h1>
                        Currency Converter
                    </h1>
                    <div className={`converter-control-container ${performanceMode ? '' : 'converter-blur'}`}>
                        <h2>
                            {exchangeRate[fromCurrency].fullName} to {exchangeRate[toCurrency].fullName}
                        </h2>
                        <div>
                            <div>
                                <h3>
                                    From
                                </h3>
                                <div className='converter-control'>
                                    <CurrencyInput value={fromValue} handler={fromValueHandler} paste={paste} />
                                    <CopyValueButton value={fromValue} />
                                    <button 
                                        className={`converter-control-button ${performanceMode ? '' : 'converter-blur'}`}
                                        onClick={() => showCurrencySelector('fromSelector')}>
                                            <img src={`/images/flags/${fromCurrency}.png`} alt={fromCurrency} />
                                            {fromCurrency} - {exchangeRate[fromCurrency].fullName}
                                    </button>
                                    <div style={{ display: fromSelect }} className='currency-selector'>
                                        <ChangeCurrencyButton
                                            currency='USD' changeCurrency={changeFromCurrency} exchangeRate={exchangeRate}
                                        />
                                        <ChangeCurrencyButton
                                            currency='EUR' changeCurrency={changeFromCurrency} exchangeRate={exchangeRate}
                                        />
                                        <ChangeCurrencyButton
                                            currency='UAH' changeCurrency={changeFromCurrency} exchangeRate={exchangeRate}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='currency-switch-container'>
                                <div>
                                    <button className='currency-switch' onClick={changeCurrency}>
                                        <img src='/images/icons/switch.svg' alt='Switch icon' />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3>
                                    To
                                </h3>
                                <div className='converter-control'>
                                    <CurrencyInput value={toValue} handler={toValueHandler} paste={paste} />
                                    <CopyValueButton value={toValue} />
                                    <button 
                                        className={`converter-control-button ${performanceMode ? '' : 'converter-blur'}`} 
                                        onClick={() => showCurrencySelector('toSelector')}>
                                            <img src={`/images/flags/${toCurrency}.png`} alt={toCurrency} />
                                            {toCurrency} - {exchangeRate[toCurrency].fullName}
                                    </button>
                                    <div style={{ display: toSelect }} className='currency-selector'>
                                        <ChangeCurrencyButton
                                            currency='USD' changeCurrency={changeToCurrency} exchangeRate={exchangeRate}
                                        />
                                        <ChangeCurrencyButton
                                            currency='EUR' changeCurrency={changeToCurrency} exchangeRate={exchangeRate}
                                        />
                                        <ChangeCurrencyButton
                                            currency='UAH' changeCurrency={changeToCurrency} exchangeRate={exchangeRate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>
                            {fromValue ? (+fromValue).toFixed(2) : '0.00'} 
                            <span> {fromCurrency} </span> 
                            = {toValue ? (+toValue).toFixed(2) : '0.00'} 
                            <span> {toCurrency} </span>
                        </h2>
                    </div>
                    <div>
                        <div className={`currency-chart ${performanceMode ? '' : 'converter-blur'}`}>
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
                    <div className={`frequent-values ${performanceMode ? '' : 'converter-blur'}`}>
                        <div>
                            <h3>
                                Convert {exchangeRate[fromCurrency].fullName} to {exchangeRate[toCurrency].fullName}
                            </h3>
                            {frequentValues.map((value) => {
                                return (
                                    <FrequentValues
                                        key={fromCurrency + value}
                                        value={value}
                                        toCurrency={fromCurrency}
                                        fromCurrency={toCurrency}
                                        setQuickValue={setQuickFromValue}
                                        exchangeRate={exchangeRate}
                                    />
                                )
                            })}
                        </div>
                        <div>
                            <h3>
                                Convert {exchangeRate[toCurrency].fullName} to {exchangeRate[fromCurrency].fullName}
                            </h3>
                            {frequentValues.map((value) => {
                                return (
                                    <FrequentValues
                                        key={toCurrency + value}
                                        value={value}
                                        toCurrency={toCurrency}
                                        fromCurrency={fromCurrency}
                                        setQuickValue={setQuickToValue}
                                        exchangeRate={exchangeRate}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
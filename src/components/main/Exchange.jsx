import React, {useEffect, useRef, useState} from 'react';
import ThemeInput from "../UI/input/ThemeInput";
import CurrencySelect1 from "./currencySelects/CurrencySelect1";
import CurrencySelect2 from "./currencySelects/CurrencySelect2";
import Loader from "../UI/loader/Loader";


const Exchange = ({result, setResult, requestOptions}) => {

    const currencies = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"]

    const [amount, setAmount] = useState('')
    const [currency1, setCurrency1] = useState('')
    const [currency2, setCurrency2] = useState('')
    const [loading, setLoading] = useState(null)

    const getResult = async () => {
        setLoading(loading => loading = true)
        if(currency1 !== '' || currency2 !== '' || amount > 0){
            try {
                const responseJson = await fetch(`https://api.apilayer.com/fixer/convert?to=${currency2}&from=${currency1}&amount=${amount}`, requestOptions)
                const response = await responseJson.json()
                await setResult(result => result = response.result)
                setLoading(loading => loading = false)
            } catch (e){
                console.log('Error-1', e)
            }
        } else {
            console.error('Fields cannot be empty')
        }
    }

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getResult()
        }
    }, [currency1, currency2])



    return (
        <div className='main'>
            <div className='exchange'>
                <div className='exchange__content'>
                    <ThemeInput
                        value={amount}
                        type="number"
                        placeholder="Write an amount"
                        onChange={e => setAmount(e.target.value)}
                    />
                    <div className='afterInput'>
                        <div className='exchange__1 exchanges'>
                            <p className='exchange__p'>From: </p>
                            <CurrencySelect1
                                value={currency1}
                                onChange={selectedCurrency => setCurrency1(currency1 => currency1 = selectedCurrency)}
                                defaultValue='Choose'
                                options={currencies}
                            />
                        </div>
                        <div className='exchange__2 exchanges'>
                            <p className='exchange__p'>To: </p>
                            <CurrencySelect2
                                value={currency2}
                                onChange={selectedCurrency => setCurrency2(currency2 => currency2 = selectedCurrency)}
                                defaultValue='Choose'
                                options={currencies}
                            />
                        </div>
                    </div>
                </div>
                {loading &&
                 <Loader />
                }
                {loading === false &&
                    <div className='exchange__result'>
                        {currency1 !== '' && currency2 !== '' &&
                            <div className='exchange__result__content'>
                                {amount > 0 ? result : <div style={{textAlign: 'center', color: 'red'}}>Error</div>}
                            </div>
                        }
                        {currency1 === '' || currency2 === ''
                            ?   <div className='exchange__result__content'>
                                    <div style={{textAlign: 'center'}}>You need to choose 2 currencies</div>
                                </div>
                            : <div></div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Exchange;
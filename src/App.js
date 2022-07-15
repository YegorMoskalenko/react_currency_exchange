import React, {useEffect, useState} from 'react'
import './styles/App.css'

import ThemeHeader from "./components/UI/ThemeHeader";
import Exchange from "./components/main/Exchange";
function App() {

    // result

    const [result, setResult] = useState(null)

    // Get UAH/USD and UAH/EUR rates

    const [uahToCurrency, setUahToCurrency] = useState({USD: 0, EUR: 0})

    // headers

    let myHeaders = new Headers();
    myHeaders.append("apikey", "ZMZUpjASGl7VXfAHh4iDPurCura0w9ID");

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    //================================

    const updateRates = () => {
        setUahToCurrency({USD: 0, EUR: 0})

        let curObj = {USD: 0, EUR: 0}

        for(let currency in uahToCurrency){
            fetch(`https://api.apilayer.com/fixer/latest?symbols=UAH&base=${currency}`, requestOptions)
                .then(responseJson => responseJson.json())
                .then(response => {
                    if(currency === 'USD'){
                        curObj.USD = response['rates'].UAH.toFixed(2)
                    }
                    if(currency === 'EUR'){
                        curObj.EUR = response['rates'].UAH.toFixed(2)
                    }
                    setUahToCurrency({...curObj})
                })
                .catch(e => console.log('Error!!!', e))
        }
    }

    // ===============================

    useEffect(() => {
        updateRates()
    }, [])

  return (
    <div className="App">
        <ThemeHeader uahToCurrency={uahToCurrency} />
        <Exchange
            result={result} setResult={setResult}
            requestOptions={requestOptions}
        />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ChangeCurrency({changePrice}) {
    const { currency } = useSelector((state) => state.currencyStore)
    const [symbol, setSymbol] = useState('')

    // const [rates, setRates] = useState([])

    // async function fetchRatesData () {
    //     await fetch('https://kurs.resenje.org/api/v1/currencies/EUR/rates/today')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setRates(data)
    //         })
    //         .catch((err) => {
    //             console.log(err);  //TypeError: Failed to fetch
    //             })
    //     }   
    
    //   useEffect(() => {
    //       fetchRatesData()          
    //   }, [])
    
    // console.log(rates);

    useEffect(() => {
        if (currency === "EUR") {
            setSymbol("€")
        }
        if (currency === "USD") {
            setSymbol("$")
        }
        if (currency === "RSD") {
            setSymbol("RSD")
        }
    }, [currency])
    
    const checkSymbol = () => {
        if (symbol === "€") {
            return parseFloat(changePrice / 0.98).toFixed(2)
        }
        if (symbol === "$") {
            return parseFloat(changePrice).toFixed(2)
        }
        if (symbol === "RSD") {
            return parseFloat(changePrice * 117.5).toFixed(2)
        }
    }

    return (
        <>
            {symbol && checkSymbol()} {symbol}
            {/* {rates && rates.map((rate, index) => {
                <li key={index}>{rate.name}</li>
            })} */}
        </>
    );
}

export default ChangeCurrency;
import React, { useState, useEffect } from 'react';
import { MdSwapVert } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
import './Converter.css';

function Converter() {
    const defaultFirstSelect = "Bitcoin";
    const defaultSecondSelect = "Ether";

    const [cryptoList, setCryptoList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelect);
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelect);
    const [result, setResult] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/exchange_rates");
            const dataJson = await response.json();
            const data = dataJson.rates;
            const tempArray = Object.entries(data).map(([key, value]) => ({
                value: value.name,
                label: value.name,
                rate: value.value
            }));
            setCryptoList(tempArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (!cryptoList.length || !inputValue) {
            setResult("");
            return;
        }

        const firstSelectRate = cryptoList.find(item => item.value === firstSelect)?.rate;
        const secondSelectRate = cryptoList.find(item => item.value === secondSelect)?.rate;

        if (firstSelectRate && secondSelectRate) {
            const resultValue = (parseFloat(inputValue) * secondSelectRate) / firstSelectRate;
            setResult(resultValue.toFixed(6));
        }
    }, [inputValue, firstSelect, secondSelect, cryptoList]);

    const swapHandler = (event) => {
        event.preventDefault();
        setFirstSelect(secondSelect);
        setSecondSelect(firstSelect);
    };

    return (
        <div className='container'>
            <div className='box glass'>
                <div className='title'>
                    <PiHandCoins style={{ width: "67px", height: "60px" }} />
                    <h1 className='heading'>
                        Crypto Converter
                    </h1>
                </div>

                <div className='box2'>
                    <div className='formContainer'>
                        <form>
                            <select
                                value={firstSelect}
                                onChange={(e) => setFirstSelect(e.target.value)}>
                                {cryptoList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>

                            <input type='number'
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)} />
                        </form>

                        <form>
                            <select value={secondSelect}
                                onChange={(event) => setSecondSelect(event.target.value)}>
                                {cryptoList.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            <input type='number' value={result} readOnly />
                        </form>
                    </div>

                    <button className='btn' onClick={swapHandler}>
                        <MdSwapVert />
                    </button>
                </div>

                <div className='exchange-rate'>
                    <h4 className='exchange-title'>Exchange Rate</h4>
                    <p className='result'>{inputValue} {firstSelect} = {result} {secondSelect}</p>
                </div>
            </div>
        </div>
    );
}

export default Converter;

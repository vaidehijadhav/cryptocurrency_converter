import React, { useState, useEffect } from 'react';
import { MdSwapVert } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
// import axios from 'axios';

function Converter() {
    
    const [cryptoList, setCryptoList] = useState([]);


    const fetchData = async ()=>{
        const response = await fetch("https://api.coingecko.com/api/v3/exchange_rates");
        const data = await response.json();

        // console.log(data);
        const tempArray = Object.entries(data).map(item) =>{

        }

    }

    fetchData();
    return(
        <div>
            <div>
                <h1><PiHandCoins />Crypto Converter</h1>
            </div>

            <div>
                <div>
                    <form>
                        <select></select>
                        <input type='number'/>
                    </form>

                    <form>
                        <select></select>
                        <input type='number'/>
                    </form>
                </div>

                <button>
                    <MdSwapVert />
                </button>
            </div>
        </div>
    )
}

export default Converter;

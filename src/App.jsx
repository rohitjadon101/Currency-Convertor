import React, { useState } from "react";
import countryList from "./components/CountryList";

function App() {

  const [fromCountry, setFromCountry] = useState("US");
  const [toCountry, setToCountry] = useState("IN");
  const [amt, setAmt] = useState();
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("https://open.er-api.com/v6/latest/USD");
    let data = await res.json();
    let rates = data.rates;

    const fromCurr = Object.keys(countryList).find((k) => countryList[k] == fromCountry);
    const toCurr = Object.keys(countryList).find((k) => countryList[k] == toCountry);

    if(fromCurr && toCurr){
      let finalAmt = ((rates[toCurr] / rates[fromCurr]) * amt).toFixed(4);
      if(isNaN(finalAmt)){
        setResult("Data not found for this combination");
      }else{
        setResult(`${amt} ${fromCurr} = ${finalAmt} ${toCurr}`);
      }
    }else{
      setResult("Invalid Currency Combination");
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <div className="sm:p-10 p-4">
        <h1 className="md:text-3xl text-xl">Currency Convertor</h1>
        <form className="mt-3 sm:mt-6">
          <div>
            <h3 className="mb-2 text-sm sm:text-base">Enter Amount</h3>
            <input type="text" value={amt} placeholder="enter amount..." onChange={(e) => setAmt(e.target.value)} className="sm:w-1/2 md:w-1/3 bg-transparent outline-none px-4 py-1 border-2 border-zinc-500 rounded-lg"/>
          </div>
          <div className="md:w-1/3 sm:w-1/2 text-sm sm:text-base mt-5 flex justify-between">
            <div>
              <h3>From</h3>
              <div className="mt-1 border-2 border-zinc-500 rounded-lg overflow-hidden px-2 md:py-2 py-1 flex justify-evenly items-center md:gap-4 gap-2 md:h-16">
                <img src={`https://flagsapi.com/${fromCountry}/flat/64.png`} alt="flag" className="md:w-14 w-8"/>
                <select value={fromCountry} onChange={(e) => setFromCountry(e.target.value)} className="inline-block bg-transparent outline-none">
                  {Object.entries(countryList).length > 0 ? (
                    Object.entries(countryList).map(([key, val]) => (
                      <option key={key} value={val} className="text-black">{key}</option>
                    ))
                  ) : (<option>select</option>)}
                </select>
              </div>
            </div>
            <div>
              <h3>To</h3>
              <div className="mt-1 border-2 border-zinc-500 rounded-lg overflow-hidden px-2 md:py-2 py-1 flex justify-evenly items-center md:gap-4 gap-2 md:h-16">
                <img src={`https://flagsapi.com/${toCountry}/flat/64.png`} alt="flag" className="md:w-14 w-8"/>
                <select value={toCountry} onChange={(e) => setToCountry(e.target.value)} className="inline-block bg-transparent outline-none">
                  {Object.entries(countryList).length > 0 ? (
                    Object.entries(countryList).map(([key, val]) => (
                      <option key={key} value={val} className="text-black">{key}</option>
                    ))
                  ) : (<option>select</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2>Result : <span className="font-bold text-sm sm:text-base text-blue-400 ml-2">{result}</span></h2>
          </div>
          <div className="md:w-1/3 sm:w-1/2 w-fit mt-8">
            <button className="bg-blue-600 px-4 py-1 rounded-lg w-full" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App;
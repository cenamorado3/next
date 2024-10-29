'use client'
import React, { useState } from 'react';

export default function Home() {
  const [inputId, setInputId] = useState('')
  const [info, setInfo] = useState('')

  async function getNutritionInfo()
  {
    let response: any;
    if(!inputId){
      let id = Math.floor(Math.random() * 104272)
      response = await fetch('http://127.0.0.1:5000/cod/nutrition/' + id)
    }
    else{
      response = await fetch(`http://127.0.0.1:5000/cod/nutrition/${inputId}`)
    }

    if(response.ok){
        setInfo(await response.json())
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 text-center justify-center">
      
      
      <h1 className='text-3xl font-bold m-4'>Dedication is a talent all on its own.</h1>

      <div className="grid grid-rows-3 w-1/2 text-center m-auto">
        <div>
          <p>Enter an Id or get a random stat.</p>
        </div>
        <div>
          <input className="rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" value={inputId} onChange={e => {
            setInputId(e.target.value)
          }} type="text"></input>
        </div>
        <div>
          <button 
            onClick={getNutritionInfo}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">GET</button>
        </div>

        { info &&
        <div className='mt-4'>
            <p>{info.locationdesc} </p>
            <p>{info.yearstart} - {info.yearend}</p>
            <p>{info.question}</p>
            <p>{info.data_value ? info.data_value + '%' : 'No value recorded.'}</p>
          </div>
        }
      </div>






    
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className='container text-center'>
          <div className='row'>
            <p>The data is served over a local Flask API and Postgres database, integrated with the below data source(s):</p>
            <a className="text-blue-400" href="https://catalog.data.gov/dataset/nutrition-physical-activity-and-obesity-behavioral-risk-factor-surveillance-system">Nutrition, Physical Activity, and Obesity - Behavioral Risk Factor Surveillance System </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

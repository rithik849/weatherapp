import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './styles/App.css'
import { URL_Type, IFetchedData, WeatherProps } from './project_types/types'
import {url} from './constants.js'
import {WeatherItem} from "./WeatherItem"



const App : React.FC = () => {
    const [fetchedData, setFetchedData] = useState<IFetchedData | null>(null);

    useEffect( () => {
        const controller = new AbortController();
        const abortSignal = controller.signal;

        async function getWeather(url : URL_Type, abortSignal : AbortSignal) : Promise<void>{
            try{
        
                const res : Response = await fetch(url,{method : 'get',signal : abortSignal});
                const resJSON : IFetchedData = (await res.json())["daily"];
                setFetchedData((resJSON))
            }catch(e){
                if (! controller.signal.aborted){
                    const error : string = e as string;
                    alert("Something went wrong: " + error);
                }
            }
        }
        getWeather(url, abortSignal);

        return () => {controller.abort()}

    },[])




    return (
    <div className="App">
        {
            fetchedData?.time.map(
                (item,index) =>
                    <WeatherItem date= {item} min_temp= {fetchedData.temperature_2m_min[index]} max_temp = {fetchedData.temperature_2m_max[index]} />
            )
        }
    </div>
    )
};

export default App

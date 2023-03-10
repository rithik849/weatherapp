import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'
import { URL_Type } from './project_types/types'
import {url} from './constants.js'


const App : React.FC = () => {
    const [fetchedData, setFetchedData] = useState<JSON | null>(null);

    useEffect( () => {
        const controller = new AbortController();
        const abortSignal = controller.signal;

        async function getWeather(url : URL_Type, abortSignal : AbortSignal){
            try{
        
                const res : Response = await fetch(url,{method : 'get',signal : abortSignal});
                const resJSON : JSON = (await res.json())["daily"];
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

    console.log(url);

    return (
    <div className="App">
        <p>{JSON.stringify(fetchedData)}</p>
    </div>
    )
};

export default App

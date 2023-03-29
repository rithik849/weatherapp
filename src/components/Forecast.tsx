import { useEffect, useState } from "react";
import { url } from "../constants";
import {IFetchedData} from '../project_types/types'
import { WeatherItem } from "./WeatherItem";
import '../styles/Forecast.css'


export const Forecast : React.FC = () => {
    const [fetchedData, setFetchedData] = useState<IFetchedData | null>(null);

    useEffect( () => {
        const controller = new AbortController();
        const abortSignal = controller.signal;
    
        fetch(url,{method : 'GET',signal : abortSignal})
        .then((res) => res.json())
        .then(
            (json) => {
                setFetchedData(json['daily'])
            }
        )
        .catch(
            (err) => {
                if (!controller.signal.aborted){
                    alert('Something Went Wrong : ' + err)
                }
            }
        )
    
        return () => {controller.abort()}
    
    },[])
    
    
    
    
    return (
    <div className="App">
        {
            fetchedData?.time.map(
                (item,index) =>
                    <WeatherItem date = {item} min_temp = {fetchedData.temperature_2m_min[index]} max_temp = {fetchedData.temperature_2m_max[index]} />
            )
        }
    </div>
    )

}


import { useEffect, useState } from "react";
import { locationToLatitudeLongitude, url } from "../constants";
import {IFetchedData, QueryParams} from '../project_types/types'
import { WeatherItem } from "./WeatherItem";
import '../styles/Forecast.css'
import { api_query } from "../utils";


const Forecast : React.FC = () => {
    const [fetchedData, setFetchedData] = useState<IFetchedData | null>(null);

    // Fetch the request from the API
    useEffect( () => {
        const controller = new AbortController();
        const abortSignal = controller.signal;
        const query : QueryParams = {
            ...locationToLatitudeLongitude.London,
            daily : ["temperature_2m_max","temperature_2m_min"],
            timezone : "Europe/London"
        }
        const req : string = api_query(url,query)
        console.log(req)
    
        fetch(req,{method : 'GET',signal : abortSignal})
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

export default Forecast

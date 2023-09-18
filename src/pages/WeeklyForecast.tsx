import { useContext, useEffect, useState } from "react";
import { locationToLatitudeLongitude, url } from "../constants";
import {QueryParams} from '../types'
import { WeatherItem } from "../components/WeatherItem";
import '../styles/Forecast.css'
import { api_query } from "../utils";
import Sidebar from "../components/Sidebar";
import { LocationContext } from "../context";

export interface IWeeklyForecastData {
    time : string[],
    temperature_2m_min : number[],
    temperature_2m_max : number[],
    units : Record<string,string>
}


const WeeklyForecast : React.FC = () => {
    const [fetchedData, setFetchedData] = useState<IWeeklyForecastData | null>(null);
    const [country,setCountry] = useContext(LocationContext)

    // Fetch the request from the API
    useEffect( () => {
        const controller = new AbortController();
        const abortSignal = controller.signal;
        const query : QueryParams = {
            ...locationToLatitudeLongitude[country],
            daily : ["temperature_2m_max","temperature_2m_min"],
            timezone : "Europe/London"
        }

        const req : string = api_query(url,query)
    
        fetch(req,{method : 'GET',signal : abortSignal})
        .then((res) => res.json())
        .then(
            (json) => {
                setFetchedData({...json.daily , units : json.daily_units})
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
    
    },[country])
    
    
    
    
    return (
    <div className="App">
    <Sidebar />
    <div className="DayForecast">
        {
            fetchedData?.time.map(
                (item,index) =>
                    <WeatherItem key = {index} units = {fetchedData.units} date = {item} min_temp = {fetchedData.temperature_2m_min[index]} max_temp = {fetchedData.temperature_2m_max[index]} />
            )
            
        }
    </div>
    </div>
    )

}

export default WeeklyForecast

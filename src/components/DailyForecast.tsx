import { LoaderFunctionArgs, NavLink, Navigate, Params, redirect, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { locationToLatitudeLongitude, url } from "../constants"
import { QueryParams } from "../types"
import { api_query, date_format, is_valid_date } from "../utils"
import { DateTime } from "luxon"
import WeatherChart from "./WeatherChart"
import { useContext, useEffect, useState } from "react"
import { LocationContext } from "../context"

interface ILoaderData{
    time : readonly string[],
    temperature :readonly number[],
    units : Record<string,string>

}

const DailyForecast : React.FC = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [data, setData] = useState<ILoaderData | null>(null)

    const [country,setCountry] = useContext(LocationContext)

    useEffect( () => {

        const controller : AbortController = new AbortController();
        const abortSignal : AbortSignal = controller.signal;

        
        const query : QueryParams = {
            ...locationToLatitudeLongitude[country],
            hourly : ["temperature_2m"],
            timezone : "Europe/London",
            start_date : params.day as string,
            end_date : params.day as string
        }

        const req : string = api_query(url,query)
        fetch(req, {method : 'GET',signal : abortSignal} )
        .then((res) => res.json())
        .then((json)=> {
            const loaderData : ILoaderData = {
                time : json.hourly.time.map((s : string)=> date_format(s,"yyyy-MM-dd'T'T","T")) as string[],
                temperature : json.hourly.temperature_2m as number[],
                units : json.hourly_units as Record<string,string>
            }
            setData(loaderData)

        })



        return () => {controller.abort()}


    }
        ,[country])



    if (data === null){
        return <p></p>
    }else{
        const units : Record<string,string> = {
            'time': data.units.time,
            'temperature' : data.units.temperature_2m
        }
        return <>
            <WeatherChart time={data.time} temperature = {data.temperature} x_label = {"Time"} y_label = {"Temperature " +"("+ units.temperature +")"}   y_units = {units.temperature}/>
            <button onClick = {() => {navigate(-1)}}>Back</button>
            </>
    }

}

export async function hourlyForecastLoader( {request, params} : {request : Request , params : Params}) : Promise<Response> {
    
    try{
        const isValid : boolean = DateTime.fromFormat(params.day as string,'yyyy-MM-dd').isValid

        if (!isValid){
            return redirect('/')
        }

        return new Response(null) 
    }catch{
        return redirect('/')
    }
}

export default DailyForecast
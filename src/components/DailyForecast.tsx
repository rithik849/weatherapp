import { LoaderFunctionArgs, NavLink, Navigate, Params, redirect, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { locationToLatitudeLongitude, url } from "../constants"
import { QueryParams } from "../project_types/types"
import { api_query, date_format, is_valid_date } from "../utils"
import { DateTime } from "luxon"
import WeatherChart from "./WeatherChart"

interface ILoaderData{
    time : readonly string[],
    temperature :readonly number[],
    units : Record<string,string>

}

const DailyForecast : React.FC = () => {
    const navigate = useNavigate()
    const loaderData : ILoaderData = JSON.parse(useLoaderData() as string)
    console.log('Data')
    console.log(typeof loaderData)
    console.log(loaderData)

    return <>
        <p>{JSON.stringify(loaderData)}</p>
        <WeatherChart time={loaderData.time} temperature = {loaderData.temperature} />
        <button onClick = {() => {navigate(-1)}}>Back</button>
        </>

}

export async function hourlyForecastLoader( {request, params} : {request : Request , params : Params}) : Promise<Response> {
    
    const isValid : boolean = DateTime.fromFormat(params.day as string,'yyyy-MM-dd').isValid

    if (!isValid){
        return redirect('/')
    }

    const controller : AbortController = new AbortController();
    const abortSignal : AbortSignal = controller.signal;

    
    const query : QueryParams = {
        ...locationToLatitudeLongitude.London,
        hourly : ["temperature_2m"],
        timezone : "Europe/London",
        start_date : params.day as string,
        end_date : params.day as string
    }

    const req : string = api_query(url,query)
    const response : Response = await fetch(req, {method : 'GET',signal : abortSignal} )
    const json = (await response.json())
    const loaderData : ILoaderData = {
        time : json.hourly.time.map((s : string)=> s) as string[],
        temperature : json.hourly.temperature_2m as number[],
        units : json.hourly_units as Record<string,string>
    }
    
    console.log('there')
    console.log(json)

    return new Response(JSON.stringify(loaderData)) 
}

export default DailyForecast
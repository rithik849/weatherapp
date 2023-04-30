import { LoaderFunctionArgs, NavLink, Navigate, Params, redirect, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { locationToLatitudeLongitude, url } from "../constants"
import { QueryParams } from "../project_types/types"
import { api_query, date_format, is_valid_date } from "../utils"
import { DateTime } from "luxon"

interface ILoaderData extends QueryParams{
    found : boolean
}

const DailyForecast : React.FC = () => {
    const navigate = useNavigate()
    const loaderData = useLoaderData() as Awaited<ReturnType<typeof hourlyForecastLoader>>
    console.log('Data')
    console.log(loaderData)
    console.log(loaderData.found)
    console.log(!loaderData.found)
    //{<button onClick={() => navigate(-1)}>Back</button>}

    if (loaderData.found){
        return <>
            <p>{JSON.stringify(loaderData)}</p>
            <button onClick = {() => {navigate(-1)}}>Back</button>
            </>
    }

    return <Navigate to='/' replace={true}/>
}

export async function hourlyForecastLoader( {request, params} : {request : Request , params : Params}) : Promise<Partial<ILoaderData>> {
    
    const isValid : boolean = DateTime.fromFormat(params.day as string,'yyyy-MM-dd').isValid

    if (!isValid){
        return {found : false} 
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
    const json : ILoaderData = {...(await response.json()), found : true }
    console.log('there')
    console.log(json)

    return json 
}

export default DailyForecast
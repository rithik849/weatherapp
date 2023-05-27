export type URL_Type = string;

export interface IFetchedData {
    time : string[],
    temperature_2m_min : number[],
    temperature_2m_max : number[],
    units : Record<string,string>
}


export interface DailyWeatherProps { 
    date : string,
    min_temp : number,
    max_temp : number,
    key : number,
    units : Record<string,string>
}

export type WithKey<T>  = T & {
    key : string | number 
}

export type LatLong = {
    latitude : number,
    longitude : number
}

type Interval = {
    daily : string[]
} | {
    hourly : string[]
}

export interface QueryParams extends Interval, LatLong {
    [index : string] : number | string[] | string | boolean,
    start_date ?: string,
    end_date ?: string,
    timezone ?: string
}
export interface LocationToLatLong {
    [index : string] : LatLong
}

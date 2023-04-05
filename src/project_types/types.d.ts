export type URL_Type = string;

export interface IFetchedData {
    time : string[];
    temperature_2m_min : number[];
    temperature_2m_max : number[];
}


export interface WeatherProps { 
    date : string,
    min_temp : number,
    max_temp : number
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
    [index : string] : number | string[] | string,
    start_date ?: string,
    end_date ?: string,
    timezone ?: string
}
export interface LocationToLatLong {
    [index : string] : LatLong
}
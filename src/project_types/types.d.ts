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
export type URL_Type = string;

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

export type Location = Extract<keyof LocationToLatLong, string>